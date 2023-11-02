import { useEffect, useState } from "react";
import { formatCurrency } from "../../utilities/formatCurrency";
import { ICartItem } from "../types";
import http from "../../http_common";

const Cart = () => {

    // State to store cart items
    const [cartItems, setCartItems] = useState<ICartItem[]>([]);
    // State to store the total amount
    const [total, setTotal] = useState<number>(0);

    // Retrieve the token from local storage
    const token = localStorage.getItem('token');

    // Function to fetch cart items from the server
    const fetchCartItems = async () => {
        try {
            if (token) {
                // Prepare configuration for the HTTP request, including authorization
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                };
                // Make a request to get cart items
                const response = await http.get("/api/Cart/GetCarts", config);
                // Store the received items in the state
                setCartItems(response.data);
            }
        } catch (error) {
            console.error("Error while fetching cart data:", error);
        }
    };

    // Function to remove an item from the cart
    const removeFromCart = async (productid: number) => {
        try {
            if (token) {
                // Prepare configuration for the HTTP request, including authorization
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                };
                // Make a request to remove an item from the cart
                await http.delete(`/api/Cart/RemoveItem/${productid}`, config);
                // After removing the item, update the cart items
                fetchCartItems();
                // Update the total amount
                fetchTotal();
            }
        } catch (error) {
            console.error(`Error while removing item from the cart (ID: ${productid}):`, error);
        }
    };

    // Function to clear the cart
    const clearCart = async () => {
        try {
            if (token) {
                // Prepare configuration for the HTTP request, including authorization
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                };
                // Make a request to clear the cart
                await http.delete(`/api/Cart/ClearCart`, config);
                // After clearing the cart, update the cart items
                fetchCartItems();
                // Update the total amount
                fetchTotal();
            }
        } catch (error) {
            console.error("Error while clearing the cart:", error);
        }
    };

    const order = async () => {
        try {
            // Check if a user has a valid token
            if (token) {
                // Prepare the HTTP request configuration with the token
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                };
                // Send an HTTP GET request to the "Send-Email" endpoint with the configured headers
                await http.get("api/Email/Send-Email", config);
                clearCart();
                alert("Order is succesfully");
            }
        } catch (error) {
            // Handle errors if any occur during the process
            console.error("Error while sending email:", error);
        }
    }


    // Function to fetch the total amount of the cart
    const fetchTotal = async () => {
        try {
            if (token) {
                // Prepare configuration for the HTTP request, including authorization
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                };
                // Make a request to get the total amount of the cart
                const response = await http.get("/api/Cart/GetTotal", config);
                // Store the received total amount in the state
                setTotal(response.data);
            }
        } catch (error) {
            console.error("Error while fetching the total amount of the cart:", error);
        }
    };

    // Call functions to get cart data and total amount when the component loads
    useEffect(() => {
        fetchCartItems();
        fetchTotal();
    }, []);

    return (
        <>
            <div className="h-screen bg-whie-100 pt-20">
                <h1 className="mb-10 text-center text-2xl font-bold">Bag</h1>
                <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
                    <div className="rounded-lg md:w-2/3">
                        {cartItems.map((item) => (
                            <div key={item.product.productId} className="justify-between mb-6 rounded-lg bg-gray-25 p-6 shadow-md sm:flex sm:justify-start">
                                <img src={item.product.image} alt="product-image" className="w-full rounded-lg sm:w-40" />
                                <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                                    <div className="mt-5 sm:mt-0">
                                        <h2 className="text-lg font-bold text-gray-900">{item.product.name}</h2>
                                        <p className="mt-1 text-xs text-gray-700">{item.product.description}</p>
                                    </div>
                                    <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                                        <div className="flex items-center border-gray-100">
                                            <p>{item.quantity}</p>
                                        </div>
                                        <div className="flex items-center space-x-4">
                                            <p className="text-sm">{formatCurrency(item.product.price)}</p>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500" onClick={() => removeFromCart(item.product.productId)}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
                        <div className="mb-2 flex justify-between">
                        </div>
                        <div className="flex justify-between">
                        </div>
                        <hr className="my-4" />
                        <div className="flex justify-between">
                            <p className="text-lg font-bold">Total Price</p>
                            <div>
                                <p className="mb-1 text-lg font-bold">{formatCurrency(total)}</p>
                            </div>
                        </div>
                        <button className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600" onClick={clearCart}>Clear bag</button>
                        <button className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600" onClick={order}>Order</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Cart;