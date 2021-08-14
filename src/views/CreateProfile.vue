<template>
  <div class="newProfile">
    <div class="newProfile__container">
      <div class="newProfile__text">
        <h2>Create Profile</h2>
        <p>Changes will be reflected to every services</p>
      </div>
      <div class="newProfile__message" v-if="isError">
        <fa :icon="['fas', 'exclamation-circle']" /> {{ message }}
      </div>
      <div class="newProfile__form">
        <form @submit.prevent="handleSubmit">
          <!-- name -->
          <div class="name">
            <label for="name">Name</label>
            <input
              type="text"
              id="name"
              autocomplete="off"
              placeholder="Enter Your Name"
              v-model="name"
            />
          </div>
          <div class="bio">
            <label for="bio">Bio</label>
            <input
              type="text"
              id="bio"
              autocomplete="off"
              placeholder="Enter Your Bio"
              v-model="bio"
            />
          </div>
          <div class="phone">
            <label for="phone">Phone</label>
            <input
              type="number"
              id="phone"
              autocomplete="off"
              placeholder="Enter Your Phone Number"
              v-model="phone"
            />
          </div>
          <div class="email">
            <label for="email">Email</label>
            <input
              type="email"
              id="email"
              autocomplete="off"
              placeholder="Enter Your Email Number"
              v-model="email"
              disabled
            />
          </div>
          <button type="submit" class="btn-primary">Create Profile</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { supabase } from '@/supabase/config.js'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'CreateProfile',
  components: {},
  setup() {
    const name = ref('')
    const bio = ref('')
    const phone = ref(0)
    const email = ref('')
    const message = ref('')
    const isError = ref(false)
    const router = useRouter()
    const user = supabase.auth.user()

    email.value = user.email

    const handleSubmit = async () => {
      try {
        if (name.value === '' || bio.value === '' || phone.value === '') {
          message.value = 'Please fill the form correctly'
          isError.value = true
        } else {
          const { data, error } = await supabase.from('users').insert([
            {
              id: user.id,
              name: name.value.trim(),
              bio: bio.value.trim(),
              phone: phone.value.trim(),
              email: user.email,
            },
          ])

          if (!error && data.length > 0) {
            router.push({ name: 'Home' })
          } else {
            message.value = error.message
            isError.value = true
          }
        }
      } catch (err) {
        message.value = 'Sorry, Something went wrong'
        isError.value = true
      }
    }

    return { name, bio, phone, email, handleSubmit, message, isError }
  },
}
</script>

<style lang="scss" scoped>
@use '@/assets/scss/_breakpoints.scss' as md;
@use '@/assets/scss/_variables.scss' as var;

.newProfile {
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
      padding: 1.875rem 3rem;
      border-radius: 24px;
    }
  }

  &__text {
    h2 {
      font-weight: 400;
      font-size: 1.5rem;
    }

    p {
      font-weight: 500;
      font-size: 0.8125rem;
      color: var.$lightText;
      margin-top: 0.25rem;
    }
  }

  &__message {
    width: 100%;
    background: var.$red;
    font-weight: 600;
    border-radius: 8px;
    color: var.$white;
    padding: 0.8125rem;
    margin: 1.25rem 0;

    svg {
      margin-right: 0.5rem;
    }
  }

  &__form {
    margin-top: 1.5625rem;

    form {
      label {
        font-weight: 500;
        font-size: 0.8125rem;
      }

      input {
        width: 100%;
        padding: 1.0625rem;
        border-radius: 12px;
        border: 1px solid var.$lightText;
        color: var.$lightText;
        font-family: var.$font;
        font-weight: 400;
        font-size: 1rem;

        @include md.breakpoint(medium) {
          width: 25rem;
        }

        &:active,
        &:focus {
          outline: none;
        }
      }

      button {
        width: unset;
        padding: 0.5rem 1.5rem;
      }

      > div {
        display: flex;
        flex-direction: column;
        gap: 5px;

        &:not(:last-child) {
          margin-bottom: 1.5rem;
        }
      }

      .email {
        input:disabled {
          background: var.$hover;
          border: unset;
          color: var.$darkText;
        }
      }
    }
  }
}
</style>