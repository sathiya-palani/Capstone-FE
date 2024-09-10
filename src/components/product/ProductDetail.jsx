import { Fragment, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import { createReview, getProduct } from "../../actions/productActions"
import Loader from '../layouts/Loader';
import { Carousel } from 'react-bootstrap';
// import MetaData from "../layouts/MetaData";
import { addCartItem } from "../../actions/cartActions";
import {clearReviewSubmitted, clearError, clearProduct} from '../../slices/productSlice';
// import {Modal} from 'react-bootstrap';
  import { toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  
// import ProductReview from "./ProductReview";


export default function ProductDetail () {
    const { loading, product = {}, isReviewSubmitted, error} = useSelector((state)=>state.productState);
    const { user } = useSelector(state => state.authState);
    const dispatch = useDispatch();
    const { id } = useParams()
    const [quantity, setQuantity] = useState(1);

    const increaseQty = () => {
        const count = document.querySelector('.count')
        if(product.stock ===0 ||  count.valueAsNumber >= product.stock) return;
        const qty = count.valueAsNumber + 1;
        setQuantity(qty);
    }
    const decreaseQty = () => {
        const count = document.querySelector('.count')
        if(count.valueAsNumber === 1 ) return;
        const qty = count.valueAsNumber - 1;
        setQuantity(qty);
    }

    const [show, setShow] = useState(false);

    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);
    // const [rating, setRating] = useState(1);
    // const [comment, setComment] = useState("");

    // const reviewHandler = () => {
    //     const formData = new FormData();
    //     formData.append('rating', rating);
    //     formData.append('comment', comment);
    //     formData.append('productId', id);
    //     dispatch(createReview(formData))

    // }

    // useEffect(()=>{
    //     if(isReviewSubmitted) {
    //         handleClose()
    //         toast('Review Submitted successfully',{
    //             type: 'success',
    //             // Position: "bottom-center",
    //             onOpen: () => dispatch(clearReviewSubmitted())
    //         })
            
    //     }
    //     if(error)  {
    //         toast(error, {
    //             // position: "bottom-center",
    //             type: 'error',
    //             onOpen: ()=> { dispatch(clearError()) }
    //         })
    //         return
    //     }
    //     if(!product._id || isReviewSubmitted) {
    //         dispatch(getProduct(id))
    //     }

    //     return () => {
    //         dispatch(clearProduct())
    //     }
        

    // },[dispatch,id,isReviewSubmitted, error])

    useEffect (() => {
        // console.log(product);
        dispatch(getProduct(id))
       }, [dispatch, id ])
    

    return (
        <Fragment>
            {loading? <Loader/>:
            <Fragment>
            
                <div className="row f-flex justify-content-around">
                    <div className="col-12 col-lg-5 img-fluid" id="product_image">
                        <Carousel pause="hover">
                            {product.images && product.images.length > 0 && product.images.map(image =>
                                <Carousel.Item key={image._id}>
                                    <img className="d-block w-100"  src={image.image} alt={product.name} height="500" width="500" />
                                </Carousel.Item>
                            )}
                        </Carousel>
                    </div>

                    <div className="col-12 col-lg-5 mt-5">
                    <h3>{product.name}</h3>
                    <p id="product_id">Product # {product._id}</p>

                    <hr/>
                    <h4 className="mt-2">Specification</h4>
                <p id="product_id">{product.specification}</p>

            
                    <hr/>

                    <h3>Rental Rate </h3>     <p id="product_price">${product.rentalRatePerMonth}/month</p>
                    <div className="stockCounter d-inline">
                        <span className="btn btn-danger minus" onClick={decreaseQty} >-</span>

                        <input type="number" className="form-control count d-inline" value={quantity} readOnly />

                        <span className="btn btn-primary plus" onClick={increaseQty}>+</span>
                    </div>

                    {/* <button type="button" id="cart_btn" 
                    //  disabled={product.stock===0?true:false} 
                     onClick={()=>{
                        dispatch(addCartItem(product._id, quantity))
                        toast('Cart Item Added!',{
                            type: 'success',
                           
                        })
                    }}
                     className="btn btn-primary d-inline ml-4"
                     >Add to Cart</button> */}

                     
             <button type="button" id="cart_btn"
             onClick={() =>dispatch(addCartItem(product._id))}
              className="btn btn-primary d-inline ml-4">Add to Booking</button>


                    <hr/>

                    <p>Available  <span id="stock_status">available</span></p>

           <hr/>

                <p>Availability Date <span id="stock_status">{product.availabilityDate}</span></p>

             <h4 className="mt-2">Description:</h4>
           <p>{product.description}</p>
               <hr/>
                  <p id="product_seller mb-3">Location:<strong>{product.location}</strong></p>             
                </div>

                </div>

              
            </Fragment>}
        </Fragment>
    )
}














