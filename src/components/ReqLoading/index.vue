<template>
  <div class="req-loading-bg">
    <div
      :class="{
        'loading-complete': $store.state.loading.loading.length === 0,
        'loading-progress': $store.state.loading.loading.length > 0
      }"
    >
      <div class="loading-animation"></div>
    </div>
  </div>
</template>
<script>
export default {
}
</script>
