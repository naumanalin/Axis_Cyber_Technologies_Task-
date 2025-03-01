import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get("https://budget-tracker-server-lilac.vercel.app/api/user/logout", {
        withCredentials: true,
      });

      localStorage.removeItem("token");
      localStorage.removeItem("client_a_x_i_s_680");
      window.dispatchEvent(new Event('authChange'));
      navigate("/");
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
