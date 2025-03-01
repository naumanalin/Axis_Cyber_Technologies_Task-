import useFetch from '../hooks/useFetch';

const TotalAmount = ({ type, color }) => {
    const route = `/api/transactions/total/${type}`;
    const { data, error, isLoading } = useFetch("GET", route);

    const amount = data?.income ?? 0; 

    return (
        <div
            className={`sm:w-full md:w-1/4 rounded-md p-4 bg-white border-l-4 border-${color}-500 shadow-sm cursor-pointer`}
            title={!error ? data?.message : ''}
        >
            <div className="flex flex-col gap-1">
                <span className="text-sm font-medium text-gray-500">Total {type}</span>
                
                {isLoading ? (
                    <div className="h-6 w-20 bg-gray-100 animate-pulse rounded" />
                ) : error ? (
                    <span className="text-red-500 text-sm">Failed to load</span>
                ) : (
                    <span className="text-xl font-semibold text-gray-900">
                        ${amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </span>
                )}
            </div>
        </div>
    );
};

export default TotalAmount;
