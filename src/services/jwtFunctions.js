import axios from 'axios';

export const getUserFromJwt = async () => {
    try{
        let res = await axios.get('/auth/user');
        return res.data;
    } catch(e) {
        window.location.href = '/login';
    }
}