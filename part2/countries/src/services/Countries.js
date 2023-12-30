import axios from 'axios';

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api';

const getAll = () => {
    return axios.get(`${baseUrl}/all`)
}

const getByName = (name) => {
    return axios.get(`${baseUrl}/name/${name}`)
}

export default { getAll, getByName }
