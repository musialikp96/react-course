import ky from 'ky';


const client = ky.create({
    prefixUrl: 'https://snazzymaps.com',
    headers: {}
})

const api = {
    getStyles(page, stylesFilters = {}) {

        let queryString = '&' + Object.keys(stylesFilters).map(key => key + '=' + stylesFilters[key]).join('&');
        return client
            .get(`explore.json?key=${process.env.REACT_APP_SNAZZY_API_KEY}${queryString}`, {})
            .json()
    },
}

export default api