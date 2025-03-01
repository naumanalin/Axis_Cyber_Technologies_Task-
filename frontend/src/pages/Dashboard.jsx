import React from 'react'
import TotalAmount from '../components/TotalAmount'

const Dashboard = () => {
  return (
    <div>
      <div className="flex flex-wrap gap-3">
      <TotalAmount type="income" color='green' />
      <TotalAmount type="expense" color='red' />
      <TotalAmount type="income" of="of-current-month" color='red' />
      <TotalAmount type="expense" of="of-current-month" color='red' />
      </div>
    </div>
  )
}

export default Dashboard