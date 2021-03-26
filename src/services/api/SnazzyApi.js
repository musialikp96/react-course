import ky from 'ky';


const client = ky.create({
    prefixUrl: 'https://snazzymaps.com',
    headers: {}
})

const api = {
    getStyles(page) {
        return client
            .get(`explore.json?key=${process.env.REACT_APP_SNAZZY_API_KEY}`, {})
            .json()
    },
}

export default api