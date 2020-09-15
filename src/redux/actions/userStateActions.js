export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export const login = (user, role, settings) => {
    return {
        type: LOGIN,
        payload: {
            isLoggedIn: true,
            role: role,
            user: user,
            settings: settings
        }
    }
}

export const logout = () => {
    return {
        type: LOGOUT,
        payload: {
            isLoggedIn: false,
            role: null,
            user: null
        }
    }
}