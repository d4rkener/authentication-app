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
      <form class="signup__form">
        <div class="email">
          <fa :icon="['fas', 'envelope']" />
          <input type="email" autocomplete="off" placeholder="Email" />
        </div>
        <div class="password">
          <fa :icon="['fas', 'lock']" />
          <input type="password" autocomplete="off" placeholder="Password" />
        </div>
        <button type="submit" class="btn-primary">Start Coding Now</button>
      </form>
      <div class="signup__others">
        <p>or continue with these social profile</p>
        <div class="socials">
          <button><fa :icon="['fab', 'google']" /></button>
          <button><fa :icon="['fab', 'facebook']" /></button>
          <button><fa :icon="['fab', 'twitter']" /></button>
          <button><fa :icon="['fab', 'github']" /></button>
        </div>
        <p>Adready a member? <router-link to="#">Login</router-link></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Signup',
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

  &__form {
    input {
      width: 100%;
      padding: 0.8125rem 0.8125rem 0.8125rem 3.125rem;
      border-radius: 8px;
      border: 1px solid var.$lightGray;
      color: var.$lightText;
      font-family: var.$fontNotoSans;
      font-weight: 400;

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