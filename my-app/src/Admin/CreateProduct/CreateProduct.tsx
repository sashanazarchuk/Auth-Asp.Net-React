import { useEffect, useState } from "react";
import { IProduct } from "../../ProductCart/types";

import http from "../../http_common";
import { Country } from "../../Auth/Register/types";
import { useNavigate } from "react-router-dom";



const CreateProduct = () => {
    const initialProductData: IProduct = {
        productId: 0,
        name: "",
        description: "",
        image: "",
        initialPrice: 0,
        price: 0,
        discount: 0,
        brand: "",
        appointment: "",
        size: "",
        color: "",
        country: "",
        countryId: 0,
        gender: "",
    };

    const [productData, setProductData] = useState<IProduct>(initialProductData);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [selectedCountryId, setSelectedCountryId] = useState<number | ''>('');
    const [countries, setCountries] = useState<Country[]>([]);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    const handleCreateProduct = async () => {

        try {

            if (token) {
                // Prepare configuration for the HTTP request, including authorization
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }; setErrorMessage("");
                const { country, productId, ...dataToSubmit } = productData;
              // Execute an HTTP POST request using the specified path and transfer product data
                await http.post("api/Product/Create-Product", dataToSubmit, config);
                // Clear the form data
                setProductData(initialProductData);
                navigate("/productlist")
            }
        } catch (error) {
             
            console.error("Error during product creation:", error);
            setErrorMessage("Error during product creation");
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, field: keyof IProduct) => {
        setProductData((prevData) => ({
            ...prevData,
            [field]: e.target.value,
        }));
    };

    useEffect(() => {
        fetchCountries();
    }, []);

    const fetchCountries = async () => {
        try {
            const response = await http.get('api/Location/Countries');
            setCountries(response.data);
        } catch (error) {
            console.error('An error occurred while receiving the list of countries', error);
        }
    };

    const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedCountryId = Number(event.target.value);
        setSelectedCountryId(selectedCountryId);
        setProductData(prevData => ({
            ...prevData,
            countryId: selectedCountryId,
        }));
    };



    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Product Creation
                    </h2>
                </div>
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={handleCreateProduct}>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="mb-4">
                                <label className="block text-sm font-medium leading-6 text-gray-900">Name</label>
                                <input
                                    type="text"
                                    value={productData.name}
                                    onChange={(e) => handleChange(e, "name")}
                                    className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium leading-6 text-gray-900">Description</label>
                                <input
                                    type="text"
                                    value={productData.description}
                                    onChange={(e) => handleChange(e, "description")}
                                    className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className=" gap-4">
                            <div className="mb-4">
                                <label className="block text-sm font-medium leading-6 text-gray-900">Image</label>
                                <input
                                    type="text"
                                    value={productData.image}
                                    onChange={(e) => handleChange(e, "image")}
                                    className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className=" grid grid-cols-2  gap-4">
                            <div className="mb-4">
                                <label className="block text-sm font-medium leading-6 text-gray-900">Initial Price</label>
                                <input
                                    type="number"
                                    value={productData.initialPrice}
                                    onChange={(e) => handleChange(e, "initialPrice")}
                                    className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium leading-6 text-gray-900">Price</label>
                                <input
                                    type="number"
                                    value={productData.price}
                                    onChange={(e) => handleChange(e, "price")}
                                    className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>

                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="mb-4">
                                <label className="block text-sm font-medium leading-6 text-gray-900">Brand</label>
                                <input
                                    type="text"
                                    value={productData.brand}
                                    onChange={(e) => handleChange(e, "brand")}
                                    className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium leading-6 text-gray-900">Appointment</label>
                                <input
                                    type="text"
                                    value={productData.appointment}
                                    onChange={(e) => handleChange(e, "appointment")}
                                    className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="mb-4">
                                <label className="block text-sm font-medium leading-6 text-gray-900">Size</label>
                                <input
                                    type="text"
                                    value={productData.size}
                                    onChange={(e) => handleChange(e, "size")}
                                    className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium leading-6 text-gray-900">Color</label>
                                <input
                                    type="text"
                                    value={productData.color}
                                    onChange={(e) => handleChange(e, "color")}
                                    className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="mb-4">
                                <label className="block text-sm font-medium leading-6 text-gray-900">Gender</label>
                                <input
                                    type="text"
                                    value={productData.gender}
                                    onChange={(e) => handleChange(e, "gender")}
                                    className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium leading-6 text-gray-900">Country</label>
                                <select
                                    id="country"
                                    value={selectedCountryId}
                                    onChange={handleCountryChange}
                                    className={`pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm '
                                        } ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                                >
                                    <option key="default" value="">
                                        Choose a country
                                    </option>
                                    {countries.map(country => (
                                        <option key={`country-${country.countryId}`} value={country.countryId}>
                                            {country.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={handleCreateProduct}
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Create Product
                        </button>
                    </form>
                    {errorMessage && <div className="text-red-500 mt-2">{errorMessage}</div>}
                </div>
            </div>
        </>
    );
};

export default CreateProduct;