import { useEffect, useState } from "react";
import http from "../../http_common";
import { useNavigate } from "react-router-dom";
import { UserData } from "./types";

const UserPage = () => {
    const [userData, setUserData] = useState<UserData | null>(null);

    const navigate = useNavigate();

    useEffect(() => {

        const token = localStorage.getItem('token');

        if (token) {
            const tokenParts = token.split('.');
            const decodedToken = JSON.parse(atob(tokenParts[1]));
            const id = decodedToken.id;

            const getUserData = async () => {
                try {
                    const response = await http.get(`api/User/${id}`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    setUserData(response.data);
                } catch (error) {
                    console.log("Помилка при отриманні даних користувача", error);
                }
            };
            getUserData();
        }

    }, []);

    if (!userData) {
        return <div>Loading...</div>;
    }

    const handleLogout = async () => {
        try {

            await http.get("api/Auth/Logout", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            localStorage.removeItem("token");
            console.log("Вилогування успішне");
            navigate("/login");
        } catch (error) {
            console.log("Помилка при виході з облікового запису", error);
        }
    };

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    User data
                </h2>
            </div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <p className="mb-4">UserName: {userData.userName}</p>
                <p className="mb-4">Email: {userData.email}</p>
                <p className="mb-4">Age: {userData.age}</p>
                <p className="mb-4">Phone number: {userData.phone}</p>
                <p className="mb-4">Country: {userData.country}</p>
                <p className="mb-4">City: {userData.city}</p>
                <button
                    onClick={handleLogout}
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Sign out
                </button>
            </div>
        </div>
    );
};

export default UserPage;