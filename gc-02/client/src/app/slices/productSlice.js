import { createSlice } from '@reduxjs/toolkit'

export const productSlice = createSlice({
    name: 'product',
    initialState: {
        products: [],
        loadingProducts: false,
        errorProducts: null
    },
    reducers: {
        setProducts: (state, action) => {
            state.products = action.payload
        },
        setLoadingProducts: (state, action) => {
            state.loadingProducts = action.payload
        },
        setErrorProducts: (state, action) => {
            state.errorProducts = action.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { setProducts, setLoadingProducts, setErrorProducts } = productSlice.actions

export default productSlice.reducer