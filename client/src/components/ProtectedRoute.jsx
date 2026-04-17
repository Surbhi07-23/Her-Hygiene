//used to protect certain routes in a React app so that only authenticated users can access them.

import {Navigate} from "react-router-dom";
 
const ProtectedRoute = ({children}) => {    //children-a special React prop that refers to whatever is wrapped inside this component when used.(here dashboard)
    const token = localStorage.getItem("token");   //If the user logged in and a token was saved, this will return the token string.
    //If not logged in, it returns null.
    console.log("token" ,token)

    if(!token){
        return <Navigate to = "/"/>;      //If there is no token (user is not logged in), it redirects to "/" (login page)
    }

    return children;  //If a token exists, it means the user is authenticated. It simply renders the children — i.e., the protected component/page is shown normally.
};

export default ProtectedRoute;