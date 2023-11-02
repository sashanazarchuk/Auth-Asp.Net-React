import { useLocation, useNavigate } from "react-router-dom";
 
import { formatCurrency } from "../../utilities/formatCurrency";
import http from "../../http_common";
import { IProduct } from "../types";

const SearchResult = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const searchResults: IProduct[] = location.state?.searchResults || [];
    // Function to add a product to the cart
    const addToCart = async (productid: number) => {
        // Retrieve the user's token from local storage
        const token = localStorage.getItem('token');
        try {
            if (token) {
                // Prepare configuration for the HTTP request, including authorization
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                };
                // Make a request to add the product to the cart
                await http.post(`/api/Cart/AddToCart/${productid}`, {}, config);
                console.log(`Product ${productid} added to the cart.`);
            } else {
                // If the user is not authenticated, redirect to the login page
                navigate("/login");
            }
        } catch (error) {
            console.error("Error making the request to add to the cart:", error);
        }
    };
    return (
        <div className="bg-white">
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-5 flex  ml-10">
                {/* Filters and Categories */}

                <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                    {searchResults.map((product) => (
                        <div key={product.productId}>
                            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                                />
                            </div>
                            <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
                            <p className="mt-1 text-lg font-medium text-gray-900">
                                {formatCurrency(product.price)}
                            </p>
                            <button
                                onClick={() => addToCart(product.productId)}
                                className="mt-2 bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600 cursor-pointer"
                            >
                                Add to bag
                            </button>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default SearchResult;