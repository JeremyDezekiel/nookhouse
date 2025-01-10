import { setErrorProducts, setLoadingProducts, setProducts } from './slices/productSlice'
import { collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore'
import { db } from '../config/firebase'
import Swal from 'sweetalert2'

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

export const deleteProduct = async (id) => {
    try {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                await deleteDoc(doc(db, 'products', id))
                Swal.fire({
                    title: "Deleted!",
                    text: "Your product has been deleted.",
                    icon: "success"
                });
                dispatch(getProducts())
            }
        });
    } catch (error) {
        console.error(error)
    }
}