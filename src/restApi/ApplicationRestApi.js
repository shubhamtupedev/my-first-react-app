import { encode as base64_encode } from 'base-64';
import { myAxios } from "../services/helper";


myAxios.interceptors.response.use(
    (response) => response,
    (error) => {
        if (!error.response) {
            error.message = 'The server is currently unreachable. Please try again later.';
        } else {
            if (error.response.status === 401) {
                error.message = 'Invalid username or password. Please try again.';
            } else if (error.response.status === 500) {
                error.message = 'An internal server error occurred. Please try again later.';
            } else if (error.response.status === 400) {
                error.message = error.response.data.response;
            } else {
                // Use a default message for other status codes
                error.message = error.response.data?.message || 'An unexpected error occurred. Please try again.';
            }
        }
        return Promise.reject(error);
    }
);

export const register = (registerDetails) => {
    const encodedPassword = base64_encode(registerDetails.password);
    return myAxios.post('/api/v1/auth/register',
        {
            email: registerDetails.email,
            phoneNumber: registerDetails.phoneNumber,
            password: encodedPassword // Send encoded password
        }
    ).then((response) => response.data)
}

export const login = (loginDetails) => {
    const encodedPassword = base64_encode(loginDetails.password);
    return myAxios.post('/api/v1/auth/login',
        {
            email: loginDetails.email,
            password: encodedPassword // Send encoded password
        }
    ).then((response) => response.data)
}
