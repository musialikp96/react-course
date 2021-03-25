const articlesKey = 'articles';

const ArticleDatabase = () => {

    const getArticles = () => {
        try {
            const articles = localStorage.getItem(articlesKey);
            if (articles) {
                return JSON.parse(articlesKey);
            } else {
                return [];
            }
        } catch (error) {
            console.error(error);
        }
    }

    const addArticle = title => {
        try {
            articles.push(title);
            localStorage.setItem(articlesKey, articles);
        } catch (error) {
            console.error(error);
        }
    }


    let articles = getArticles();

    const api = {
        refresh() {
            articles = getArticles()
        },
        isArticleRead(title) {
            return articles.includes(title)
        },
        setArticleAsRead(title) {
            addArticle(title)
        }
    }

    return api;
}

export default ArticleDatabase();