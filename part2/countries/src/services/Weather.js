import axios from 'axios';

const baseUrl = 'https://wttr.in/';
const options = '?format=j1';

const getByCountryName = (countryName) => {
    const newString = countryName.replace(/ /g, '+');
    return axios.get(`${baseUrl}${newString}${options}`)
}

export default { getByCountryName }
