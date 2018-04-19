import { userService } from '../Services';
import { userConstants } from '../Constants';
import { history } from '../Helpers';
import { alertActions } from '../Actions';

export const userActions = {
    login,
    logout,
    loggedIn,
    signUp,
    getAll,
    remove
};

function getAll() {
    return dispatch => {
        dispatch(request());

        userService.getAll()
            .then(
                users => dispatch(success(users)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: userConstants.GETALL_REQUEST } }
    function success(users) { return { type: userConstants.GETALL_SUCCESS, users } }
    function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
}