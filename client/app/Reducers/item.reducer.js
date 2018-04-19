import { itemConstants } from "../Constants";
let item = JSON.parse(localStorage.getItem('item'));
const initialState = item ? { getall: true, item } : {};

export function item(state = initialState, action) {
  switch (action.type) {
    case itemConstants.GETALL_REQUEST:
      return {
        getAll: true,
        items:action.item
      };
    case itemConstants.GETALL_SUCCESS:
      return {
        items:action.item
      };
    case itemConstants.GETALL_FAILURE:
      return { 
        error: action.error
      };
      case itemConstants.ADD_REQUEST:
      return {
        loading: true
      };
    case itemConstants.ADD_SUCCESS:
      return {
        items: action.item
      };
    case itemConstants.ADD_FAILURE:
      return { 
        error: action.error
      };
      case itemConstants.EDIT_REQUEST:
      return {
        loading: true
      };
    case itemConstants.EDIT_SUCCESS:
      return {
        items: action.item
      };
    case itemConstants.EDIT_FAILURE:
      return { 
        error: action.error
      };
    case itemConstants.DELETE_REQUEST:
      // add 'deleting:true' property to user being deleted
      return {
        ...state,
        items: state.items.map(user =>
          user.id === action.id
            ? { ...item, deleting: true }
            : user
        )
      };
    case itemConstants.DELETE_SUCCESS:
      // remove deleted user from state
      return {
        items: state.items.filter(user => user.id !== action.id)
      };
    case itemConstants.DELETE_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to user 
      return {
        ...state,
        items: state.items.map(user => {
          if (user.id === action.id) {
            // make copy of user without 'deleting:true' property
            const { deleting, ...userCopy } = user;
            // return copy of user with 'deleteError:[error]' property
            return { ...userCopy, deleteError: action.error };
          }

          return item;
        })
      };
    default:
      return state
  }
}