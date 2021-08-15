<template>
  <Navbar :name="name" />
  <div class="home">
    <div class="home__header-text">
      <h1>Personal info</h1>
      <p>Basic info, like your name and photo</p>
    </div>
    <div class="home__profile">
      <div class="top-text">
        <div>
          <h2>Profile</h2>
          <p>Some info may be visible to other people</p>
        </div>
        <router-link to="#">Edit</router-link>
      </div>
      <div class="information">
        <div class="name">
          <p>NAME</p>
          <p>{{ name }}</p>
        </div>
        <div class="bio">
          <p>BIO</p>
          <p>{{ bio }}</p>
        </div>
        <div class="phone">
          <p>PHONE</p>
          <p>{{ phone }}</p>
        </div>
        <div class="email">
          <p>EMAIL</p>
          <p>{{ email }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import { onMounted, ref } from 'vue'
import { supabase } from '@/supabase/config.js'

export default {
  name: 'Home',
  components: { Navbar },
  setup() {
    const name = ref('')
    const bio = ref('')
    const email = ref('')
    const phone = ref(0)

    onMounted(async () => {
      const user = supabase.auth.user()

      const { data } = await supabase
        .from('users')
        .select('*')
        .filter('id', 'eq', user.id)

      if (data.length > 0) {
        name.value = data[0].name
        bio.value = data[0].bio
        email.value = data[0].email
        phone.value = data[0].phone
      }
    })

    return { name, bio, email, phone }
  },
}
</script>

<style lang="scss" scoped>
@use '@/assets/scss/_breakpoints.scss' as md;
@use '@/assets/scss/_variables.scss' as var;

.home {
  padding: 1.125rem;

  @include md.breakpoint(medium) {
    padding: 1.6875rem 4.5rem;
  }

  &__header-text {
    text-align: center;

    h1 {
      font-size: 1.5rem;
      font-weight: 400;

      @include md.breakpoint(medium) {
        font-size: 2.25rem;
      }
    }

    p {
      font-weight: 300;
      font-size: 0.875rem;

      @include md.breakpoint(medium) {
        font-size: 1.125rem;
      }
    }
  }

  &__profile {
    margin: 2.5rem auto;

    @include md.breakpoint(medium) {
      max-width: 80%;
      border: 1px solid #e0e0e0;
      border-radius: 12px;
      padding: 1.875rem;
    }

    @include md.breakpoint(large) {
      max-width: 60%;
    }

    .top-text {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 20px;

      div {
        h2 {
          font-size: 1.5rem;
        }

        p {
          color: var.$lightText;
          font-size: 0.8125rem;
        }
      }

      a {
        color: var.$lightText;
        padding: 0.5rem 2rem;
        border-radius: 12px;
        border: 1px solid var.$lightText;
        font-weight: 500;
      }
    }

    .information {
      margin-top: 2.5rem;

      div {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1.875rem 0;
        gap: 100px;

        p:first-child {
          color: var.$lightGray;
          font-weight: 500;
          font-size: 0.8125rem;
        }

        p:last-child {
          font-size: 1rem;
          font-weight: 500;
        }
      }

      .name {
        border-top: 1px solid #e0e0e0;
      }

      .bio,
      .email {
        border-top: 1px solid #e0e0e0;
        border-bottom: 1px solid #e0e0e0;
      }

      .email {
        border-bottom: unset;
        padding: 1.875rem 0 0 0;
      }
    }
  }
}
</style>
