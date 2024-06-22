import React from 'react'
import BackDropWindow from '../utils/BackDropWindow'
import { getToken } from '../utils/tokenFunctions';
import { redirect } from 'react-router-dom';

export function RatePage() {
    return (
        <BackDropWindow />
    )
}
export default async function addReview({ request, params }) {
    // console.log('add and edit Review Action entered');

    const searchParams = new URL(request.url).searchParams;
    const data = await request.formData();
    const review = {
        rating: data.get('rate'),
        review: data.get('comment'),
    }
    const token = getToken();
    const productId = params.productId;

    let requestOptions1;
    let fetchUrl = 'https://techtrack-be.vercel.app/api/v1/';
    const url = new URL(window.location.href);
    if (url.pathname.includes('edit')) {
        const rateTerm = searchParams.get("rate");
        const commentTerm = searchParams.get("comment");
        if (rateTerm === review.rating && commentTerm === review.review) {
            return redirect('..')
        }
        requestOptions1 = {
            method: 'PATCH',
            body: JSON.stringify(review),
            headers: {
                'Authorization': `Bearer ${JSON.parse(token)}`,
                'Content-Type': 'application/json'
            },
            redirect: 'follow'
        };
        fetchUrl += `reviews/${productId}`;
    } else {
        requestOptions1 = {
            method: 'POST',
            body: JSON.stringify(review),
            headers: {
                'Authorization': `Bearer ${JSON.parse(token)}`,
                'Content-Type': 'application/json'
            },
            redirect: 'follow'
        };
        fetchUrl += `products/${productId}/reviews`;
    }

    const response1 = await fetch(fetchUrl, requestOptions1);
    const result1 = await response1.json();
    if (result1.status === 'error') {
        if (result1.error.code === 11000) {
            return { error: "you can't rate the product twice" }
        } else {
            return { error: result1.message }
        }
    } else if (result1.status === 'fail') {
        return { error: result1.message }
    }
    return redirect('..')
}