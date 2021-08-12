<template>
  <div class="login">
    <div class="login__container">
      <img
        src="../assets/images/devchallenges.svg"
        class="login__logo"
        alt="logo"
      />
      <div class="login__text">
        <h3>Login to Dev Challenges</h3>
      </div>
      <div class="login__message" v-if="isError">
        <fa :icon="['fas', 'exclamation-circle']" /> {{ message }}
      </div>
      <form class="login__form" @submit.prevent="handleSubmit">
        <div class="email">
          <fa :icon="['fas', 'envelope']" />
          <input
            type="email"
            v-model="email"
            autocomplete="off"
            placeholder="Email"
          />
        </div>
        <div class="password">
          <fa :icon="['fas', 'lock']" />
          <input
            type="password"
            v-model="password"
            autocomplete="off"
            placeholder="Password"
          />
        </div>
        <button type="submit" class="btn-primary">Start Coding Now</button>
      </form>
      <div class="login__others">
        <p>or continue with these social profile</p>
        <Socials />
        <p>
          Don't have an account yet?
          <router-link :to="{ name: 'Signup' }">Register</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import Socials from '@/components/Socials'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/supabase/config.js'

export default {
  name: 'Login',
  components: { Socials },
  setup() {
    const email = ref('')
    const password = ref('')
    const isError = ref(false)
    const message = ref('')
    const router = useRouter()

    // Loging in users with email
    const handleSubmit = async () => {
      try {
        const { user, error } = await supabase.auth.signIn({
          email: email.value.trim(),
          password: password.value.trim(),
        })

        if (!error && user.aud === 'authenticated') {
          isError.value = false
          message.value = ''
          email.value = ''
          password.value = ''
          router.push({ name: 'Home' })
        } else {
          message.value = error.message
          isError.value = true
        }
      } catch (err) {
        message.value = 'Sorry, Something Went Wrong'
        isError.value = true
      }
    }

    return { email, password, isError, message, handleSubmit }
  },
}
</script>

<style lang="scss" scoped>
@use '@/assets/scss/_breakpoints.scss' as md;
@use '@/assets/scss/_variables.scss' as var;

.login {
  @include md.breakpoint(medium) {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__container {
    padding: 1.125rem;

    @include md.breakpoint(medium) {
      border: 1px solid var.$lightGray;
      padding: 3.125rem;
      border-radius: 24px;
    }
  }

  &__logo {
    width: 9.375rem;
  }

  &__text {
    margin: 1.75rem 0 2.125rem 0;

    h3 {
      font-size: 1.125rem;
      font-weight: 600;
    }
  }

  &__message {
    width: 100%;
    background: var.$red;
    font-weight: 600;
    border-radius: 8px;
    color: var.$white;
    padding: 0.8125rem;
    margin-bottom: 1.25rem;

    svg {
      margin-right: 0.5rem;
    }
  }

  &__form {
    input {
      width: 100%;
      padding: 0.8125rem 0.8125rem 0.8125rem 3.125rem;
      border-radius: 8px;
      border: 1px solid var.$lightGray;
      color: var.$lightText;
      font-family: var.$font;
      font-weight: 400;
      font-size: 1rem;

      &:active,
      &:focus {
        outline: none;
      }
    }

    .email,
    .password {
      position: relative;

      svg {
        position: absolute;
        top: 35%;
        left: 20px;
        color: var.$lightText;
      }
    }

    .password {
      margin: 0.875rem 0 1.375rem 0;
    }
  }

  &__others {
    text-align: center;

    p:first-child {
      font-size: 0.875rem;
      color: var.$lightText;
      margin: 1.5625rem 0;
    }

    p:last-child {
      margin-top: 1.6875rem;

      a {
        color: var.$blue;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
}
</style>