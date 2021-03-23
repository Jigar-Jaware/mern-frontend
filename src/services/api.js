import axios from 'axios';

const api = axios.create({
    baseURL:'https://fixydate-api.herokuapp.com/'
})

export default api;
