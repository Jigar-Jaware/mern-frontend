import axios from 'axios';

const api = axios.create({
    baseURL:'https://git.heroku.com/fixydate-api.git'
})

export default api;