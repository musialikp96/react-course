const articlesKey = 'articles';

export const ARTICLE_STATE = Object.freeze({
    DEFAULT: "DEFAULT",
    READ: "READ",
    VISITED: "VISITED",
})

const ArticleDatabase = () => {
    let articles = getArticles();

    function getArticles() {
        try {
            const articles = localStorage.getItem(articlesKey);
            if (articles) {
                return JSON.parse(articles);
            } else {
                return [];
            }
        } catch (error) {
            console.error(error);
            return [];
        }
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
            articles = getArticles()
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
        }
    }

    return api;
}

export default ArticleDatabase();