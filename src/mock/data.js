import Mock from 'mockjs'
import ls from '../utils/localStorage'

const Random = Mock.Random
const localArticles = ls.getItem('articles')
const localUser = ls.getItem('user')
const localUserName = localUser ? localUser.name : undefined
let nextArticleId = 1

if (Array.isArray(localArticles) && localArticles.length) {
  nextArticleId = parseInt(localArticles[localArticles.length - 1].articleId) + 1
}

export const mockArticles = (num = 10) => {
  const forbiddenNames = [localUserName, 'topics']
  let articles = []
  let unames = []
  num = num > 60 ? 60 : num
  const arr = [...Array(num)].forEach((article, index) => {
    let uname = Random.first()

    while (unames.indexOf(uname) !== -1 || forbiddenNames.indexOf(uname) !== -1 ) {
      uname = Random.first()
    }
    unames.push(uname)
    articles.push({
      uid: index + 2,
      articleId: nextArticleId + index,
      title: Random.ctitle(10, 20),
      content: Random.cparagraph(3, 5),
      date: new Date(),
      likeUsers: [],
      comments: [],
      uname
    })
  })
  articles.forEach((article, index) => {
    let likeUsers = []
    let comments = []
    let randomArticles = getRandomArticles(articles)

    randomArticles.forEach((article, index) => {
      likeUsers.push({
        uid: article.uid,
        uname: article.uname
      })
    })
    randomArticles = getRandomArticles(articles)

    randomArticles.forEach((article, index) => {
      comments.push({
        uid: article.uid,
        commentId: index + 1,
        content: Random.sentence(5, 10),
        date: article.date,
        uname: article.uname
      })
    })
    article.likeUsers = likeUsers
    article.comments = comments
  })
  return articles
}

function getRandomArticles(articles, num = 5) {
  const randomNum = Math.floor(Math.random() * num + 1)
  const randomArticles = [...Array(randomNum)].map(() => articles[Math.floor(Math.random() * articles.length )])
  return [...new Set(randomArticles) ]
}
