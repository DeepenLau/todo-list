import Home from './views/home/home.jsx'
import Todo from './views/todo/todo.jsx'

import List from './components/list/list.jsx'

const routes = [
  {
    path: '/',
    component: Home,
    exact: true
  },
  {
    path: '/todo',
    component: Todo,
    routes: [
      {
        path: '/todo',
        filter: 'All'
      },
      {
        path: '/todo/Active',
        filter: 'Active'
      },
      {
        path: '/todo/Done',
        filter: 'Done'
      }
    ]
  }
]

export default routes