<template>
  <div class="home">
    <h1>Personal Info</h1>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas neque,
      ex et labore praesentium fuga earum error temporibus quibusdam porro.
    </p>
    <button @click="logoutUser">Logout</button>
  </div>
</template>

<script>
import { supabase } from '@/supabase/config.js'
import { useRouter } from 'vue-router'

export default {
  name: 'Home',
  components: {},
  setup() {
    const router = useRouter()

    const logoutUser = async () => {
      const { error } = await supabase.auth.signOut()

      if (!error) {
        router.push({ name: 'Signup' })
      }
    }

    return { logoutUser }
  },
}
</script>
