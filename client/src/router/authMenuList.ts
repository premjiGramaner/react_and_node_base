import { IMenuItem } from '@Interface/index';
import { URLS } from "@Utils/constants";
import {
    DashboardComponent,
    LoginComponent,
    pageNotFound
} from "@Pages/index";

export default [
    {
        path: URLS.PAGE_NOT_FOUND,
        routeName: 'Page Not Found',
        component: pageNotFound,
        icon: '',
        permissions: [],
        children: []
    },
    {
        path: URLS.DEFAULT,
        routeName: 'Default Component',
        component: DashboardComponent,
        icon: '',
        permissions: [],
        children: []
    },
    {
        path: URLS.DASHBOARD,
        routeName: 'Dashboard Component',
        component: DashboardComponent,
        icon: '',
        permissions: [],
        children: []
    },
    {
        path: URLS.LOGIN,
        routeName: 'Login Component',
        component: LoginComponent,
        icon: '',
        permissions: [],
        children: []
    }
] as IMenuItem[];