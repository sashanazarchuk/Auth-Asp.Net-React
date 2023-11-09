import { useEffect, useState } from "react";
import http from "../../http_common";
import { useNavigate, useParams } from "react-router-dom";
import { formatCurrency } from "../../utilities/formatCurrency";
import { IProduct } from "../types";

const ProductPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [model, setModel] = useState<IProduct>({
        productId: 0,
        name: " ",
        description: " ",
        image: " ",
        initialPrice: 0,
        price: 0,
        discount: 0,
        brand: " ",
        appointment: " ",
        size: " ",
        country: " ",
        countryId:0,
        color: " ",
        gender: " ",

    });

    useEffect(() => {
        http.get<IProduct>(`api/Product/GetById/${id}`).then((resp) => {
            setModel(resp.data);
        });
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
    return (
        <>
            <div className="bg-white">
                <div className="pt-6">

                    {/* Image gallery */}
                    <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
                        <div className="aspect-w-3 aspect-h-2 overflow-hidden rounded-lg">
                            <img
                                src={model.image}
                                className="object-contain object-center w-full h-full"
                            />
                        </div>
                    </div>


                    {/* Product info */}
                    <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
                        <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{model.name}</h1>
                        </div>

                        {/* Options */}
                        <div className="mt-4 lg:row-span-3 lg:mt-0">
                            <h2 className="sr-only">Product information</h2>
                            <p className="text-3xl tracking-tight text-gray-900">{formatCurrency(model.price)}</p>
                            <br />
                            <div className="mt-4">
                                <p><span className="font-medium">Brand:</span> {model.brand}</p>
                                <p><span className="font-medium">Appointment:</span> {model.appointment}</p>
                                <p><span className="font-medium">Country:</span> {model.country}</p>
                                <p><span className="font-medium">Size:</span> {model.size}</p>
                                <p><span className="font-medium">Color:</span> {model.color}</p>
                                <p><span className="font-medium">Gender:</span> {model.gender}</p>
                                
                            </div>



                            <form className="mt-10">
                                <button onClick={() => addToCart(model.productId)}
                                    className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                >
                                    Add to bag
                                </button>
                            </form>
                        </div>

                        <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
                            {/* Description and details */}
                            <div>
                                <h3 className="sr-only">Description</h3>

                                <div className="space-y-6">
                                    <p className="text-base text-gray-900">{model.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default ProductPage;