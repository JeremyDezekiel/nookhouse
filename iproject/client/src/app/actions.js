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
    updateDoc,
    where
} from 'firebase/firestore'
import { db } from '../config/firebase'

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
            discount: product.discount,
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
            images: [product.image],
            description: product.description,
            price: Number(product.price),
            stock: Number(product.stock),
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