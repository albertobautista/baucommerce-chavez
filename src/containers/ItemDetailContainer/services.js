import {doc, getDoc} from "firebase/firestore/lite";
import {db} from "../../firebase/config";

export const getProduct = async (productId) => {
    const docRef = await doc(db, "products", productId);
    return getDoc(docRef).then(doc => ({
        id: doc.id,
        ...doc.data()
    })).catch((error) => {
        console.log("Error getProduct:", error.message)
    })


}
