import React, { useReducer } from 'react'
import { useCreateOrderMutation } from '../state/pizzaApi'
const CHANGE_INPUT = 'CHANGE_INPUT'
const RESET_FORM = 'RESET_FORM'

const initialFormState = { // suggested
  fullName: '',
  size: '',
  '1': false,
  '2': false,
  '3': false,
  '4': false,
  '5': false,
}

const reducer = (state, action) => {
  switch (action.type) {
    case CHANGE_INPUT: {
      const { name, value } = action.payload
      return { ...state, [name]: value }
    }
    case RESET_FORM:
      return initialFormState
    default:
      return state
  }
}
export default function PizzaForm() {

  const [state, dispatch] = useReducer(reducer, initialFormState)
  const [createOrder] = useCreateOrderMutation()

  const onChange = ({ target: { name, value, type, checked } }) => {
    dispatch({ type: CHANGE_INPUT, payload: { name, value: type === 'checkbox' ? checked : value } })
  }


 
  const createNewOrder = (evt) => {
    evt.preventDefault()
    let toppingsArray = []
    for (const [key, value] of Object.entries(state)) {
      if (value === true) {
        toppingsArray.push(key)
      }
    }
    const { fullName, size } = state
    createOrder({ fullName, size, toppings: toppingsArray})
  }

  return (
    <form onSubmit={createNewOrder}>
      <h2>Pizza Form</h2>
      {true && <div className='pending'>Order in progress...</div>}
      {true && <div className='failure'>Order failed: fullName is required</div>}

      <div className="input-group">
        <div>
          <label htmlFor="fullName">Full Name</label><br />
          <input
            data-testid="fullNameInput"
            id="fullName"
            name="fullName"
            placeholder="Type full name"
            type="text"
            onChange={onChange}
            value={state.fullName}
          />
        </div>
      </div>

      <div className="input-group">
        <div>
          <label htmlFor="size">Size</label><br />
          <select data-testid="sizeSelect" id="size" name="size" onChange={onChange} value={state.size}>
            <option value="">----Choose size----</option>
            <option value="S">Small</option>
            <option value="M">Medium</option>
            <option value="L">Large</option>
          </select>
        </div>
      </div>

      <div className="input-group">
        <label>
          <input data-testid="checkPepperoni" name="1" onChange={onChange} type="checkbox" value={state['1']} />
          Pepperoni<br /></label>
        <label>
          <input data-testid="checkGreenpeppers" name="2" type="checkbox" onChange={onChange} value={state['2']} />
          Green Peppers<br /></label>
        <label>
          <input data-testid="checkPineapple" name="3" type="checkbox" onChange={onChange} value={state['3']} />
          Pineapple<br /></label>
        <label>
          <input data-testid="checkMushrooms" name="4" type="checkbox" onChange={onChange} value={state['4']} />
          Mushrooms<br /></label>
        <label>
          <input data-testid="checkHam" name="5" type="checkbox" onChange={onChange} value={state['5']} />
          Ham<br /></label>
      </div>
      <input data-testid="submit" type="submit" />
    </form>
  )
}
