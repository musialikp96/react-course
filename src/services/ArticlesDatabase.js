const articlesKey = 'articles';
const colorsKey = 'colors';

export const ARTICLE_STATE = Object.freeze({
    DEFAULT: "DEFAULT",
    READ: "READ",
    VISITED: "VISITED",
})

let defaultColors = {
    DEFAULT: {
        background: '#ff7e23e0',
        shadow: '#ffa769',
    },
    READ: {
        background: '#237bffe0',
        shadow: '#698bff',
    },
    VISITED: {
        background: '#aaa',
        shadow: '#222',
    }
}

const ArticleDatabase = () => {
    let articles = getItemsByKey(articlesKey);
    let colors = getColors();

    function getItemsByKey(key) {
        try {
            let items = localStorage.getItem(key);
            if (items) {
                return JSON.parse(items);
            } else {
                return [];
            }
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    function getColors() {
        if (!getItemsByKey(colorsKey).DEFAULT) return defaultColors;
        return getItemsByKey(colorsKey)
    }

    function addArticle(title, state = ARTICLE_STATE.READ) {
        try {
            if (!articles.find(article => article.title === title)) {
                articles.push({ title, state });
            } else {
                let itemIndex = articles.findIndex(article => article.title === title);
                articles[itemIndex].state = state;
            }
            localStorage.setItem(articlesKey, JSON.stringify(articles));
        } catch (error) {
            console.error(error);
        }
    }

    const api = {
        refresh() {
            articles = getItemsByKey(articlesKey)
        },
        isArticleRead(title) {
            return articles.find(article => title === article.title)?.state === ARTICLE_STATE.READ;
        },
        getArticleState(title) {
            if (!articles.find(article => title === article.title)) {
                return ARTICLE_STATE.DEFAULT;
            }
            return articles.find(article => title === article.title).state;
        },
        setArticleState(title, state) {
            addArticle(title, state)
        },
        setColor(color, state) {
            try {
                let newColors = {
                    ...colors,
                    [state]: {
                        ...colors[state],
                        background: color
                    }
                }
                localStorage.setItem(colorsKey, JSON.stringify(newColors));
            } catch (error) {
                console.error(error);
            }
        },
        getColors
    }

    return api;
}

export default ArticleDatabase();