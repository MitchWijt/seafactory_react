import axios from 'axios';


export const handleLogin = async (data) => {
    const {email, password} = data;
    try{
        const res = await axios.get('/login/admin', {
            headers: {
            'email': email,
            'password': password,
            'Content-Type': 'application/json'
            }
        })
        await axios.post('/auth/set-token', {jwt: res.data.jwt});
    } catch(e){
        console.log(e.response.data.description);
    }
}

export const handleLogout = async () => {
    
}