import { Link, useNavigate } from "react-router-dom";
import { ShoppingBagIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from "react";
import http from "../http_common";
import { IProduct } from "../ProductCart/types";


const DefaultHeader = ({ }) => {


    // Retrieve the user's token from local storage
    const token = localStorage.getItem("token");
    // Get the navigation function from React Router
    const navigate = useNavigate();

    // Function to handle user sign-out
    const handleSignOut = () => {
        // Remove the user's token from local storage
        localStorage.removeItem("token");
        // Navigate to the login page
        navigate("/login");
        // Reload the window, which can be optional based on your needs
        window.location.reload();
    };

    const [searchText, setSearchText] = useState(""); // Initialize the search text state

    const [searchResults, setSearchResults] = useState<IProduct[]>([]); // Initialize the search results state

    const performSearch = async () => {
        try {
            // Send an HTTP request to the server to perform a search using the current search text
            const response = await http.get(`api/Product/Search?searchText=${searchText}`);

            // Update the search results state with the response from the server
            setSearchResults(response.data);

        } catch (error) {
            console.error("Error performing search:", error);
        }
    };

    const performSearchButton = async () => {
        try {
            // Send an HTTP request to the server to perform a search using the current search text
            const response = await http.get(`api/Product/Search?searchText=${searchText}`);

            // Update the search results state with the response from the server
            setSearchResults(response.data);
            navigate(`/search-result?searchText=${searchText}`, { state: { searchResults: response.data } });

        } catch (error) {
            console.error("Error performing search:", error);
        }
    };
    const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const text = event.target.value;

        // Update the search text state with the text entered in the input field
        setSearchText(text);

        if (text.trim() === "") {
            // If the input is empty or contains only whitespace, clear the search results
            setSearchResults([]);
        } else {
            // If there is text in the input, perform a search (convert the text to lowercase for case-insensitive search)
            performSearch();
        }
    };

    const [isDeleteLinkVisible, setIsDeleteLinkVisible] = useState(false);
    const checkUserRole = async () => {
        const token = localStorage.getItem("token");

        if (token) {
            const headers = {
                Authorization: `Bearer ${token}`,
            };

            try {
                const response = await http.get("api/User/GetUserRole", {
                    method: "GET",
                    headers: headers,
                });

                if (response.data === "Admin") {
                    setIsDeleteLinkVisible(true);
                }
            } catch (error) {
                console.error("Помилка при отриманні ролі користувача:", error);
            }
        }
    };

    useEffect(() => {
        checkUserRole();
    }, []);


    return (
        <>
            <div className="bg-white border-gray-300 fixed top-0 left-0 right-0 z-10">
                <div className="mx-auto max-w-8xl px-2 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        <div className="flex items-center mt-4">
                            <div className="flex-shrink-0">
                                <Link to={"/"}>
                                    <img
                                        className="h-8 w-8"
                                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                                        alt="Your Company"
                                    />
                                </Link>
                            </div>
                            <Link to="/productlist" className="ml-4 text-gray-800 hover:text-indigo-300">
                                Products
                            </Link>
                            {isDeleteLinkVisible && (
                                < Link to="/create-product" className="ml-4 text-gray-800 hover:text-indigo-300">
                                    Create Product
                                </Link>

                            )}

                        </div>
                        <div className="flex ml-auto mt-4">
                            <div className="relative flex">
                                <input
                                    type="text"
                                    placeholder="Search"
                                    value={searchText}
                                    onChange={handleSearchInputChange}
                                    className="p-2  text-gray-400 border border-gray-300 rounded-lg w-56 "
                                />
                                <button
                                    onClick={performSearchButton}
                                    className="hover:text-blue-500 text-gray-400 py-2 px-4 rounded-full ml-2"
                                >
                                    Search
                                </button>
                                {searchResults.length > 0 && searchText.trim() !== "" && (
                                    <ul className="absolute z-10 p-2 mt-10 w-37 bg-white border border-gray-300 rounded-lg">
                                        {searchResults.map((product) => (
                                            <li
                                                key={product.productId}
                                                className="px-4 py-2 cursor-pointer hover:bg-indigo-100 flex items-center"
                                                onClick={() => {
                                                    navigate(`/product/${product.productId}`);
                                                    setSearchResults([]);
                                                }}
                                            >
                                                <img
                                                    src={product.image}
                                                    alt={product.name}
                                                    className="h-6 w-6 mr-2"
                                                />
                                                {product.name}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                            <div className="hidden md:flex items-center space-x-4">
                                <div className="ml-4 flow-root lg:ml-6">
                                    <Link to="/cart" className="group -m-2 flex items-center p-2">
                                        <ShoppingBagIcon
                                            className="h-6 w-6 flex-shrink-0 text-gray-800 group-hover:text-gray-500"
                                            aria-hidden="true"
                                        />
                                    </Link>
                                </div>
                                <div className="flex justify-end space-x-4">
                                    {token ? (
                                        <button
                                            onClick={handleSignOut}
                                            className="text-gray-800 hover:text-indigo-300"
                                        >
                                            Sign Out
                                        </button>
                                    ) : (
                                        <>
                                            <Link to="/login" className="text-gray-800 hover:text-indigo-300">
                                                Sign In
                                            </Link>
                                            <span className="text-gray-800"> | </span>
                                            <Link to="/" className="text-gray-800 hover:text-indigo-300">
                                                Create account
                                            </Link>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr className="my-2 border-t-2 border-gray-200  " />
                </div>
            </div >
        </>
    );
}
export default DefaultHeader;