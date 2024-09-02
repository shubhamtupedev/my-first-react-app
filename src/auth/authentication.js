export const doLogin = (data, next) => {
    localStorage.setItem("data", JSON.stringify(data));
    next();
}

export const isLogin = () => {
    let data = localStorage.getItem("data");
    if (data === null) {
        return true;
    } else {
        return false;
    }
}

export const doLogout = (next) => {
    localStorage.removeItem("data");
    next();
}

export const getCurrentUserDetails = () => {
    if (isLogin) {
        return JSON.parse(localStorage.getItem("data"));
    }
}
