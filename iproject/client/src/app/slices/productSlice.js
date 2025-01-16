import { createSlice } from '@reduxjs/toolkit'

export const productSlice = createSlice({
    name: 'product',
    initialState: {
        products: [],
        productsByEmail: [],
        filteredProducts: [],
        product: null,
        loadingProducts: false,
        errorProducts: null,
        search: '',
    },
    reducers: {
        setProducts: (state, action) => {
            state.products = action.payload
        },
        setProductsByEmail: (state, action) => {
            state.productsByEmail = action.payload
        },
        setFilteredProducts: (state, action) => {
            state.filteredProducts = action.payload
        },
        setProduct: (state, action) => {
            state.product = action.payload
        },
        setLoadingProducts: (state, action) => {
            state.loadingProducts = action.payload
        },
        setErrorProducts: (state, action) => {
            state.errorProducts = action.payload
        }, setSearch: (state, action) => {
            state.search = action.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { setProducts, setProduct, setLoadingProducts, setErrorProducts, setProductsByEmail, setFilteredProducts, setSearch } = productSlice.actions

export default productSlice.reducer