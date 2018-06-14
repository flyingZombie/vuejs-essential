// 引入路由作页面跳转用
import router from '../router'

// 导出一个 post 事件，这里的用户参数是 { article, articleId }，article 包含文章标题和内容，articleId 是文章 ID
export const post = ({ commit, state }, { article, articleId }) => {
  // 从仓库获取所有文章
  let articles = state.articles

  // 没有文章时，建一个空数组
  if (!Array.isArray(articles)) articles = []

  // 存在 article 时
  if (article) {
    // 因为是单用户，所以指定用户 ID 为 1
    const uid = 1
    // 获取用户传过来的 title 和 content
    const { title, content } = article
    // 获取当前日期
    const date = new Date()

    // 如果没传 articleId，表示新建文章
    if (articleId === undefined) {
      // 获取最后一篇文章
      const lastArticle = articles[articles.length - 1]
      //console.log('the lastArticle is :'+ lastArticle.articleId);

      if (lastArticle && lastArticle.articleId) {
        // 将当前 articleId 在最后一篇文章的 articleId 基础上加 1
        articleId = parseInt(lastArticle.articleId) + 1
      } else {
        // 将当前 articleId 在文章长度基础上加 1
        articleId = articles.length + 1
      }
      //console.log('the articleId is :'+ articleId);

      // 将当前文章添加到所有文章
      articles.push({
        uid,
        articleId,
        title,
        content,
        date
      })
    } else {
      for (let article of articles) {
        if (parseInt(article.articleId) === parseInt(articleId)) {
          article.title = title
          article.content = content
          break
        }
      }
    }

    // 更新所有文章
    commit('UPDATE_ARTICLES', articles)
    // 跳转到首页，并附带 articleId 和 showMsg 参数，showMsg 用来指示目标页面显示一个提示，我们稍后添加相关逻辑
    //router.push({ name: 'Home', params: { articleId, showMsg: true } })
    router.push({ name: 'Content', params: { articleId, showMsg: true }})
  } else {
    for (let article of articles ) {
      if(parseInt(article.articleId) === parseInt(articleId)) {
        articles.splice(articles.indexOf(article), 1)
        break
      }
    }
    commit('UPDATE_ARTICLES', articles)
    router.push({ name: 'Home', params: { showMsg: true }})
  }
}

export const like = ({ commit , state }, { articleId, isAdd }) => {

  let articles = state.articles
  let likeUsers = []
  const uid = 1
  if (!Array.isArray(articles)) articles = []

  for (let article of articles) {

    if (parseInt(article.articleId) === parseInt(articleId)) {

      likeUsers = Array.isArray(article.likeUsers) ? article.likeUsers : likeUsers

      if (isAdd) {
        const isAdded = likeUsers.some(likeUser => parseInt(likeUser.uid) === uid)

        if (!isAdded) {
          likeUsers.push({ uid })
        }
      } else {
        for (let likeUser of likeUsers) {
          if (parseInt(likeUser.uid) === uid) {
            likeUsers.splice(likeUsers.indexOf(likeUser), 1)
            break
          }
        }
      }

      article.likeUsers = likeUsers
      break
    }
  }

  commit('UPDATE_ARTICLES', articles)

  return likeUsers

}
