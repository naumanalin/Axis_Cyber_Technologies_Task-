import useFetch from "../hooks/useFetch";
import { motion } from "framer-motion";

const TotalAmount = ({ type, color, of, dependency }) => {
    const route = of ? `/api/transactions/total/${type}/${of}` : `/api/transactions/total/${type}`;
    const { data, error, isLoading } = useFetch("GET", route, dependency={dependency});

    const amount = data?.[type] ?? 0;
    const month = data?.month ?? "";
    const dateRange = data?.date ?? "";

    return (
        <motion.div
        whileHover={{ scale:1.1}}
        transition={{ duration: 0.3 }}
        style={{borderColor:`${color}`}}
        className={`p-5 rounded-lg bg-white border shadow-lg transition duration-300 hover:shadow-xl`}
        title={!error ? data?.message : ""}
        >
            <div className="flex flex-col gap-2">
                <span className="text-sm font-semibold text-gray-600 capitalize">
                    Total {type} {month ? `in ${month}` : ''}
                </span>

                {isLoading ? (
                    <div className="h-6 w-24 bg-gray-200 animate-pulse rounded-md" />
                ) : error ? (
                    <span className="text-red-500 text-sm">Failed to load</span>
                ) : (
                    <>
                        <span className={`text-2xl font-bold text-${color}-600`}>
                            ${amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        </span>
                        {dateRange && <span className="text-gray-500 text-xs">From {dateRange}</span>}
                    </>
                )}
            </div>
        </motion.div>
    );
};

export default TotalAmount;
