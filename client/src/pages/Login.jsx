import { useState } from "react";
import { loginUser } from "../api/auth";
import { Navigate, useNavigate } from "react-router-dom";    //used to programmatically redirect the user to another page.

const Login = () => {
    const navigate = useNavigate();             //Calling navigate("/some-path") redirects the user to that route without a page reload.

    const [form ,setForm] = useState({
        email : "",
        password:""
    })

    const handleChange = (e) =>{
        setForm({
            ...form,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("submit clicked")
        try{
            const res = await loginUser(form);                //response is stored in res (unlike Resgister.jsx)
            
            localStorage.setItem("token" , res.data.token)    //Extracts the JWT token from the response and saves it in localStorage

            localStorage.setItem("email", res.data.user.email);
            localStorage.setItem("name", res.data.user.name);   //added  these 2 lines for hover profile tooltip
            navigate("/dashboard");                           //On success, redirects the user to the /dashboard route automatically.
        } catch(error){
            console.log(error.response.data);
            alert("Invalid credentials!")
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-pink-100">

            <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded shadow w-80"
            >

            <h2 className="text-2xl font-bold mb-4 text-center">
                Login
            </h2>

            <input
                name="email"
                placeholder="Email"
                onChange={handleChange}
                className="w-full border p-2 mb-3 rounded"
            />

            <input
                name="password"
                type="password"
                placeholder="Password"
                onChange={handleChange}
                className="w-full border p-2 mb-3 rounded"
            />

            <button className="w-full bg-pink-600 text-white p-2 rounded">
                Login
            </button>
            <p className="text-sm text-center mt-3">
                Don't have an account?{" "}
                <span
                    onClick={() => navigate("/register")}
                    className="text-rose-500 cursor-pointer"
                >
                    Register
                </span>
            </p>

            </form>

        </div>
    );
}

export default Login;