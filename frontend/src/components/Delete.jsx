import React, { useState } from "react";
import { Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import axios from "axios";

const Delete = ({ id, onDelete }) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!id) {
      toast.error("❌ Transaction ID is missing.");
      return;
    }

    const confirmDelete = window.confirm("Are you sure you want to delete this transaction?");
    if (!confirmDelete) return;

    setLoading(true);
    try {
      const res = await axios.delete(
        `https://budget-tracker-server-lilac.vercel.app/api/transactions/${id}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success( res.data.message || "✅ Transaction deleted successfully.");
        if (onDelete) onDelete(id); // Remove item from UI
      } else {
        toast.error(res.data.message || "❌ Failed to delete transaction.");
      }
    } catch (error) {
      toast.error(`❌ Something went wrong. Please try again. ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handleDelete} disabled={loading} className="text-red-600 hover:text-red-800">
      {loading ? <span className="animate-spin">⏳</span> : <Trash2 size={18} />}
    </button>
  );
};

export default Delete;
