import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import MetaData from '../layout/MetaData';

const OrderSuccess = ({ history }) => {

    const redirect = () => {
        history.push('/orders/me')
    }
    return (
        <Fragment>
            <MetaData title={"Order successful"} />
            <div className="row justify-content-center">
                <div className="col-6 mt-5 text-center">
                    <img className="my-5 img-fluid d-block mx-auto" src="/images/order_success.png" alt="Order Success" width="200" height="200" />

                    <h2>Your order has been successfully placed.</h2>
                    {/* <button className="btn btn-block py-3">
                        <Link to="/orders/me">Go to your orders</Link>
                    </button> */}
                    <button className="btn my-3 review-btn px-4 text-white" onClick={redirect}>
                        Go to your orders
                    </button>
                </div>

            </div>
        </Fragment>
    );
};

export default OrderSuccess;