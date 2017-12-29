<template>
  <klg-dialog v-model="visible" :showCloseIcon="false">
    <div class="confirm-dialog">
      <div @click="visible=false" class="icon-close"></div>
      <div class="confirm-dialog-content">
        <img src="~/static/image/autoinvest/icon_lazy_save@2x.png" alt="" class="lazy-img">
        <p>尚未保存余额自动投资设置，是否保存并开启余额自动投资?</p>
      </div>
      <div class="confirm-dialog-footer">
        <klg-button @click.native="handleCancel">不开启</klg-button>
        <klg-button type="secondary" @click.native="handleConfirm">开启</klg-button>
      </div>
    </div>
  </klg-dialog>
</template>

<script>
  import KlgDialog from '~/components/basic/klg-dialog'
  import KlgButton from '~/components/basic/klg-button'

  export default {
    props: ['show', 'title', 'amount', 'btnText'],
    name: 'confirm-dialog',
    data() {
      return {
        visible: this.show
      }
    },
    components: {
      KlgDialog,
      KlgButton
    },
    methods: {
      handleCancel() {
        this.$emit('cancle')
      },
      handleConfirm() {
        this.$emit('confirm')
      }
    },
    watch: {
      show() {
        this.visible = this.show
      },
      visible(val) {
        this.$emit('update:show', val)
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '../../../assets/styles/fn.less';

  .confirm-dialog {
    color: @text-main-color;
    position: relative;
    overflow: hidden;
    .icon-close {
      position: absolute;
      top: 28px;
      right: 28px;
      display: block;
      width: 40px;
      height: 40px;
      background: url("~/static/image/common/icon_purchase_comfirmCancle@2x.png") no-repeat;
      background-size: cover;
    }
    &-content {
      font-size: 28px;
      text-align: center;
      padding: 35px 80px;
      color: @text-main-color;
      img {
        width: 200px;
      }
      p {
        text-align: left;
      }
    }
    &-footer {
      display: flex;
      margin: 10px 0 50px 0;
      > button {
        margin: 0px 50px;
        margin-left: 20px;
        margin-right: 20px;
      }
    }
  }

</style>
