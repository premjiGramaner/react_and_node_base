import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { IDefaultPageProps, ILoginPageProps, IReducerState } from '@Utils/interface';
import { URLS } from '@Utils/constants';
import { IS_USER_AUTHENTICATED } from '@Utils/storage';

const LoginComponent: React.FC<IDefaultPageProps & ILoginPageProps> = (props) => {

    const onLogin = () => {
        IS_USER_AUTHENTICATED(true);
        props.navigate(URLS.DEFAULT)
    }

    return (
        <div className='login-page-main-container'>
            <p>{props.t('login.title', { "title": 'RAA' })}</p>
            <button onClick={onLogin}>Login</button>
        </div>
    )
};

export default LoginComponent;