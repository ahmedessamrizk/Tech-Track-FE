import { Outlet } from 'react-router-dom';
import Product from '../components/Products/Product'

export function ProductPage() {
    return (
        <>
            <Product />
            <Outlet />
        </>
    )
}
export default async function productDetailsLoader({ params }) {
    // console.log('product Details Loader entered', 'two requests');

    const productId = params.productId;

    const returnResult = {
        product: {},
        productRating: []
    }
    var requestOptions = {
        method: 'GET',

        redirect: 'follow'
    };
    const response = await fetch(`https://techtrack-be.vercel.app/api/v1/products/${productId}`, requestOptions);
    const result = await response.json();
    returnResult.product = result.data.data;

    return returnResult
}