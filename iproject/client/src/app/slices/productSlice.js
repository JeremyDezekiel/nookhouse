import { createSlice } from '@reduxjs/toolkit'

export const productSlice = createSlice({
    name: 'product',
    initialState: {
        products: [],
        productsByEmail: [],
        product: null,
        loadingProducts: false,
        errorProducts: null
    },
    reducers: {
        setProducts: (state, action) => {
            state.products = action.payload
        },
        setProductsByEmail: (state, action) => {
            state.productsByEmail = action.payload
        },
        setProduct: (state, action) => {
            state.product = action.payload
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
export const { setProducts, setProduct, setLoadingProducts, setErrorProducts, setProductsByEmail } = productSlice.actions

export default productSlice.reducer