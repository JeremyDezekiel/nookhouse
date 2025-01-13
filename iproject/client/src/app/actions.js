import { setErrorProducts, setLoadingProducts, setProduct, setProducts } from './slices/productSlice'
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    query,
    updateDoc,
    where
} from 'firebase/firestore'
import { db } from '../config/firebase'

export const getProducts = (email) => async (dispatch) => {
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
        dispatch(setProducts(productsStore))
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
            images: [product.image],
            description: product.description,
            price: Number(product.price),
            stock: Number(product.stock),
            createdBy: product.email
            // date: new Date()
        })
        dispatch(getProducts(product.email))
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
            images: [product.image],
            description: product.description,
            price: Number(product.price),
            stock: Number(product.stock),
            // date: new Date()
        })
        dispatch(getProducts(email))
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
        dispatch(getProducts(email))
    } catch (error) {
        console.error(error)
        dispatch(setErrorProducts(error.message))
    } finally {
        dispatch(setLoadingProducts(false))
    }
}