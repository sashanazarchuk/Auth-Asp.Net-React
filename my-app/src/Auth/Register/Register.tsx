import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import http from "../../http_common";
import { City, Country, RegistrationData } from "./types";
import { useForm } from "react-hook-form";

const Registration = () => {
    const navigate = useNavigate();
    const [registrationData, setRegistrationData] = useState<RegistrationData>({
        username: '',
        email: '',
        age: 0,
        phone: 0,
        country: '',
        city: '',
        password: '',
    });

    const [errorMessage, setErrorMessage] = useState('');
    const [selectedCountryId, setSelectedCountryId] = useState<number | ''>('');
    const [selectedCityId, setSelectedCityId] = useState<number | ''>('');
    const [countries, setCountries] = useState<Country[]>([]);
    const [cities, setCities] = useState<City[]>([]);
    const [userexist, setuserExist] = useState('');

    const checkUsernameExists = async (username: string): Promise<boolean> => {
        try {
            const response = await http.get(`api/Register/Search?username=${username}`);
            return response.data === 'User exists';
        } catch (error) {
            console.error('Error checking username:', error);
            return false;
        }
    };


    const handleRegistration = async () => {
        try {
            setErrorMessage('');

            const usernameExists = await checkUsernameExists(registrationData.username);
            if (usernameExists) {
                setuserExist('A user with that name already exists');
            } else {
                const regResponse = await http.post('api/Register', registrationData);

                console.log('Успішна реєстрація:', regResponse.data);
                navigate('/login');
            }
        } catch (error) {
            console.error('Помилка при реєстрації:', error);
            setErrorMessage('Error during registration');
        }

    };


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, field: keyof RegistrationData) => {
        setRegistrationData((prevData) => ({
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
            console.error('Помилка при отриманні списку країн', error);
        }
    };


    const fetchCitiesByCountry = async (countryId: number) => {
        try {
            const response = await http.get(`api/Location/Cities?countryId=${countryId}`);
            setCities(response.data);
        } catch (error) {
            console.error('Помилка при отриманні списку міст', error);
        }
    };


    const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedCountryId = Number(event.target.value);
        const selectedCountryName = event.target.options[event.target.selectedIndex].text;
        setSelectedCountryId(selectedCountryId);
        setSelectedCityId('');
        fetchCitiesByCountry(selectedCountryId);

        setRegistrationData(prevData => ({
            ...prevData,
            country: selectedCountryName,
        }));
    };


    const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedCityId = Number(event.target.value);
        const selectedCityName = event.target.options[event.target.selectedIndex].text;
        setSelectedCityId(selectedCityId);

        setRegistrationData(prevData => ({
            ...prevData,
            city: selectedCityName,
        }));
    };


    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();


    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Registration
                </h2>
            </div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={handleSubmit(handleRegistration)}>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="mb-4">
                            <label className="block text-sm font-medium leading-6 text-gray-900">
                                Login
                            </label>
                            <input
                                type="text"
                                {...register("username", { required: true })}
                                value={registrationData.username}
                                onChange={(e) => handleChange(e, 'username')}
                                className={`pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ${errors.username ? 'ring-2 ring-red-500' : 'ring-1 ring-gray-300'
                                    } ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                            />
                            {errors.username && errors.username.type === 'required' && <span className="text-red-500">This field is required</span>}
                            {userexist && <div className="text-red-500 mt-2">{userexist}</div>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium leading-6 text-gray-900">
                                Email
                            </label>
                            <input
                                type="email"
                                {...register("email", { required: true })}
                                value={registrationData.email}
                                onChange={(e) => handleChange(e, 'email')}
                                className={`pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ${errors.email ? 'ring-2 ring-red-500' : 'ring-1 ring-gray-300'
                                    } ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                            />
                            {errors.email && errors.email.type === 'required' && <span className="text-red-500">This field is required</span>}
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="mb-4">
                            <label className="block text-sm font-medium leading-6 text-gray-900">
                                Age
                            </label>
                            <input
                                type="number"
                                placeholder="Age"
                                {...register("age", { required: true, min: 18 })}
                                value={registrationData.age}
                                onChange={(e) => handleChange(e, 'age')}
                                className={`pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ${errors.age ? 'ring-2 ring-red-500' : 'ring-1 ring-gray-300'
                                    } ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                            />
                            {errors.age && errors.age.type === 'required' && <span className="text-red-500">This field is required</span>}
                            {errors.age && errors.age.type === 'min' && <span className="text-red-500">Age must be at least 18 years</span>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium leading-6 text-gray-900">
                                Phone number
                            </label>
                            <input
                                type="number"
                                placeholder="Phone"
                                {...register("phone", { required: true, minLength: 12 })}
                                value={registrationData.phone}
                                onChange={(e) => handleChange(e, 'phone')}
                                className={`pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ${errors.phone ? 'ring-2 ring-red-500' : 'ring-1 ring-gray-300'
                                    } ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                            />
                            {errors.phone && errors.phone.type === 'required' && <span className="text-red-500">This field is required</span>}
                            {errors.phone && errors.phone.type === 'minLength' && <span className="text-red-500">A phone number of at least 12 digits</span>}
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="mb-4">
                            <label htmlFor="country">Country:</label>
                            <select
                                id="country"
                                value={selectedCountryId}
                                {...register("country", { required: true })}
                                onChange={handleCountryChange}
                                className={`pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ${errors.country ? 'ring-2 ring-red-500' : 'ring-1 ring-gray-300'
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
                            {errors.country && errors.country.type === 'required' && <span className="text-red-500">This field is required</span>}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="city">City:</label>
                            <select
                                id="city"
                                value={selectedCityId}
                                {...register("city", { required: true })}
                                onChange={handleCityChange}
                                disabled={!selectedCountryId}
                                className={`pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ${errors.city ? 'ring-2 ring-red-500' : 'ring-1 ring-gray-300'
                                    } ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                            >
                                <option key="default" value="">
                                    Choose a city
                                </option>
                                {cities.map(city => (
                                    <option key={`city-${city.cityId}`} value={city.cityId}>
                                        {city.name}
                                    </option>
                                ))}
                            </select>
                            {errors.city && errors.city.type === 'required' && <span className="text-red-500">This field is required</span>}
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium leading-6 text-gray-900">
                            Password
                        </label>
                        <input
                            type="password"
                            {...register("password", {
                                required: true,
                                minLength: 6,

                            })}
                            value={registrationData.password}
                            onChange={(e) => handleChange(e, 'password')}
                            className={`pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ${errors.password ? 'ring-2 ring-red-500' : 'ring-1 ring-gray-300'
                                } ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                        />
                        {errors.password && errors.password.type === 'required' && <span className="text-red-500">This field is required</span>}
                        {errors.password && errors.password.type === 'minLength' && <span className="text-red-500">Password must contain at least 6 characters</span>}

                    </div>
                    <button
                        type="submit"
                        onClick={handleRegistration}
                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Sign up
                    </button>
                    {errorMessage && <div className="text-red-500 mt-2">{errorMessage}</div>}
                </form>
                <p className="mt-10 text-center text-sm text-gray-500">
                    Already have an account?{' '}
                    <a href="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                        Sign in
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Registration;