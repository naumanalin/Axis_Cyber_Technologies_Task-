import React from 'react'
import ChartComponent from '../components/ChartComponent'

const Analytics = () => {
  return (
    <div>
      <h1 className='text-3xl font-semibold my-8'>🎯 Analytics :-</h1>
      <ChartComponent type="expense" />
      <ChartComponent type="income" />
    </div>
  )
}

export default Analytics