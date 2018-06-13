<template>

<div class="blog-container" style="margin-top:20px">
    <div class="blog-pages">
      <div class="col-md-9 left-col pull-right">
        <div class="panel article-body content-body">
          <h1 class="text-center">{{ title }}</h1>
          <div class="article-meta text-center">
            <i class="fa fa-clock-o"></i>
            <abbr>{{ date | moment('from') }}</abbr>
          </div>
          <div class="entry-content">
            <div class="content-body entry-content panel-body ">
              <div class="markdown-body" v-html="content"></div>

              <div v-if="auth && uid === 1" class="panel-footer operate">
                <div class="actions">
                  <a href="javascript:;" @click="deleteArticle" class="admin">
                    <i class="fa fa-trash-o"></i>
                  </a>
                  <a href="javascript:;" @click="editArticle" class="admin">
                    <i class="fa fa-pencil-square-o"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import SimpleMDE from 'simplemde'
import hljs from 'highlight.js'
import emoji from 'node-emoji'
import { mapState } from 'vuex'

export default {
  name: 'Content',
  data() {
    return {
      title: '',
      content: '',
      date: '',
      uid: 1
    }
  },

  computed: {
    ...mapState([
       'auth',
       'user'
      ])
  },

  created() {
    const articleId = this.$route.params.articleId
    const article = this.$store.getters.getArticleById(articleId)

    if (article) {
      let { title , content, date , uid } = article

      this.uid = uid
      this.title = title
      this.content = SimpleMDE.prototype.markdown(emoji.emojify(content, name => name))
      this.date = date

      this.$nextTick(() => {
        this.$el.querySelectorAll('pre code').forEach((el) => {
          hljs.highlightBlock(el)
        })
      })
    }
    this.articleId = articleId
  },

  methods: {

    editArticle() {
      this.$router.push({name: 'Edit', params: { articleId: this.articleId }})
    },
    deleteArticle() {

    }
  }

}

</script>

<style scoped>

</style>
