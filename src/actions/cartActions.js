// import {addCartItemRequest, addCartItemSuccess} from '../slices/cartSlice';
// import axios from 'axios'

// export const addCartItem = (id, quantity) => async(dispatch) => {
//     try {
//         dispatch(addCartItemRequest())
//         const {data } = await axios.get(`https://capstone-be-3xps.onrender.com/api/v1/product/${id}`)

//         dispatch(addCartItemSuccess({
//             product: data.product._id,
//             name: data.product.name,
//             rentalRatePerMonth: data.product.rentalRatePerMonth,
//             image: data.product.images[0].image,
//             // stock: data.product.stock,
//             quantity
//         }))
//     } catch (error) {
        
//     }
// }

import {addCartItemRequest, addCartItemSuccess} from '../slices/cartSlice';
import axios from 'axios'

export const addCartItem = (id, quantity) => async(dispatch) => {
    try {
        dispatch(addCartItemRequest())

        const {data } = await axios.get(`https://capstone-be-2-52ns.onrender.com/api/v1/product/${id}`)
        dispatch(addCartItemSuccess({
            product: data.product._id,
            name: data.product.name,
            rentalRatePerMonth: data.product.rentalRatePerMonth,
            image: data.product.images[0].image,
         
            quantity
        }))
    } catch (error) {
        
    }
}