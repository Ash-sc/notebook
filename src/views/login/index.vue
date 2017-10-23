<template>
  <div class="login-body">
    <div class="ads-section">
      <div class="ashshen-iframe">
      <iframe class="iframe" src="https://ashshen.cc/" frameborder="0"></iframe>
      </div>
    </div>
    <account-section></account-section>
  </div>
</template>
<script>
import AccountSection from './accountSection'
export default {
  components: { AccountSection }
}
</script>
