import React, { Fragment, useState, useEffect } from 'react'

import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import Sidebar from './Sidebar'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { updateUser, getUserDetails, clearErrors } from '../../redux/actions/userActions'
import { UPDATE_USER_RESET, CLEAR_USER_DETAILS } from '../../redux/constants/userConstants'

const UpdateUser = ({ history, match }) => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [role, setRole] = useState('')

    const alert = useAlert();
    const dispatch = useDispatch();

    const { user, loading } = useSelector(state => state.userDetailsFromStore)
    const { error, isUpdated } = useSelector(state => state.userFromStore);

    const userId = match.params.id;

    useEffect(() => {

        // console.log('user in useEffect', user)
        // console.log('user._id in useEffect', user._id)
        // console.log('userId in useEffect', userId)

        if (user && user._id !== userId) {
            dispatch(getUserDetails(userId))
        } else {
            setName(user.name);
            setEmail(user.email);
            setRole(user.role)
        }

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            alert.success('User updated successfully')

            history.push('/admin/users')

            dispatch({ type: UPDATE_USER_RESET })
            dispatch({ type: CLEAR_USER_DETAILS })
        }

    }, [dispatch, alert, error, history, isUpdated, userId, loading, user])

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('name', name);
        formData.set('email', email);
        formData.set('role', role);

        dispatch(updateUser(user._id, formData))
    }


    return (
        <Fragment>
            <MetaData title={`Update User`} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                {loading ?
                    <Loader />
                    :
                    <Fragment>
                        <div className="col-12 col-md-10">
                            <div className="row wrapper">
                                <div className="col-10 col-lg-5">
                                    <form className="shadow-lg" onSubmit={submitHandler}>
                                        <h1 className="mt-2 mb-5">Update User</h1>

                                        <div className="form-group">
                                            <label htmlFor="name_field">Name</label>
                                            <input
                                                type="name"
                                                id="name_field"
                                                className="form-control"
                                                name='name'
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="email_field">Email</label>
                                            <input
                                                type="email"
                                                id="email_field"
                                                className="form-control"
                                                name='email'
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="role_field">Role</label>

                                            <select
                                                id="role_field"
                                                className="form-control"
                                                name='role'
                                                value={role}
                                                onChange={(e) => setRole(e.target.value)}
                                            >
                                                <option value="user">user</option>
                                                <option value="admin">admin</option>
                                            </select>
                                        </div>

                                        <button
                                            type="submit"
                                            className="btn update-btn btn-block mt-4 mb-3"
                                            disabled={loading ? true : false} >Update</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </Fragment>
                }

            </div>

        </Fragment>
    )
}

export default UpdateUser