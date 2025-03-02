import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import useFetch from '../hooks/useFetch';
import { Edit, Trash2, Loader2 } from 'lucide-react';
import AddNew from './AddNew';
import { toast } from 'react-toastify';
import Delete from './Delete';

// Add error boundary to catch component errors
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 text-red-500 bg-red-50 rounded-lg">
          Error displaying table. Please try refreshing the page.
        </div>
      );
    }
    return this.props.children;
  }
}

const Table = ({openNew, setOpenNew}) => {
  const { data, error, isLoading } = useFetch("GET", "/api/transactions");
  const [tableData, setTableData] = useState([]);

  const showEditMessage = ()=>{
     toast.success('Edit Transaction not currently available and it will be add on you demand !')
  }
  

  React.useEffect(() => {
    if (data && data.success && Array.isArray(data.transactions)) {
      setTableData(data.transactions);
    } else {
      setTableData([]); // Ensure it's always an array
    }
  }, [data, openNew]);

  const columns = [
    {
      name: '#',
      cell: (row, index) => index + 1,
      width: '70px'
    },
    {
      name: 'Title',
      selector: row => row.title || 'Untitled',
      sortable: true,
    },
    {
      name: 'Category',
      selector: row => row.category || '-',
      sortable: true,
    },
    {
      name: 'Type',
      cell: row => (
        <span className={`capitalize ${row.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
          {row.type || 'N/A'}
        </span>
      ),
    },
    {
      name: 'Date',
      selector: row => row.date ? new Date(row.date).toLocaleDateString() : '-',
      sortable: true,
    },
    {
      name: 'Amount',
      cell: row => `$${(row.amount || 0).toLocaleString()}`,
      sortable: true,
    },
    {
      name: 'Actions',
      cell: (row) => (
        <div className="flex gap-2">
          <button onClick={showEditMessage} className="text-blue-600 hover:text-blue-800">
            <Edit size={18} />
          </button>
          <Delete id={row._id} onDelete={() => {
            // Remove the deleted row from the table
            setTableData(tableData.filter(item => item._id !== row._id));
          }} />
        </div>
      ),
      allowOverflow: true,
      ignoreRowClick: true,
    },
  ];

  return (
    <>
    <AddNew open={openNew} setOpen={setOpenNew} />
    <ErrorBoundary>
      <div className="w-full bg-white rounded-lg shadow-sm p-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-semibold text-gray-800">Transaction History {openNew ? "true" : "false"}</h1>
          <button onClick={()=>setOpenNew(!openNew)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors">
            + Add New
          </button>
        </div>

        {error ? (
          <div className="text-red-500 p-4 bg-red-50 rounded-lg">
            Error loading data: {error.message}
          </div>
        ) : (
          <DataTable
            columns={columns}
            data={tableData}
            progressPending={isLoading}
            progressComponent={
              <div className="py-4 flex items-center justify-center">
                <Loader2 className="animate-spin h-8 w-8 text-blue-600" />
              </div>
            }
            noDataComponent={
              <div className="py-4 text-center text-gray-500">
                No transactions found
              </div>
            }
            pagination
            responsive
            customStyles={{
              headCells: {
                style: {
                  backgroundColor: '#f9fafb',
                },
              },
              cells: {
                style: {
                  paddingTop: '0.5rem',
                  paddingBottom: '0.5rem',
                },
              },
            }}
          />
        )}
      </div>
    </ErrorBoundary>
    </>
  );
};

export default Table;