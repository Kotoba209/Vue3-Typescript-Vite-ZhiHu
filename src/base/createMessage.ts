import { createApp } from "vue"
import Message from './Message.vue'
import { MessageType } from "../store/types"


const createMessage = (message: string, type: MessageType, timeout = 2000) => {
  const messageInstance = createApp(Message, {
    message,
    type
  })

  // 挂载节点
  const mountNode = document.createElement('div')
  document.body.appendChild(mountNode)
  messageInstance.mount(mountNode)

  // 2秒后卸载
  setTimeout(() => {
    messageInstance.unmount()
    document.body.removeChild(mountNode)
  }, timeout)
}

export default createMessage
