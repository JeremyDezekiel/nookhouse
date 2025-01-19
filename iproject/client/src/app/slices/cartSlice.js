import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cartProduct: [],
        loadingCart: false,
        errorCart: null,
    },
    reducers: {
        setCartProduct: (state, action) => {
            state.cartProduct = action.payload
        },
        setLoadingCart: (state, action) => {
            state.loadingCart = action.payload
        },
        setErrorCart: (state, action) => {
            state.errorCart = action.payload
        }
    }
})

export const { setCartProduct, setLoadingCart, setErrorCart } = cartSlice.actions

export default cartSlice.reducer