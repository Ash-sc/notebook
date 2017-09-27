<template>
  <div class="notification-bg">
    <div
      v-for="item in $store.state.notification.notificationsArr"
      :key="item.closeTime"
    >
      {{item.content}}--{{item.closeTime}}
    </div>
  </div>
</template>
<script>

export default {
}
</script>
