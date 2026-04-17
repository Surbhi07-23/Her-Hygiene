import {BrowserRouter , Routes , Route} from "react-router-dom";

import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import NearbyStores from "./pages/NearbyStores";
import Myths from "./pages/Myths";
import Education from "./pages/Education";

function App() {
  <h1 className="text-5xl text-red-500">TEST</h1>
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />

        <Route path="/register" element={<Register/>} />

        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard/>
          </ProtectedRoute>
          } 
        />

        <Route path="/stores" element={<NearbyStores />} />

        <Route path="/myths" element={<Myths />} />

        <Route path="/education" element={<Education />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;