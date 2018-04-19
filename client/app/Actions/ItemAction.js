import { itemService } from '../Services';
import { itemConstants } from '../Constants';
import { history } from '../Helpers';
import { alertActions } from '../Actions';

export const itemActions = {
    getAll,
    addItem,
    updateItem,
    remove
};

function getAll() {
    return dispatch => {
        dispatch(request());

        itemService.getAll()
            .then(
                items => dispatch(success(items)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: itemConstants.GETALL_REQUEST } }
    function success(items) { return { type: itemConstants.GETALL_SUCCESS, items } }
    function failure(error) { return { type: itemConstants.GETALL_FAILURE, error } }
}

function addItem(id) {
    return dispatch => {
        dispatch(request(id));

        itemService.delete(id)
            .then(
                items => { 
                    dispatch(success(id));
                },
                error => {
                    dispatch(failure(id, error));
                }
            );
    };

    function request(id) { return { type: itemConstants.ADD_REQUEST, id } }
    function success(id) { return { type: itemConstants.ADD_SUCCESS, id } }
    function failure(id, error) { return { type: itemConstants.ADD_FAILURE, id, error } }
}

function updateItem(id) {
    return dispatch => {
        dispatch(request(id));

        itemService.delete(id)
            .then(
                items => { 
                    dispatch(success(id));
                },
                error => {
                    dispatch(failure(id, error));
                }
            );
    };

    function request(id) { return { type: itemConstants.UPDATE_REQUEST, id } }
    function success(id) { return { type: itemConstants.UPDATE_SUCCESS, id } }
    function failure(id, error) { return { type: itemConstants.UPDATE_FAILURE, id, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function remove(id) {
    return dispatch => {
        dispatch(request(id));

        itemService.delete(id)
            .then(
                items => { 
                    dispatch(success(id));
                },
                error => {
                    dispatch(failure(id, error));
                }
            );
    };

    function request(id) { return { type: itemConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: itemConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: itemConstants.DELETE_FAILURE, id, error } }
}