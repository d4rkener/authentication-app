<template>
  <nav class="navbar">
    <img
      src="../assets/images/devchallenges.svg"
      alt="logo"
      class="navbar__logo"
    />
    <div class="navbar__avatar">
      <div class="name" @click="toggleDropbox">
        {{ name }} <fa :icon="['fas', 'chevron-down']" v-if="!isOpen" /><fa
          :icon="['fas', 'chevron-up']"
          v-if="isOpen"
        />
      </div>
      <div class="dropbox" v-if="isOpen" @click="logoutUsers">
        <p><fa :icon="['fas', 'sign-out-alt']" /> Logout</p>
      </div>
    </div>
  </nav>
</template>

<script>
import { ref } from 'vue'
import { supabase } from '@/supabase/config.js'
import { useRouter } from 'vue-router'

export default {
  name: 'Navbar',
  props: ['name'],
  setup() {
    const isOpen = ref(false)
    const router = useRouter()

    const toggleDropbox = () => {
      isOpen.value = !isOpen.value
    }

    const logoutUsers = async () => {
      const { error } = await supabase.auth.signOut()

      if (!error) {
        router.push({ name: 'Login' })
      }
    }

    return { toggleDropbox, isOpen, logoutUsers }
  },
}
</script>

<style lang="scss" scoped>
@use '@/assets/scss/_breakpoints.scss' as md;
@use '@/assets/scss/_variables.scss' as var;

.navbar {
  padding: 1.125rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @include md.breakpoint(medium) {
    padding: 1.6875rem 4.5rem;
  }

  &__logo {
    width: 9.375rem;
  }

  &__avatar {
    position: relative;

    .name {
      cursor: pointer;
      font-weight: 700;
      font-size: 0.875rem;

      svg {
        margin-left: 0.5rem;
      }
    }

    .dropbox {
      position: absolute;
      background: var.$white;
      border: 1px solid #e0e0e0;
      box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);
      border-radius: 12px;
      padding: 0.75rem;
      width: 100%;
      cursor: pointer;
      margin-top: 12px;

      p {
        color: var.$red;
        font-size: 0.8125rem;
      }
    }
  }
}
</style>