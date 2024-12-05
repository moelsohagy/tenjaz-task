const MainLayout = () => import('../../components/MainLayout.vue')
const Users = () => import('./views/Index.vue')
const UserView = () => import('./views/UserView.vue')

export default [
  {
    path: '/users',
    component: MainLayout,
    children: [
      {
        path: '',
        name: 'Users',
        component: Users
      },
      {
        path: 'view/:id?',
        name: 'Users.View',
        component: UserView,
        meta: { title: 'User details', pageType: 'view' },
        props: true
      },
      {
        path: 'create',
        name: 'Users.Create',
        component: UserView,
        meta: { title: 'Create user', pageType: 'create' }
      },
      {
        path: 'update/:id?',
        name: 'Users.Update',
        meta: { title: 'Update user', pageType: 'update' },
        component: UserView,
        props: true
      }
    ]
  }
]
