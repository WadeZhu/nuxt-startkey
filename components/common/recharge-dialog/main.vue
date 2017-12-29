<template>
  <klg-dialog v-model="isShowDialog" :showCloseIcon="false">
    <div class="recharge-dialog">
      <img class="recharge-dialog-image" src="~/static/image/recharge/kaola_balance_wrong@2x.png">
      <p>可用余额不足，请先充值</p>
      <div class="recharge-dialog-footer">
        <klg-button @click.native="handleCancel">取消</klg-button>
        <klg-button type="secondary" @click.native="handleConfirm">去充值</klg-button>
      </div>
    </div>
  </klg-dialog>
</template>

<script>
  import KlgDialog from '~/components/basic/klg-dialog'
  import KlgButton from '~/components/basic/klg-button'

  export default {
    props: ['isShowDialog', 'amount', 'redirectUrl'],
    name: 'recharge-dialog',
    components: {
      KlgDialog,
      KlgButton
    },
    methods: {
      handleCancel() {
        this.$analyst.send({'text': '余额不足popup_点击_取消'})
        this.isShowDialog = false
      },
      handleConfirm() {
        this.$analyst.send({'text': '余额不足popup_点击_去充值'})
        const url = this.amount ? `/msite/recharge?amount=${this.amount}&channel=purchase&redirectUrl=${this.redirectUrl}` : `/msite/recharge?channel=purchase&redirectUrl=${this.redirectUrl}`
        process.BROWSER_BUILD && window.location.href = url
      }
    }
  }
</script>

<style lang="less">
  @import '../../../assets/styles/fn.less';

  .recharge-dialog {
    padding: 32px;
    text-align: center;
    font-size: 28px;
    &-image {
      width: 153px;
      height: 160px;
    }
    &-footer {
      display: flex;
      margin-top: 30px;
      > button {
        margin-left: 20px;
        margin-right: 20px;
      }
    }
  }
</style>
