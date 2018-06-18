import Mock from 'mockjs'
import store from '../store'

// 拦截活跃用户请求并返回相关数据
Mock.mock('/users/active', 'get', () => {
  // 使用派生状态 computedArticles
  let articles = store.getters.computedArticles
  let comments = []
  let usersObj = {}
  // 活跃用户
  let activeUsers = []

  articles.map((article) => {
    const articleComments = Array.isArray(article.comments) ? article.comments : []
    // 合并评论，等价于 comments = comments.concat(articleComments)
    comments = [...comments, ...articleComments]
  })

  // 统计用户发布评论的数量，并返回包含头像和数量的对象
  usersObj = comments.reduce((accumulator, currentValue) => {
    accumulator[currentValue.uname] = accumulator[currentValue.uname] || {}
    accumulator[currentValue.uname].avatar = currentValue.uavatar
    accumulator[currentValue.uname].num = ++accumulator[currentValue.uname].num || 1
    return accumulator
  }, {})

  // 将统计后的数据放入一个数组
  for (const [key, value] of Object.entries(usersObj)) {
    activeUsers.push({
      name: key,
      avatar: value.avatar,
      num: value.num
    })
  }

  // 将发布评论最多的用户排在前面
  activeUsers.sort((a, b) => b.num - a.num)
  // 取前 8 个发布评论最多的用户
  activeUsers = activeUsers.slice(0, 8)

  return activeUsers
})

Mock.mock('/articles/hot', 'post', (options) => {
  let filteredArticles = store.getters.getArticlesByFilter('noreply')
  let articles = filteredArticles.reverse()
  let hotArticles = articles.filter((article)=> (new Date() - new Date(article.date) < 604800000))
  let num
  if (options.body) {
    try {
      num = JSON.parse(options.body).num
    } catch (e) {}
  }
  hotArticles = hotArticles.slice(0, num || 10)
  return hotArticles

})
