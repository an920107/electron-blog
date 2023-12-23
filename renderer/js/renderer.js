const titleInput = document.querySelector('#titleInput')
const contentInput = document.querySelector('#contentInput')
const submitButton = document.querySelector('#submitButton')

const articleList = document.querySelector('#articleList')
const articleTemplate = articleList.querySelector('#articleTemplate')

const addArticle = (title, content) => {
    const article = articleTemplate.cloneNode(true).content.querySelector('div')
    article.querySelector('h2').textContent = title
    article.querySelector('p').textContent = content
    articleList.appendChild(article)
    console.log(title)
    console.log(content)
}

submitButton.addEventListener('click', () => {
    addArticle(titleInput.value, contentInput.value)
})