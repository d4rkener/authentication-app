<template>
  <Navbar />
  <div class="edit">
    <div class="edit__container">
      <div class="back-btn" @click="router.go(-1)">
        <fa :icon="['fas', 'chevron-left']" /> Back
      </div>
      <div class="edit__text">
        <h2>Change Info</h2>
        <p>Changes will be reflected to every services</p>
      </div>
      <div class="edit__message" v-if="isError">
        <fa :icon="['fas', 'exclamation-circle']" /> {{ message }}
      </div>
      <div class="edit__form">
        <form @submit.prevent="handleSubmit">
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
          <button type="submit" class="btn-primary">Save Information</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import { supabase } from '@/supabase/config.js'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import getInfo from '@/composables/getInfo.js'

export default {
  name: 'EditProfile',
  components: { Navbar },
  setup() {
    const message = ref('')
    const isError = ref(false)
    const router = useRouter()
    const user = supabase.auth.user()

    const { name, bio, email, phone } = getInfo()

    const handleSubmit = async () => {
      try {
        if (
          name.value === '' ||
          bio.value === '' ||
          phone.value.toString().length <= 4
        ) {
          message.value = 'Please fill the form correctly'
          isError.value = true
        } else {
          const { data, error } = await supabase
            .from('users')
            .update([
              {
                id: user.id,
                name: name.value.trim(),
                bio: bio.value.trim(),
                phone: phone.value,
                email: user.email,
              },
            ])
            .match({ id: user.id })

          if (!error && data.length > 0) {
            router.push({ name: 'Home' })
          } else {
            message.value = error.message
            isError.value = true
          }
        }
      } catch (err) {
        console.log(err.message)
        message.value = 'Sorry, Something went wrong'
        isError.value = true
      }
    }

    return { name, bio, email, phone, router, handleSubmit, isError, message }
  },
}
</script>

<style lang="scss" scoped>
@use '@/assets/scss/_breakpoints.scss' as md;
@use '@/assets/scss/_variables.scss' as var;

.edit {
  padding: 1.125rem;

  @include md.breakpoint(medium) {
    padding: 1.6875rem 4.5rem;
  }

  &__container {
    padding: 1.125rem;
    margin: 0 auto;

    @include md.breakpoint(medium) {
      border: 1px solid var.$lightGray;
      padding: 1.875rem 3rem;
      border-radius: 24px;
      max-width: 80%;
    }

    @include md.breakpoint(large) {
      max-width: 55%;
    }
  }

  .back-btn {
    color: var.$blue;
    font-size: 0.875rem;
    cursor: pointer;

    @include md.breakpoint(medium) {
      font-size: 1.125rem;
    }

    svg {
      margin-right: 0.3125rem;
    }
  }

  &__text {
    margin-top: 1.5rem;

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

    @include md.breakpoint(medium) {
      // width: 25rem;
    }

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