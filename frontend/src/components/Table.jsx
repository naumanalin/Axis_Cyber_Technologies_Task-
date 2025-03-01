import React, { useEffect, useRef } from 'react';
import $ from "jquery";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import "datatables.net-dt/css/dataTables.dataTables.min.css";
import useFetch from '../hooks/useFetch';
import { Edit, Trash2, Loader2 } from 'lucide-react';

const Table = () => {
    const { data, error, isLoading } = useFetch("GET", "/api/transactions");
    const tableRef = useRef(null);

    useEffect(() => {
        if (!data || data.length === 0) return; // Ensure data is loaded before initializing DataTable

        const dataTable = $(tableRef.current).DataTable({
            responsive: true,
            destroy: true, // Prevent duplicate initialization
            paging: true,
            searching: true,
            ordering: true
        });

        return () => {
            dataTable.destroy(); // Cleanup on unmount
        };
    }, [data]);

    return (
        <div className='w-full bg-white rounded-lg shadow-sm p-4'>
            <h1 className="text-xl font-semibold text-gray-800 mb-4">Transaction History</h1>
            <div className="rounded-lg overflow-x-auto">
                <table className="w-full" ref={tableRef}>
                    <thead className="bg-gray-50">
                        <tr className="text-left text-sm font-medium">
                            <th className="px-4 py-3">#</th>
                            <th className="px-4 py-3">Title</th>
                            <th className="px-4 py-3">Category</th>
                            <th className="px-4 py-3">Type</th>
                            <th className="px-4 py-3">Date</th>
                            <th className="px-4 py-3">Amount</th>
                            <th className="px-4 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data && data.map((item, index) => (
                            <tr key={index} className='hover:bg-gray-100'>
                                <td className="px-2 py-1">{index + 1}</td>
                                <td className="px-2 py-1">{item.title}</td>
                                <td className="px-2 py-1">{item.category}</td>
                                <td className="px-2 py-1">{item.type}</td>
                                <td className="px-2 py-1">{item.date}</td>
                                <td className="px-2 py-1">{item.amount}</td>
                                <td className="px-2 py-1">
                                    <button className="text-blue-600"><Edit size={18} /></button>
                                    <button className="text-red-600 ml-2"><Trash2 size={18} /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Table;
