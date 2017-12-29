<template>
  <span :class="className">
    <span @click="isShowDialog=true"><slot></slot></span>
    <klg-dialog v-model="isShowDialog" :showCloseIcon="false">
      <div class="logout-dialog">
        <div class="logout-dialog-title">确认要退出考拉理财吗？</div>
        <div class="logout-dialog-footer">
          <klg-button type="disabled" @click.native="isShowDialog=false">取消</klg-button>
          <klg-button type="secondary" @click.native="handleLogout">确定</klg-button>
        </div>
      </div>
    </klg-dialog>
  </span>
</template>

<script>
  import KlgDialog from '~/components/basic/klg-dialog'
  import KlgButton from '~/components/basic/klg-button'

  export default {
    props: ['className'],
    name: 'logout-dialog',
    data() {
      return {
        isShowDialog: false
      }
    },
    components: {
      KlgDialog,
      KlgButton
    },
    methods: {
      async handleLogout() {
        try {
          await this.$http.post('/api/v2/user/logout', this.$klg.auth.getUserInfo())
          this.$klg.auth.removeUserInfo()
          if (localStorage.getItem('kllc_assetOriginal_popup')) localStorage.removeItem('kllc_assetOriginal_popup')
          this.$klg.redirect.redirectLogin()
        } catch (error) {
          throw error
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '../../../assets/styles/fn.less';

  .logout-dialog {
    padding: 32px;
    &-title {
      color: @text-secondary-color;
      font-size: 32px;
      padding-bottom: 32px;
      border-bottom: 1px solid @line-dark-color; /*no*/
    }
    &-content {
      font-size: 28px; /*px*/
    }
    &-footer {
      display: flex;
      margin-top: 19.2px;
      > button {
        margin-left: 20px;
        margin-right: 20px;
      }
    }
  }
</style>
