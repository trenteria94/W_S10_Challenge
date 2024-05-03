import React from 'react'
import { useGetOrdersQuery } from '../state/pizzaApi'
import { useSelector, useDispatch } from 'react-redux'
import { setFilter } from '../state/filterSlice'

export default function OrderList () {

  const { data: orders } = useGetOrdersQuery()
  const filter = useSelector(state => state.filterState.filter)
  const dispatch = useDispatch()
  const changeFilter = () => {
    
  }
  return (
    <div id="orderList">
      <h2>Pizza Orders</h2>
      <ol>
        {orders
          ?.filter((order, orders) => {
            if (filter === 'All') {
              return orders
            } else {
            return order.size === filter}
          })
           .map((order) => {
            return (
              <li key={order.id}>
                <div>
                {`${order.customer} ordered a size ${order.size} with ${
                    Array.isArray(order.toppings) ? order.toppings.length : 'no'
                  } ${
                    Array.isArray(order.toppings) && order.toppings.length === 1
                      ? "topping"
                      : "toppings"
                  }`}
                </div>
              </li>
            )
          })
        }
      </ol>
      <div id="sizeFilters">
        Filter by size:
        {
          ['All', 'S', 'M', 'L'].map((size, index) => {
            const className = `button-filter${size === filter ? ' active' : ''}`
            
            return <button
              onClick={() => {dispatch(setFilter(size))}}
              data-testid={`filterBtn${size}`}
              className={className}
              key={size}>{size}</button>
          })
        }
      </div>
    </div>
  )
}
