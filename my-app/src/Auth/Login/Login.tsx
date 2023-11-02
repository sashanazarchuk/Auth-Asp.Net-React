import { useState } from "react";
import { useNavigate } from "react-router-dom";
import http from "../../http_common";
import { ILogin } from "./types";
import { useForm } from "react-hook-form";


const Login = () => {

    const navigate = useNavigate();

    const [loginData, setLoginData] = useState<ILogin>({
        username: '',
        password: ''
    });

    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = async () => {

        try {
            const response = await http.post('api/Auth/Login', loginData);

            const token = response.data.token;

            if (token) {
                localStorage.setItem('token', token);
                navigate('/user');
                window.location.reload();
            }

        } catch (error) {
            setErrorMessage('Invalid username or password');
        }
    };


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, field: keyof ILogin) => {
        setLoginData((prevData) => ({
            ...prevData,
            [field]: e.target.value,
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
                    Sign in to your account
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={handleSubmit(handleLogin)}>
                    <div>
                        <label className="block text-sm font-medium leading-6 text-gray-900">
                            Login
                        </label>
                        <div className="mt-2">
                            <input
                                type="text"
                                {...register("username", { required: true })}
                                className={`pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ${errors.username ? 'ring-2 ring-red-500' : 'ring-1 ring-gray-300'
                                    } ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                                value={loginData.username}
                                onChange={(e) => handleChange(e, 'username')}
                            />
                            {errors.username && errors.username.type === 'required' && <span className="text-red-500">This field is required</span>}
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label className="block text-sm font-medium leading-6 text-gray-900">
                                Password
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                                type="password"
                                {...register("password", { required: true, minLength: 6 })}
                                className={`pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ${errors.password ? 'ring-2 ring-red-500' : 'ring-1 ring-gray-300'
                                    } ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                                value={loginData.password}
                                onChange={(e) => handleChange(e, 'password')}
                            />
                            {errors.password && errors.password.type === 'required' && <span className="text-red-500">This field is required</span>}
                            {errors.password && errors.password.type === 'minLength' && <span className="text-red-500">Password must contain at least 6 characters</span>}
                        </div>
                    </div>

                    <div>
                        <button type="submit"
                            onClick={handleLogin}
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >Sign in
                        </button>
                        {errorMessage && <div className="text-red-500">{errorMessage}</div>}
                    </div>
                </form>

                <p className="mt-10 text-center text-sm text-gray-500">
                    Not a member?{' '}
                    <a href="/" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                        Sign up
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Login;