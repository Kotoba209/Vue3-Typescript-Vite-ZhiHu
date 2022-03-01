<template>
  <form class="validate-form-container">
    <slot name="default"></slot>
    <div class="submit-area" @click.prevent="submitForm">
      <slot name="submit">
        <button type="submit" class="btn btn-primary">提交</button>
      </slot>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, onUnmounted } from 'vue'
import mitt, { Emitter } from 'mitt'

export const emitter: Emitter<any> = mitt()
type ValidateFunc = () => boolean

export default defineComponent({
  name: 'ValidateForm',
  emits: ['form-submit'],
  setup (props, context) {
    let funcArr: ValidateFunc[] = []
    const submitForm = (): void => {
      console.log('233', 233);
      const result = funcArr.map(func => func()).every(result => result)
      console.log('context', context);
      console.log('result', result)
      console.log('context.emit', context.emit);
      context.emit('form-submit', result)
    }
    const callback = (func?: ValidateFunc) => {
      if (func) funcArr.push(func)
    }

    emitter.on('form-item-created', callback)
    onUnmounted(() => {
      emitter.off('form-item-created', callback)
      funcArr = []
    })
    return {
      submitForm
    }
  }
})

</script>

<style scoped>

</style>
