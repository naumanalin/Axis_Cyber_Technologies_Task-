import React from 'react';
import { toast } from 'react-toastify';

const Profile = () => {
  const user = JSON.parse(localStorage.getItem('client_a_x_i_s_680'));

  const verified_req_handler = () => {
    if(user.verified){
      toast.success('Your Account Is Already Verified ✔');
    }
  };

  return (
      <fieldset className="border border-gray-300 rounded-lg p-6 bg-white shadow-md w-full ">
        <legend className="text-lg font-semibold text-gray-700 px-3">User Profile</legend>
        
        <p className="text-gray-800">
          <strong>Name:</strong> {user.name}
        </p>
        <p className="text-gray-800">
          <strong>Email:</strong> {user.email}
        </p>
        <p className="text-gray-800">
          <strong>Status:</strong> {user.verified ? (
            <span className="text-green-700 font-semibold"> Verified</span>
          ) : (
            <span className="text-red-700 font-semibold"> Not Verified</span>
          )}
        </p>

        {!user.verified && (
          <button
            onClick={verified_req_handler}
            className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Verify Account
          </button>
        )}

        <p className="text-gray-600 mt-4">
          <strong>Joined:</strong> {new Date(user.createdAt).toLocaleDateString()}
        </p>
      </fieldset>
  );
};

export default Profile;
