import { STORAGE_KEY } from "@Utils/constants";

export const getToken = (updateToken?: any): null | string => {
    if (updateToken) {
        localStorage.setItem(STORAGE_KEY.AUTH_TOKEN, updateToken);
        return updateToken;
    }

    return localStorage.getItem(STORAGE_KEY.AUTH_TOKEN);
};

export const IS_USER_AUTHENTICATED = (updateAuthenticated?: any) => {
    if (updateAuthenticated) {
        return localStorage.setItem('isUserAuthenticated', String(updateAuthenticated));
    }

    return localStorage.getItem('isUserAuthenticated') === "true";
};