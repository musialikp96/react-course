import ky from 'ky';

const getPrefixUrl = (lang) => {
    return `https://${lang}.wikipedia.org/w`;
}

const client = ky.create({
    headers: {
        'content-type': 'application/json'
    }
})

const api = {
    getArticles({ coord, radius = 10000, limit = 10 } = {}, lang = 'pl') {
        const params = {
            action: 'query',
            list: 'geosearch',
            format: 'json',
            origin: '*'
        }
        if (!coord) {
            console.error('Wikipedia API: no coord passed to getArticles')
        }
        return client
            .get(`api.php?`, {
                prefixUrl: getPrefixUrl(lang),
                searchParams: {
                    ...params,
                    gscoord: coord.lat + '|' + coord.lng,
                    gsradius: radius,
                    gslimit: limit
                }
            })
            .json()
    }
}

export default api