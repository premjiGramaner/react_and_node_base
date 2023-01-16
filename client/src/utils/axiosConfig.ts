import axios from "axios";
import { API_URL } from "@Utils/constants";
import { getToken } from "@Utils/storage";

const fetchClient = () => {
    const tokenString = getToken();

    const defaultOptions = {
        baseURL: `${API_URL}`,
    };

    const instance = axios.create(defaultOptions);

    if (instance && instance.interceptors) {
        instance.interceptors.request.use((config) => {
            if (tokenString != null && config.headers) {
                config.headers.Authorization = `Bearer ${tokenString}`;
            }
            return Promise.resolve(config);
        });

        instance.interceptors.response.use(response => response, error => {
            if (error.response) {
                switch (error.response.status) {
                    case 500:
                        // Internal Server Error
                        console.log('Internal Server Error - 500', error);
                        return error.response;

                    case 404:
                        // API not found
                        console.log('error - 404', error);
                        break;

                    default:
                        console.log('error Status: ', error.response.status);
                        console.log('error Response: ', error.response);
                        return error.response;
                }
            }

            return Promise.reject(error);
        });
    }

    return instance;
};

export { fetchClient };
export default fetchClient();