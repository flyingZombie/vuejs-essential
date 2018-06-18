<template>
  <ul v-if="totalPage > 1" class="pagination">
    <li :class="{ disabled: internalCurrentPage === 1 }">
      <a href="javascript:;" @click="changePage(internalCurrentPage - 1)">
        «
      </a>
    </li>
    <li v-for="n in totalPage" :class="{ active: internalCurrentPage === n }" >
      <a href="javascript:;" @click="changePage(n)">
        {{ n }}
      </a>
    </li>
    <li :class="{ disabled: internalCurrentPage === totalPage }">
      <a href="javascript:;" @click="changePage(internalCurrentPage + 1)">
        »
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    currentPage: {
      type: Number,
      default: 1
    },
    total: {
      type: Number,
      required: true
    },
    pageSize: {
      type: Number,
      default: 10,
      validator: value => value > 0
    },
    onPageChange: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      internalCurrentPage: 1
    }
  },
  computed: {
    totalPage() {
      return Math.ceil(this.total / this.pageSize)
    }
  },
  watch: {
    currentPage: {
      immediate: true,
      handler(page) {
        this.internalCurrentPage = page
      }
    }
  },
  methods: {
    changePage(page) {
      if (page === this.internalCurrentPage || page < 1 || page > this.totalPage) return
      this.onPageChange(page)
    }
  }
}
</script>

<style scoped>

</style>
