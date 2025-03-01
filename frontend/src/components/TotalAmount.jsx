import axios from 'axios';
import React, { useEffect, useState } from 'react'

const TotalAmount = ({}) => {
    const [type, setType] = useState()
    const [amount, setAmount] = useState();

    useEffect(()=>{
        const useFetch = async ()=>{
            const res = await axios.get('https://budget-tracker-server-lilac.vercel.app/api/transactions/total/income')
            if(res.status == 200){
                const data = res.data;
                setType('income')
                setAmount(data.income)
            }
        }
    },)
  return (
    <div className='sm:w-full md:w-[250px] rounded-md p-2 bg-white border-green-500 border'>
        Total Income
        <span> $ {amount}</span>
    </div>
  )
}

export default TotalAmount