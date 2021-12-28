import {collection, getDocs, query, where} from "firebase/firestore/lite"
import { db } from "../../firebase/config"

export const getProducts = async(categoryId) => {
    const productosRef = collection(db, "products")

    const q = await categoryId ? query(productosRef, where("category", "==", categoryId)) : productosRef
    return getDocs(q).then(response => {
         return response.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        }))
    }).catch(error => {
        console.log("ERROR: ", error)
    }).finally(() => {})
}
