import Vue from 'vue'
import Message from './Message'
import Modal from './Modal'

const components = {
  Message,
  Modal
}

Vue.component('Message', Message)

for (const [key, value] of Object.entries(components)) {
  Vue.component(key, value)
}


