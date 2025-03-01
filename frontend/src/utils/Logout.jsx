import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Call the logout API
      await axios.get("http://localhost:3000/api/user/logout", {
        withCredentials: true,
      });

      // Clear local storage
      localStorage.removeItem("token");
      localStorage.removeItem("client_a_x_i_s_680");

      // Redirect to login page
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div 
      className="text-red-600 font-semibold cursor-pointer"
      onClick={handleLogout}
    >
      | Logout
    </div>
  );
};

export default Logout;
