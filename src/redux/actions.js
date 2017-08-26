/*
 * action 类型 (actionTypes)
 */

export const ADD_TODO = 'ADD_TODO'
export const SELECT_ALL = 'SELECT_ALL'
export const TOGGLE_ITEM_STATUS = 'SELECT_ALL'
export const DELETE_TODO_ITEM = 'DELETE_TODO_ITEM'
export const CHANGE_ITEM_VALUE = 'CHANGE_ITEM_VALUE'
export const CLEAR_ALL_DONE_ITEM = 'CLEAR_ALL_DONE_ITEM'

// export const CHANGE_CURRENT_FILTER = 'CHANGE_CURRENT_FILTER'

/*
 * 其它的常量
 */

export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_DONE: 'SHOW_DONE',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
}

/*
 * action 创建函数
 */

export function addTodo(item) {
  return { type: ADD_TODO, item }
}

export function selectAll(list) {
  return { type: SELECT_ALL, list }
}

export function toggleItemStatus(list) {
  return { type: TOGGLE_ITEM_STATUS, list }
}
export function deleteTodoItem(list) {
  return { type: DELETE_TODO_ITEM, list }
}
export function changeItemValue(list) {
  return { type: CHANGE_ITEM_VALUE, list }
}
export function clearAllDoneItem(list) {
  return { type: CLEAR_ALL_DONE_ITEM, list }
}


// export function changeCurrentFilter(filter) {
//   return { type: CHANGE_CURRENT_FILTER, filter }
// }