import myAxios from './helper';

export const register = (registerDetails)=>{
    return myAxios.post('/api/v1/auth/register', registerDetails).then((response) => response.data)
}

export const login = (loginDetails)=>{
    return myAxios.post('/api/v1/auth/login', loginDetails).then((response) => response.data)
}