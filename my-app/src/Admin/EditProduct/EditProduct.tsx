import { useNavigate, useParams } from "react-router-dom";
import { IProduct } from "../../ProductCart/types";
import { useEffect, useState } from "react";
import http from "../../http_common";
import { Country } from "../../Auth/Register/types";

const EditProduct = () => {

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
        countryId: 0,
        color: " ",
        gender: " ",

    });


    const [selectedCountryId, setSelectedCountryId] = useState<number | ''>('');
    const [countries, setCountries] = useState<Country[]>([]);
    const [discount, setDiscount] = useState<number>(0);



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
        setModel(prevData => ({
            ...prevData,
            countryId: selectedCountryId,
        }));
    };


    useEffect(() => {
        // Get the editable product data by its id
        const fetchProduct = async () => {
            try {
                const response = await http.get(`/api/Product/GetById/${id}`);
                setModel(response.data);
                setDiscount(response.data.discount);
            } catch (error) {
                console.error("Error retrieving product data:", error);
            }
        };

        fetchProduct();
    }, [id]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setModel({ ...model, [name]: value });
    };

    const handleEditProduct = async () => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                };

                const { country, ...dataToSubmit } = model;
                // Send the product data to the server for editing
                await http.put(`/api/Product/Edit-Product`, dataToSubmit, config);
                await http.put(`/api/Product/Discount-Product/${id}?discount=${discount}`, dataToSubmit, config);
                console.log(`Product with id ${id} was edited successfully.`);
                setModel(model);
                // Redirect  to product page 
                navigate(`/product/${id}`);
            }
        } catch (error) {
            console.error("Error editing product data", error);
        }
    };




    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Product Editing
                    </h2>
                    <input
                        type="text"
                        name="number"
                        value={model.productId}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="mb-4">
                                <label className="block text-sm font-medium leading-6 text-gray-900">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={model.name}
                                    onChange={handleInputChange}
                                    className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium leading-6 text-gray-900">Description</label>
                                <input
                                    type="text"
                                    name="description"
                                    value={model.description}
                                    onChange={handleInputChange}
                                    className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="mb-4">
                                <label className="block text-sm font-medium leading-6 text-gray-900">Image</label>
                                <input
                                    type="text"
                                    name="image"
                                    value={model.image}
                                    onChange={handleInputChange}
                                    className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium leading-6 text-gray-900">Initial Price</label>
                                <input
                                    type="number"
                                    name="initialPrice"
                                    value={model.initialPrice}
                                    onChange={handleInputChange}
                                    className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="mb-4">
                                <label className="block text-sm font-medium leading-6 text-gray-900">Price</label>
                                <input
                                    type="number"
                                    name="price"
                                    value={model.price}
                                    onChange={handleInputChange}
                                    className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium leading-6 text-gray-900">Discount</label>
                                <input
                                    type="number"
                                    name="discount"
                                    value={discount}
                                    onChange={(e) => setDiscount(Number(e.target.value))}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="mb-4">
                                <label className="block text-sm font-medium leading-6 text-gray-900">Brand</label>
                                <input
                                    type="text"
                                    name="brand"
                                    value={model.brand}
                                    onChange={handleInputChange}
                                    className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium leading-6 text-gray-900">Appointment</label>
                                <input
                                    type="text"
                                    name="appointment"
                                    value={model.appointment}
                                    onChange={handleInputChange}
                                    className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="mb-4">
                                <label className="block text-sm font-medium leading-6 text-gray-900">Size</label>
                                <input
                                    type="text"
                                    name="size"
                                    value={model.size}
                                    onChange={handleInputChange}
                                    className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium leading-6 text-gray-900">Color</label>
                                <input
                                    type="text"
                                    name="color"
                                    value={model.color}
                                    onChange={handleInputChange}
                                    className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="mb-4">
                                <label className="block text-sm font-medium leading-6 text-gray-900">Gender</label>
                                <input
                                    type="text"
                                    name="gender"
                                    value={model.gender}
                                    onChange={handleInputChange}
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
                            onClick={handleEditProduct}
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"                        >
                            Save
                        </button>
                    </form>

                </div>
            </div>
        </>
    )
}
export default EditProduct;