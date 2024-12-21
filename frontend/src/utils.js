export const activeClassButton = (flag) => flag? 'active': 'disabled';

export const getToken = (token) => {
    const authorizationTokenLocalStorage = JSON.parse(window.localStorage.getItem('auth'));
    return token || authorizationTokenLocalStorage.token;
}

