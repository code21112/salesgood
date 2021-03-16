import React, { Fragment, useEffect, useState } from 'react';
import Pagination from 'react-js-pagination';

import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

import MetaData from './layout/MetaData';
import Product from './product/Product';
import Loader from './layout/Loader';

import { useDispatch, useSelector } from 'react-redux';
import { getProducts, getMaxPrice } from './../redux/actions/productActions'
import { useAlert } from 'react-alert';

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);

const Home = ({ match }) => {

    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([1, 3000]);
    const [category, setCategory] = useState('');
    const [rating, setRating] = useState(0);

    const categories = [
        'Percussion instruments',
        'Wind instruments',
        'Stringed instruments',
        'Electronic instruments',
        'Accessories',
        'Recording gear',
        'Headphones',
        'Virtual instruments',
    ];

    // Sorting categories by alphabetical order
    const sortCategories = categories.sort(function (a, b) {
        var categoryA = a.toUpperCase();
        var categoryB = b.toUpperCase();
        if (categoryA < categoryB) {
            return -1;
        }
        else if (categoryA > categoryB) {
            return 1;
        }
        return 0;
    });

    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, products, error, productCount, resultsPerPage, filteredProductsCount } = useSelector(state => state.productsFromStore)
    const { maxPrice } = useSelector(state => state.maxPriceFromStore)

    const keyword = match.params.keyword;

    useEffect(() => {
        if (error) {
            return alert.error(error)
        }
        dispatch(getProducts(keyword, currentPage, price, category, rating))
        dispatch(getMaxPrice())
    }, [dispatch, alert, error, keyword, currentPage, price, category, rating, maxPrice])

    const setCurrentPageNo = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    let count = productCount;
    if (keyword) {
        count = filteredProductsCount;
    }

    return (
        <Fragment>
            {loading ?
                <Loader />
                :
                <Fragment>
                    <MetaData
                        title={"Best instruments"}
                    />
                    {keyword ?
                        <h1 id="products_heading">Results</h1>
                        :
                        <h1 id="products_heading">Latest Products</h1>
                    }
                    <section id="products" className="container mt-5">
                        <div className="row">

                            {keyword ? (
                                <Fragment>
                                    <div className="col-6 col-md-3 mt-5 mb-5">
                                        <div className="px-3">

                                            <Range
                                                marks={{
                                                    1: `$1`,
                                                    999: `$999`,
                                                    // 1999: `$1999`,
                                                    // 2999: `$2999`,
                                                    // 3000: `$3000`
                                                    // 10000: `${maxPrice}`
                                                }}
                                                min={1}
                                                // max={3000}
                                                max={`${maxPrice}`}
                                                defaultValue={[1, maxPrice]}
                                                // defaultValue={[1, 3000]}
                                                tipFormatter={value => `$${value}`}
                                                tipProps={{
                                                    placement: "top",
                                                    visible: true
                                                }}
                                                value={price}
                                                onChange={price => setPrice(price)}
                                            // pushable={true}
                                            />
                                            <hr className="my-5" />
                                            <div className="mt-5">
                                                <h4 className="mb-3">
                                                    Categories
                                                </h4>
                                                <ul className="pl-0 pr-4">
                                                    {sortCategories.map((category, i) => (
                                                        <li
                                                            style={{
                                                                cursor: 'pointer',
                                                                listStyle: 'none'
                                                            }}
                                                            key={i}
                                                            onClick={() => setCategory(category)}
                                                        >
                                                            {category}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            <hr className="my-3" />
                                            <div className="mt-5">
                                                <h5 className="mb-3">
                                                    Ratings                                                </h5>
                                                <ul className="pl-0 pr-4">
                                                    {[5, 4, 3, 2, 1].map((star, i) => (
                                                        <li
                                                            style={{
                                                                cursor: 'pointer',
                                                                listStyle: 'none'
                                                            }}
                                                            key={i}
                                                            onClick={() => setRating(star)}
                                                        >
                                                            <div className="rating-outer">
                                                                <div className="rating-inner"
                                                                    style={{
                                                                        width: `${star * 20}%`
                                                                    }}
                                                                >

                                                                </div>
                                                            </div>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                        </div>
                                    </div>
                                    <div className="col-6 col-md-9">
                                        <div className="row">
                                            {products.map(product => (
                                                <Product key={product._id} product={product} col={4} />
                                            ))}
                                        </div>
                                    </div>
                                </Fragment >
                            ) : (
                                products.map(product => (
                                    <Product key={product._id} product={product} col={3} />
                                ))
                            )}

                        </div >
                    </section >
                    {resultsPerPage <= count && (
                        <div className="d-flex justify-content-center mt-5">
                            <Pagination
                                activePage={currentPage}
                                itemsCountPerPage={resultsPerPage}
                                totalItemsCount={productCount}
                                onChange={setCurrentPageNo}
                                nextPageText={'Next'}
                                prevPageText={'Prev'}
                                firstPageText={'First'}
                                lastPageText={'Last'}
                                itemClass="page-item"
                                linkClass="page-link"
                            />
                        </div>
                    )
                    }
                </Fragment >
            }
        </Fragment >
    )
};

export default Home;

