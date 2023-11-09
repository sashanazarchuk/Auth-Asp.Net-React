import { Fragment, useEffect, useState } from "react";
import { IProduct } from "../types";
import http from "../../http_common";
import { formatCurrency } from "../../utilities/formatCurrency";
import { useNavigate } from "react-router-dom";
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon, MinusIcon, PlusIcon } from '@heroicons/react/20/solid'
import classNames from 'classnames';

const ProductList = () => {

    // Get the navigation function from React Router
    const navigate = useNavigate();
    // State to store the product list
    const [products, setProducts] = useState<IProduct[]>([]);

    const [sortType, setSortType] = useState("Sort-L-H");
    // Fetch the list of products when the component mounts

    const [isDeleteButtonVisible, setIsDeleteButtonVisible] = useState(false);

    const fetchProducts = async () => {
        try {
            const response = await http.get("/api/Product/GetAllProduct");
            // Update the state with the received products
            setProducts(response.data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);


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



    // Define an effect to fetch products based on the selected sort type
    useEffect(() => {
        const sortProduct = async () => {
            try {
                const response = await http.get(`/api/Product/${sortType}`);
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        sortProduct();
    }, [sortType]);

    // Define sort options with names and sort types


    const sortOptions = [
        { name: 'Price: Low to High', sortType: 'Sort-L-H', current: sortType === 'Sort-L-H' },
        { name: 'Price: High to Low', sortType: 'Sort-H-L', current: sortType === 'Sort-H-L' },
        { name: 'Sorting: A-Z', sortType: 'Sort-A-Z', current: sortType === 'Sort-A-Z' },
        { name: 'Sorting: Z-A', sortType: 'Sort-Z-A', current: sortType === 'Sort-Z-A' }
    ];

    // Handle click on a sort option
    const handleSortOptionClick = (selectedSortType: string) => {
        setSortType(selectedSortType);
    };

    // Define filter options for various parameters
    const filters = [
        // Define your filter options for Color, Brand, Country, Appointment, Gender, and Size

        {
            id: 'colors',
            name: 'Color',
            options: [
                { value: 'White', selectedOption: 'White' },
                { value: 'Black', selectedOption: 'Black' },
                { value: 'Blue', selectedOption: 'Blue' },
                { value: 'Brown', selectedOption: 'Brown' },
                { value: 'Gray', selectedOption: 'Gray' },
                { value: 'Purple', selectedOption: 'Purple' },
            ],
        },
        {
            id: 'brand',
            name: 'Brand',

            options: [
                { value: 'New Balance', selectedOption: 'New Balance' },
                { value: 'ASICS ', selectedOption: 'ASICS ' },
                { value: 'PUMA', selectedOption: 'PUMA' },
                { value: 'GUESS', selectedOption: 'GUESS' },
                { value: 'HOFF', selectedOption: 'HOFF' },
                { value: 'KARHU', selectedOption: 'KARHU' },
            ],
        },
        {
            id: 'country',
            name: 'Country',


            options: [
                { value: 'USA', selectedOption: 'USA' },
                { value: 'Japane', selectedOption: 'Japane' },
                { value: 'Germany', selectedOption: 'Germany' },
                { value: 'Finland', selectedOption: 'Finland' },
                { value: 'Spanish', selectedOption: 'Spanish' },
            ],
        },
        {
            id: 'appointment',
            name: 'Appointment',


            options: [
                { value: 'For running', selectedOption: 'For running' },
                { value: 'For training', selectedOption: 'For training' },
                { value: 'Everyday', selectedOption: 'Everyday' },
            ],
        },
        {
            id: 'gender',
            name: 'Gender',

            options: [
                { value: 'Male', selectedOption: 'Male' },
                { value: 'Female', selectedOption: 'Female' },
            ],
        },
        {
            id: 'size',
            name: 'Size',

            options: [
                { value: '37', selectedOption: '37' },
                { value: '38', selectedOption: '38' },
                { value: '41', selectedOption: '41' },
                { value: '42', selectedOption: '42' },
                { value: '44', selectedOption: '44' },
            ],
        },
    ]


    // Define and initialize filter parameters as an array of objects with 'name' and 'value'.
    const [filterParams, setFilterParams] = useState<{ name: string; value: string }[]>([]);

    // Function to filter products based on filter parameters.
    const filterProducts = async (filterParams: any[]) => {
        try {
            // Create a query string from filter parameters to be included in the URL.
            const queryParams = filterParams.map((param) => `${param.name}=${param.value}`).join('&');
            const filterUrl = `/api/Product/Filter-Product?${queryParams}`;
            const response = await http.get(filterUrl);
            setProducts(response.data); // Update the product list with the filtered results.
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    // Define an effect that triggers when filterParams change.
    useEffect(() => {
        if (filterParams.length > 0) {
            filterProducts(filterParams); // If there are filter parameters, apply filtering.
        } else {
            fetchProducts(); // If no filter parameters, fetch all products.
        }
    }, [filterParams]);

    // Function to handle a click on a filter option.
    const handleOptionClick = (selectedOption: string, name: string) => {
        // Get the current filter parameters for the selected filter name.
        const currentFilterParams = filterParams.filter((param) => param.name === name);

        // Check if a selected option with the same name already exists as a filter parameter.
        const existingParam = currentFilterParams.find((param) => param.value === selectedOption);

        if (existingParam) {
            // If the parameter exists, remove it from the list of filter parameters.
            const updatedFilterParams = currentFilterParams.filter((param) => param !== existingParam);
            setFilterParams([...filterParams.filter((param) => param.name !== name), ...updatedFilterParams]);
        } else {
            // If the parameter doesn't exist, add a new parameter to the list.
            setFilterParams([...filterParams, { name, value: selectedOption }]);
        }

        // Update the state to trigger the effect and apply filtering.
        fetchProducts();
    };


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
                    setIsDeleteButtonVisible(true);
                }
            } catch (error) {
                console.error("Error getting role:", error);
            }
        }
    };

    useEffect(() => {
        checkUserRole();
    }, []);


    const deleteProduct = async (productId: number) => {
        // Check if the user is authorized and has delete rights
        const token = localStorage.getItem("token");

        if (!token) {
            console.error("JWT token not found. You are not authorized.");
            return;
        }

        // Set configuration for HTTP request with token
        const headers = {
            Authorization: `Bearer ${token}`,
        };

        try {
            // Make an HTTP request to remove the product by its ID
            await http.delete(`/api/Product/Delete-Product/${productId}`, {
                headers: headers,
            });
            //Updating the product list
            fetchProducts();
            console.log(`Product ${productId} deleted successfully.`);
        } catch (error) {
            console.error("Error removing product:", error);
        }
    };


    return (
        <>
            <div className="bg-white">
                <div className="mx-auto max-w-8xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-9xl lg:px-5 flex  ml-10">

                    <div className="w-1/6 pr-4">
                        <form className="border-r border-gray-200 mr-4 py-6">
                            {filters.map((section) => (
                                <Disclosure as="div" key={section.id} className="border-t border-gray-200 px-4 py-6">
                                    {({ open }) => (
                                        <>
                                            <h3 className="-mx-2 -my-3 flow-root">
                                                <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                                    <span className="font-medium text-gray-900">{section.name}</span>
                                                    <span className="ml-6 flex items-center">
                                                        {open ? (
                                                            <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                                        ) : (
                                                            <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                                        )}
                                                    </span>
                                                </Disclosure.Button>
                                            </h3>
                                            <Disclosure.Panel className="pt-6">
                                                <div className="space-y-6">
                                                    {section.options.map((option, optionIdx) => (
                                                        <div key={option.value} className="flex items-center">
                                                            <input
                                                                id={`filter-mobile-${section.id}-${optionIdx}`}
                                                                name={`${section.id}[]`}
                                                                defaultValue={option.value}
                                                                type="checkbox"
                                                                onClick={() => {
                                                                    handleOptionClick(option.selectedOption, section.name);
                                                                }}
                                                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                            />
                                                            <label
                                                                htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                                                className="ml-3 min-w-0 flex-1 text-gray-500"
                                                            >
                                                                {option.selectedOption}
                                                            </label>
                                                        </div>
                                                    ))}
                                                </div>
                                            </Disclosure.Panel>
                                        </>
                                    )}
                                </Disclosure>
                            ))}
                        </form>
                    </div>


                    {/* Menu and Products */}
                    <div className="w-4/5">
                        <div className="flex items-center justify-end">
                            <Menu as="div" className="relative inline-block text-left">
                                <div>
                                    <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900 cursor-pointer">
                                        Sort
                                        <ChevronDownIcon
                                            className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                            aria-hidden="true"
                                        />
                                    </Menu.Button>
                                </div>

                                <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                >
                                    <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none cursor-pointer">
                                        <div className="py-1">
                                            {sortOptions.map((option) => (
                                                <Menu.Item key={option.name}>
                                                    {({ active }) => (
                                                        <a
                                                            onClick={() => {
                                                                handleSortOptionClick(option.sortType);
                                                            }}
                                                            className={classNames(
                                                                option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                                                                active ? 'bg-gray-100' : '',
                                                                'block px-4 py-2 text-sm'
                                                            )}
                                                        >
                                                            {option.name}
                                                        </a>
                                                    )}
                                                </Menu.Item>
                                            ))}
                                        </div>
                                    </Menu.Items>
                                </Transition>
                            </Menu>
                        </div>


                        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                            {products.map((product) => (
                                <div
                                    key={product.productId}
                                >
                                    <div className="w-full overflow-hidden rounded-lg bg-gray-200">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-full h-60 object-cover object-center group-hover:opacity-75 cursor-pointer"
                                            onClick={() => {
                                                navigate(`/product/${product.productId}`);
                                            }}
                                        />
                                    </div>
                                    <h3 className="mt-2 text-sm text-gray-700">{product.name}</h3>
                                    <p className="mt-1 text-lg font-medium text-gray-900">
                                        {formatCurrency(product.price)}
                                    </p>
                                    <button
                                        onClick={() => addToCart(product.productId)}
                                        className="mt-2 bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600 cursor-pointer"
                                    >
                                        Add to Bag
                                    </button>

                                    {isDeleteButtonVisible && (
                                        <div className="mt-2 flex items-center">
                                            <button
                                                onClick={() => deleteProduct(product.productId)}
                                                className="bg-red-500 text-white rounded-md py-2 px-4 hover:bg-red-600 cursor-pointer"
                                            >
                                                Delete
                                            </button>
                                            <button
                                                onClick={() => {
                                                    navigate(`/edit-product/${product.productId}`);
                                                }}
                                                className="bg-yellow-500 text-white rounded-md py-2 px-4 ml-2 hover:bg-yellow-600 cursor-pointer"
                                            >
                                                Edit
                                            </button>
                                        </div>
                                    )}

                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default ProductList;
