<template>
  <div class="socials">
    <button>
      <fa :icon="['fab', 'google']" />
    </button>
    <button><fa :icon="['fab', 'facebook']" /></button>
    <button><fa :icon="['fab', 'twitter']" /></button>
    <button><fa :icon="['fab', 'github']" /></button>
  </div>
</template>

<script>
export default {
  name: 'Socials',
}
</script>

<style lang="scss" scoped>
@use '@/assets/scss/_variables.scss' as var;

.socials {
  button {
    width: 42px;
    height: 42px;
    border-radius: 50px;
    font-size: 1.125rem;
    color: var.$lightText;
    border: 2px solid var.$lightText;
    background: var.$white;
    cursor: pointer;
    transition: all 100ms ease-in-out;

    &:hover {
      color: var.$darkText;
      border: 2px solid var.$darkText;
    }

    &:not(:last-child) {
      margin-right: 20px;
    }
  }
}
</style>