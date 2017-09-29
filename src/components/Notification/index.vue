<template>
  <div class="notification-bg">
    <div
      v-for="(item, index) in $store.state.notification.notificationsArr"
      :key="item.closeTime"
      class="notification-item"
    >
      <span
        class="notification-icon"
        :class="`icon-${item.type}`"
      ></span>
      <div class="notification-content">
        {{item.content}}
      </div>
    </div>
  </div>
</template>
<script>

export default {
}
</script>
