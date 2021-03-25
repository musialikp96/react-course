const articlesKey = 'articles';

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

    function addArticle(title) {
        try {
            articles.push(title);
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
            return articles.includes(title)
        },
        setArticleAsRead(title) {
            addArticle(title)
        }
    }

    return api;
}

export default ArticleDatabase();