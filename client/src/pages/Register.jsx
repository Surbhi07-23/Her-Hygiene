    import { useState } from "react";
    import { registerUser } from "../api/auth";        //function that sends POST request to backend
    import { useNavigate } from "react-router-dom";  

    const Register = () => {
        const [form , setForm] = useState({            //form : holds current value      setForm : updates value
            name : "",                                 //initial value
            email : "",
            password : ""
        })

        const navigate = useNavigate();

        const handleChange = (e) => {                      //Called every time the user types in a form.
        setForm({ 
            ...form,                                   //spreads the existing form values so other fields aren't lost
            [e.target.name] : e.target.value           //name : name attribute of the input (e.g. "email")   ..  value  : what the user typed
        })  //dynamically updates only the changed field. So typing in the email box only updates form.email, leaving name and password untouched.
        }

        const handleSubmit = async (e) => {
            e.preventDefault() ;                           //Prevents default behvaiour of browser of reloading page
            try{
                await registerUser(form);
                alert("User registered successfully!")
            } catch(error){
                console.log(error)
                alert("Error registering user")
            }
        }

        return (
            <div className="min-h-screen flex items-center justify-center bg-pink-100">

                <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded shadow w-80"
                >

                <h2 className="text-2xl font-bold mb-4 text-center">
                    Register
                </h2>

                <input
                    name="name"
                    placeholder="Name"
                    onChange={handleChange}
                    className="w-full border p-2 mb-3 rounded"
                />

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
                    Register
                </button>

                <p className="text-sm text-center mt-3">
                    Already have an account?{" "}
                    <span
                        onClick={() => navigate("/")}
                        className="text-rose-500 cursor-pointer"
                    >
                        Login
                    </span>
                </p>

                </form>

            </div>
        );
    }


    export default Register;