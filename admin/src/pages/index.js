
import Dashboard from './Dashboard';
import Login from './login';

import NotFound from './notFound'

export const Pages = {
    Dashboard: {
        page: Dashboard,
        path: '/'
    },
    Login: {
        page: Login,
        path: '/login'
    },
    NotFound: {
        page: NotFound,
        path: '*'
    }
}