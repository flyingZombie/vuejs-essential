import Vue from 'vue'
import Router from 'vue-router'

import routes from './routes'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  linkExactActiveClass: 'active',
  routes
})

router.beforeEach((to, from , next) => {
  const app = router.app
  const store = app.$options.store
  const auth = store.state.auth

  const articleId = to.params.articleId

  app.$message.hide()

  if (
      (auth && to.path.indexOf('/auth/') !== -1)
      || (!auth && to.meta.auth)
      || ( articleId && !store.getters.getArticleById(articleId))
    ) {
    next('/')
    } else {
      next()
    }
  })

router.afterEach((to, from ) => {
  const app = router.app
  const store = app.$options.store
  const showMsg = to.params.showMsg

  if (showMsg) {
  // showMsg 是一个字符时，使用它作为消息内容
  if (typeof showMsg === 'string') {
    // 显示消息提示
    app.$message.show(showMsg)
  } else {
    // 显示操作成功
    app.$message.show('操作成功')
  }
}

})

export default router
