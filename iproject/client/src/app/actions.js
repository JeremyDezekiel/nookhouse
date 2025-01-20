import { setErrorProducts, setFilteredProducts, setLoadingProducts, setProduct, setProducts, setProductsByEmail } from './slices/productSlice'
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    orderBy,
    query,
    setDoc,
    updateDoc,
    where
} from 'firebase/firestore'
import { db } from '../config/firebase'
import { setCartProduct, setErrorCart, setLoadingCart } from './slices/cartSlice'

export const getProducts = () => async (dispatch) => {
    try {
        dispatch(setLoadingProducts(true))
        dispatch(setErrorProducts(null))
        const q = query(collection(db, 'products'))
        const products = await getDocs(q)
        const productsStore = products.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }))
        dispatch(setProducts(productsStore))
    } catch (error) {
        console.error(error)
        dispatch(setErrorProducts(error.message))
    } finally {
        dispatch(setLoadingProducts(false))
    }
}

export const getProductsByEmail = (email) => async (dispatch) => {
    try {
        dispatch(setLoadingProducts(true))
        dispatch(setErrorProducts(null))
        const q = query(
            collection(db, 'products'),
            where('createdBy', '==', email)
        )
        const products = await getDocs(q)
        const productsStore = products.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }))
        dispatch(setProductsByEmail(productsStore))
    } catch (error) {
        console.error(error)
        dispatch(setErrorProducts(error.message))
    } finally {
        dispatch(setLoadingProducts(false))
    }
}

export const getFilterProducts = (filter, sort, search) => async (dispatch) => {
    let q = query(collection(db, 'products'))
    try {
        dispatch(setLoadingProducts(true))
        dispatch(setErrorProducts(null))
        if (filter) {
            q = query(q, where('category', '==', filter))
        }

        if (sort == 'asc') {
            q = query(q, orderBy('price', 'asc'))
        } else if (sort == 'desc') {
            q = query(q, orderBy('price', 'desc'))
        }

        if (search) {
            q = query(q, where('name', '>=', search), where('name', '<=', search + '\uf8ff'))
        }

        const products = await getDocs(q)
        const productsStore = products.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }))
        dispatch(setFilteredProducts(productsStore))
    } catch (error) {
        console.error(error)
        dispatch(setErrorProducts(error.message))
    } finally {
        dispatch(setLoadingProducts(false))
    }
}

export const getProduct = (id) => async (dispatch) => {
    try {
        dispatch(setLoadingProducts(true))
        dispatch(setErrorProducts(null))
        const product = await getDoc(doc(db, 'products', id))
        dispatch(setProduct(product.data()))
    } catch (error) {
        console.error(error)
        dispatch(setErrorProducts(error.message))
    } finally {
        dispatch(setLoadingProducts(false))
    }
}

export const addProduct = (product) => async (dispatch) => {
    try {
        dispatch(setLoadingProducts(true))
        dispatch(setErrorProducts(null))
        await addDoc(collection(db, 'products'), {
            name: product.name,
            category: product.category,
            images: product.images,
            description: product.description,
            price: Number(product.price),
            stock: Number(product.stock),
            weight: Number(product.weight),
            length: Number(product.length),
            width: Number(product.width),
            height: Number(product.height),
            color: product.color,
            discount: Number(product.discount),
            discountPrice: Number(product.discountPrice),
            keyword: product.name.toLowerCase(),
            createdBy: product.email
            // date: new Date()
        })
        dispatch(getProductsByEmail(product.email))
    } catch (error) {
        console.error(error)
        dispatch(setErrorProducts(error.message))
    } finally {
        dispatch(setLoadingProducts(false))
    }
}

export const editProduct = (product, email) => async (dispatch) => {
    try {
        dispatch(setLoadingProducts(true))
        dispatch(setErrorProducts(null))
        await updateDoc(doc(db, 'products', product.id), {
            name: product.name,
            category: product.category,
            images: product.images,
            description: product.description,
            price: Number(product.price),
            stock: Number(product.stock),
            weight: Number(product.weight),
            length: Number(product.length),
            width: Number(product.width),
            height: Number(product.height),
            color: product.color,
            discount: Number(product.discount),
            discountPrice: Number(product.discountPrice),
            keyword: product.name.toLowerCase(),
            createdBy: email
            // date: new Date()
        })
        dispatch(getProductsByEmail(email))
    } catch (error) {
        console.error(error)
        dispatch(setErrorProducts(error.message))
    } finally {
        dispatch(setLoadingProducts(false))
    }
}

export const deleteProduct = (id, email) => async (dispatch) => {
    try {
        dispatch(setLoadingProducts(true))
        dispatch(setErrorProducts(null))
        await deleteDoc(doc(db, 'products', id))
        dispatch(getProductsByEmail(email))
    } catch (error) {
        console.error(error)
        dispatch(setErrorProducts(error.message))
    } finally {
        dispatch(setLoadingProducts(false))
    }
}

//  Cart

export const addProductToCart = (idUser, idProduct, product, qty) => async (dispatch) => {
    try {
        dispatch(setLoadingCart(true))
        dispatch(setErrorCart(null))

        const userRef = doc(db, 'users', idUser)
        const cartsRef = doc(userRef, 'cart', idProduct)

        await setDoc(cartsRef, {
            ...product,
            quantity: qty,
            totalPrice: product.discount ? product.discountPrice * qty : product.price * qty
        })
    } catch (error) {
        console.log(error)
        dispatch(setErrorCart(error.message))
    } finally {
        dispatch(setLoadingCart(false))
    }
}

export const getCartByUser = (idUser) => async (dispatch) => {
    try {
        dispatch(setLoadingCart(true))
        dispatch(setErrorCart(null))

        const userRef = doc(db, 'users', idUser)
        const cartRef = collection(userRef, 'cart')

        const cart = await getDocs(cartRef)
        const cartStore = cart.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
    }))
        dispatch(setCartProduct(cartStore))
    } catch (error) {
        console.log(error)
        dispatch(setErrorCart(error.message))
    } finally {
        dispatch(setLoadingCart(false))
    }
}

export const editProductInCart = (idUser, idProduct, productsCart, qtyProduct) => async (dispatch) => {
    try {
        dispatch(setLoadingCart(true))
        dispatch(setErrorCart(null))

        const userRef = doc(db, 'users', idUser)
        const cartsRef = doc(userRef, 'cart', idProduct)

        await updateDoc(cartsRef, {
            quantity: qtyProduct,
            totalPrice: productsCart.discount ? productsCart.discountPrice * qtyProduct : productsCart.price * qtyProduct
        })
    } catch (error) {
        console.log(error)
        dispatch(setErrorCart(error.message))
    } finally {
        dispatch(setLoadingCart(false))
    }
}

export const deleteProductInCart = (idUser, idProduct) => async (dispatch) => {
    try {
        dispatch(setLoadingCart(true))
        dispatch(setErrorCart(null))

        const userRef = doc(db, 'users', idUser)

        await deleteDoc(doc(userRef, 'cart', idProduct))

        dispatch(getCartByUser(idUser))
    } catch (error) {
        console.log(error)
        dispatch(setErrorCart(error.message))
    } finally {
        dispatch(setLoadingCart(false))
    }
}