<template>
  <nav class="navbar navbar-default">
    <h1 class="page-title">Notebooks</h1>
    <div class="top-function-bar">
      <span class="fa fa-angle-left" style="display: none;"></span>
      <span class="fa fa-angle-right" style="display: none;"></span>
      <span
        class="fa fa-user-o"
        @click="accountOptions"
      ></span>
      <span
        class="account-name txt-ellipsis"
        @click="accountOptions"
      >
        {{accountInfo.userName}}
        <account-setting
          v-show="showAccountSetting"
          v-on:close-account-option="closeAccountOptions"
        ></account-setting>
      </span>
      <span
        class="fa fa-refresh"
        @click="syncNote"
      ></span>
      <span class="fa fa-bell-o"></span>
      <div class="right-section txt-ellipsis">
        <input type="text" class="btn search-btn" placeholder="Search notes" />
      </div>
    </div>
  </nav>
</template>
<script>
import { mapGetters } from 'vuex'
import AccountSetting from './accountSetting'
import * as noteTypes from '@/store/types/noteTypes'

export default {

  components: { AccountSetting },

  data: () => ({
    showAccountSetting: false
  }),

  computed: {
    ...mapGetters({
      accountInfo: 'accountInfo'
    })
  },

  methods: {
    // 显示账户选项
    accountOptions: function(e) {
      if ([...e.target.classList].indexOf('account-name') >= 0) {
        this.showAccountSetting = true
      }
    },
    // 关闭账户选项
    closeAccountOptions: function() {
      this.showAccountSetting = false
    },
    syncNote: function() {
      // 笔记同步
      this.$store.dispatch(noteTypes.GET_NOTE_UPDATE_LIST)
    }
  }
}
</script>
