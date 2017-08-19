// import { combineReducers } from 'redux'
import { ADD_TODO, SELECT_ALL, TOGGLE_ITEM_STATUS, DELETE_TODO_ITEM, CHANGE_ITEM_VALUE, CLEAR_ALL_DONE_ITEM, CHANGE_CURRENT_FILTER } from './actions'

const initialState = {
  list: [
    {
      id: Date.now(),
      done: false,
      value: '第一项'
    },
    {
      id: Date.now() + 1,
      done: true,
      value: '第二项'
    }
  ],
  currentFilter: 'All'
}

function list (list = initialState.list, action) {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...list,
        action.item
      ]
    case SELECT_ALL:
    case TOGGLE_ITEM_STATUS:
    case DELETE_TODO_ITEM:
    case CHANGE_ITEM_VALUE:
    case CLEAR_ALL_DONE_ITEM:
      return [...action.list]
    default:
      return list
  }
}

function currentFilter (filter = initialState.currentFilter, action) {
  switch (action.type) {
    case CHANGE_CURRENT_FILTER:
      return action.filter
    default:
      return filter
  }
}

function todoApp (state = {}, action) {
  return {
    list: list(state.list, action),
    currentFilter: currentFilter(state.currentFilter, action)
  }
}

export default todoApp