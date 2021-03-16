import React, { Fragment } from 'react';
import Search from './Search';
import { Route, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { logout } from './../../redux/actions/userActions';
import { clearLocalStorage } from './../../redux/actions/cartActions';

const Header = () => {

    const alert = useAlert();
    const dispatch = useDispatch();

    const { user, loading, error } = useSelector(state => state.authFromStore);
    const { cartItems } = useSelector(state => state.cartFromStore);

    const logoutHandler = () => {
        dispatch(logout());
        dispatch(clearLocalStorage())
        alert.success("You've been successfully logged out")
    }
    return (
        <Fragment>
            <nav className="navbar row">
                <div className="col-12 col-md-3 text-center">
                    <div className="navbar-brand" id="logo">
                        <Link to='/'> <img src="/images/logoMod.png" /></Link>
                    </div>
                </div>

                <div className="col-12 offset-sm-1 offset-md-1 col-md-4 mt-2 mt-md-0 text-center">
                    <Route render={({ history }) => <Search history={history} />} />
                </div>

                <div className="col-12 col-md-4 mt-4 mt-md-0 text-xs-center text-center">

                    <Link className="ml-sm-1 mt-3 pb-0" to="/cart" style={{ textDecoration: 'none' }}>
                        {/* <span id="cart" className="ml-3">Cart</span> */}
                        <span id="cart">Cart</span>
                        <span className="ml-1" id="cart_count">{cartItems.length}</span>
                    </Link>
                    {
                        user ? (
                            <div className="mt-1 ml-2 dropdown d-inline">
                                <Link to="#!" className="btn dropdown-toggle text-white mr-4" type="button" id="dropDownMenuButton" data-toggle="dropdown"
                                    aria-haspopup="true" aria-expanded="false">
                                    <figure className="avatar avatar-nav">
                                        <img
                                            src={user.avatar && user.avatar.url}
                                            alt={user && user.name}
                                            className="rounded-circle"
                                        />
                                    </figure>
                                    <span>{user && user.firstName}</span>
                                </Link>

                                <div className="dropdown-menu" aria-labelledby="dropDownMenuButton">
                                    {user && user.role === 'admin' && (
                                        <Link to="/dashboard" className="dropdown-item">Dashboard</Link>
                                    )}
                                    <Link to="/orders/me" className="dropdown-item">Orders</Link>
                                    <Link className="dropdown-item" to="/me">Profile</Link>
                                    <Link className="dropdown-item text-danger" to="/" onClick={logoutHandler}>Logout</Link>
                                </div>
                            </div>
                        )
                            : !loading && <Link to="/login" className="btn ml-4" id="login_btn">Login</Link>
                    }
                </div>
            </nav>
        </Fragment >
    );
};

export default Header;