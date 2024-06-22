import React, { useEffect } from 'react'
import './Products.css'
import Productcard from '../../utils/Productcard'
import { Link, useLoaderData, useNavigation, useSearchParams } from 'react-router-dom'
import Filters from './Filters';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import LoadingScreen from '../../utils/loadingScreen.jsx'

export default function Products() {
    const [search] = useSearchParams();
    const pageNumber = search.get('page');
    const data = useLoaderData();
    const numberOfPages = Math.ceil(data.numberOfProducts / 100);
    const url = new URL(window.location.href);
    const navigation = useNavigation();
    const state = navigation.state === 'loading';
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [data])
    return (<>
        {state && <LoadingScreen />}
        <section className='all-products'>
            <Filters />
            <div className="content">
                <div className="products-results">
                    <Productcard label='home' products={data.result} />
                </div>
                <div className="pagination">
                    <Pagination
                        size='large'
                        page={+pageNumber}
                        count={numberOfPages}
                        renderItem={(item) => {
                            return <PaginationItem
                                component={Link}
                                to={
                                    `${url.pathname}?page=${item.page}${url.searchParams.size > 1 ? `&filter=${url.searchParams.get('filter')}&filterOptions=${url.searchParams.get('filterOptions').replaceAll('&', '%26')}` : ""}`
                                }
                                {...item}
                            />
                        }
                        }
                    />
                </div>
            </div>
        </section>
    </>
    )
}


