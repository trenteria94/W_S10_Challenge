import { createSlice } from '@reduxjs/toolkit'

const initialFormState = { // suggested
    fullName: '',
    size: '',
    '1': false,
    '2': false,
    '3': false,
    '4': false,
    '5': false,
  }

export const pizzaSlice = createSlice({
    name: 'pizzaForm',
    initialFormState,
    reducers: {
        
    }
})