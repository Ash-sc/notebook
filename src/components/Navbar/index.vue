<template>
  <nav class="navbar navbar-default">
    <h1 class="page-title">Notebooks</h1>
    <div class="top-function-bar">
      <span class="fa fa-angle-left"></span>
      <span class="fa fa-angle-right"></span>
      <span class="fa fa-user-o"></span>
      <span class="account-name">Ash</span>
      <span class="fa fa-refresh"></span>
      <span class="fa fa-bell-o"></span>
    </div>
  </nav>
</template>
<script>
import routesMap from '@/routes/map/'
import _pickBy from 'lodash/pickBy'

export default {
  computed: {
    routes: () => _pickBy(routesMap, route => route.showInNavbar)
  },
  filters: {
    defaultIcon: icon => icon ? icon : 'fa fa-link'
  },
  attached () {
    $(this.$el).find('[data-toggle=tooltip]').tooltip({
      placement: 'bottom'
    })
  }
}
</script>
