<template>
  <div class="signup">
    <div class="signup__container">
      <img
        src="../assets/images/devchallenges.svg"
        class="signup__logo"
        alt="logo"
      />
      <div class="signup__text">
        <h3>
          Join thousands of learners from<br class="hide-mobile" />
          around the world
        </h3>
        <p>
          Master web development by making real-life<br class="hide-mobile" />
          projects. There are multiple paths for you to<br
            class="hide-mobile"
          />
          choose
        </p>
      </div>
      <div class="signup__message" v-if="isError">
        <fa :icon="['fas', 'exclamation-circle']" /> {{ message }}
      </div>
      <form class="signup__form" @submit.prevent="handleSubmit">
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
      <div class="signup__others">
        <p>or continue with these social profile</p>
        <Socials />
        <p>
          Adready a member?
          <router-link :to="{ name: 'Login' }">Login</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/supabase/config.js'
import Socials from '@/components/Socials'

export default {
  name: 'Signup',
  components: { Socials },
  setup() {
    const email = ref('')
    const password = ref('')
    const isError = ref(false)
    const message = ref('')
    const router = useRouter()

    // Signing up users with email
    const handleSubmit = async () => {
      try {
        const { user, error } = await supabase.auth.signUp({
          email: email.value.trim(),
          password: password.value.trim(),
        })

        if (!error && user.aud === 'authenticated') {
          isError.value = false
          message.value = ''
          email.value = ''
          password.value = ''
          router.push({ name: 'CreateProfile' })
        } else {
          message.value = error.message
          isError.value = true
        }
      } catch (err) {
        message.value = 'Sorry, Something Went Wrong'
        isError.value = true
      }
    }

    return { email, password, handleSubmit, message, isError }
  },
}
</script>

<style lang="scss" scoped>
@use '@/assets/scss/_breakpoints.scss' as md;
@use '@/assets/scss/_variables.scss' as var;

.signup {
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

    p {
      margin-top: 0.875rem;
      font-size: 1rem;
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