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
    where,
    limit,
    startAfter
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

export const getFilterProducts = (filter, sort, search, filterColor, Page_Size, setTotalPages, setCurrentPage, currentPage) => async (dispatch) => {
    let q = query(collection(db, 'products'))
    try {
        dispatch(setLoadingProducts(true))
        dispatch(setErrorProducts(null))
        
        if (filter) {
            q = query(q, where('category', '==', filter))
        }

        if (search) {
            q = query(q, where('keyword', '>=', search), where('keyword', '<=', search + '\uf8ff'))
        }

        if (sort == 'asc') {
            q = query(q, orderBy('discountPrice', 'asc'))
        } else if (sort == 'desc') {
            q = query(q, orderBy('discountPrice', 'desc'))
        }

        if (filterColor) {
            q = query(q, where('color', '==', filterColor))
        }

        // Get Total Pages
        const totalFilteredProducts = (await getDocs(q)).size
        const calculateTotalPage = Math.ceil(totalFilteredProducts / Page_Size)
        setTotalPages(calculateTotalPage)
        // console.log(totalFilteredProducts, "filterProduct")

        // reset pagination
        if (calculateTotalPage === 0) {
            setCurrentPage(0) 
        } else if (currentPage === 0 || currentPage > calculateTotalPage) {
            setCurrentPage(1)
        }

        q = query(q, limit(Page_Size))

        // Query pagination
        if (currentPage > 1) {
            // page 1 = 0
            // page 2 = 10
            // page 3 = 20

            const prevPageSnapshots = await getDocs(query(q, limit((currentPage - 1) * Page_Size)))
            // curent page (1 - 1) * 10 = 0
            // curent page (2 - 1) * 10 = 10
            // curent page (3 - 1) * 10 = 20
            const lastVisible = prevPageSnapshots.docs[prevPageSnapshots.docs.length-1]

            q = query(q, startAfter(lastVisible), limit(Page_Size))
        }

        // Get Products by query
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
        const dataCart = await getDoc(cartsRef)
        const detailCart = dataCart.data()
        if (detailCart) {
            await setDoc(cartsRef, {
                ...product,
                quantity: qty + Number(detailCart.quantity ?? 0),
                totalPrice: product.discount ? product.discountPrice * qty : product.price * qty
            })
        } else {
            await setDoc(cartsRef, {
                ...product,
                quantity: qty,
                totalPrice: product.discount ? product.discountPrice * qty : product.price * qty
            })
        }
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

export const checkoutCart = (idUser) => async (dispatch) => {
    try {
        dispatch(setLoadingCart(true))
        dispatch(setErrorCart(null))

        const userRef = doc(db, 'users', idUser)
        const cartRef = collection(userRef, 'cart')

        const querySnapshot = await getDocs(cartRef)

        querySnapshot.forEach((docSnapshot) => {
            deleteDoc(doc(cartRef, docSnapshot.id))
        })

        dispatch(getCartByUser(idUser))
    } catch (error) {
        console.log(error)
        dispatch(setErrorCart(error.message))
    } finally {
        dispatch(setLoadingCart(false))
    }
}