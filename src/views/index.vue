<template>
  <div class="terminal">
  </div>
</template>
<script>
import isEmpty from 'lodash/isEmpty'

export default {
  created: function() {
    const notLogin = isEmpty(JSON.parse(localStorage.accountInfo || '{}'))
    if (notLogin) {
      this.$router.push('/notebooks')
    } else {
      this.$router.push('/login')
    }
  }
}
</script>


<style>
.terminal {
  padding: 30px;
  font-size: 3em;
  color: #a6e22e;
  text-align: center;
  background-color: #23241f;
}
</style>
