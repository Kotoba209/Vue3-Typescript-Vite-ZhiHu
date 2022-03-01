<template>
  <div class="login-page mx-auto p-3 w-330">
    <validate-form @form-submit="onFormSubmit">
      <div class="mb-3">
        <label class="form-label">邮箱地址</label>
        <validate-input
         type="text"
         placeholder="请输入邮箱地址"
         :rules="emailRules"
         v-model="emailVal"
        />
      </div>
      <div class="mb-3">
        <label class="form-label">密码</label>
        <validate-input
         type="password"
         placeholder="请输入密码"
         :rules="passwordRules"
         v-model="passwordVal"
        />
        <div class="form-text">
          <a href="/signup">还没有账户？去注册一个新的</a>
        </div>
      </div>
      <template v-slot:submit>
        <button type="submit" class="btn btn-primary btn-block btn-large w-100">登录</button>
      </template>
    </validate-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import ValidateForm from '@/base/ValidateForm.vue';
import ValidateInput, { RulesProps } from '@/base/ValidateInput.vue';
import createMessage from '@/base/createMessage'
import { create } from 'domain';

export default defineComponent({
  name: 'Login',
  components: {
    ValidateInput,
    ValidateForm
  },
  setup () {
    const emailVal = ref('')
    const emailRules: RulesProps = [
      { type: 'required', message: '电子邮箱地址不能为空' },
      { type: 'email', message: '请输入正确的电子邮箱格式' }
    ]
    const passwordVal = ref('')
    const passwordRules: RulesProps = [
      { type: 'required', message: '密码不能为空' }
    ]

    const router = useRouter()
    const store = useStore()

    const onFormSubmit = (result: boolean) => {
      console.log('result', result);
      if (result) {
        const payload = {
          email: emailVal.value,
          password: passwordVal.value
        }

        store.dispatch('loginAndFetch', payload).then(() => {
          createMessage('登录成功，2秒后跳转至首页', 'success')
          setTimeout(() => {
            router.push('/')
          }, 2000);
        })
        .catch(e => {
          throw(e)
        })
      }
    }

    return {
      emailRules,
      emailVal,
      passwordRules,
      passwordVal,
      onFormSubmit
    }
  }
})

</script>

<style scoped>
.w-330 {
  max-width: 330px;
}
.btn-block {
  width: 100%;
  display: block;
}
</style>