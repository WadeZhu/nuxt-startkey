<template>
  <klg-dialog v-model="visible" :showCloseIcon="false">
    <div class="confirm-dialog">
      <div class="confirm-dialog-title" v-if="showCloseIcon">
          {{title}}
          <div @click="visible=false" class="icon-close"></div>
      </div>
      <slot name="image"></slot>
      <div class="confirm-dialog-content">
        <slot name="content"></slot>
      </div>
      <div class="confirm-dialog-footer">
        <slot name="leftBtn"></slot>
        <slot name="rightBtn"></slot>
      </div>
    </div>
  </klg-dialog>
</template>

<script>
  import KlgDialog from 'common/components/klg-dialog'
  import KlgButton from 'common/components/klg-button'

  export default {
    props: ['show', 'title', 'amount', 'btnText', 'productName', 'showCloseIcon'],
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

<style lang="less" rel="stylesheet/less" scoped>
  @import '../../../assets/styles/fn.less';

  .confirm-dialog {
    padding: 30px;
    color: @text-main-color;
    &-title {
      position: relative;
      font-size: 32px;
      text-align: center;
      height: 80px;
      line-height: 80px;
      border-bottom: 1px solid @line-light-color; /*no*/
      .icon-close {
        position: absolute;
        top: 28px;
        right: 50px;
        display: block;
        width: 23px;
        height: 23px;
        background: url("/msite/static/image/common/icon_purchase_comfirmCancle@2x.png") no-repeat;
        background-size: cover;
      }
    }
    &-content {
      font-size: 28px;
      text-align: center;
      padding: 35px 0;
      color: @text-main-color;
      p {
        margin-top: 10px;
        color: @text-main-color;
        font-size: 48px;
      }
    }
    &-footer {
      display: flex;
      margin: 10px 0 30px 0;
      justify-content: space-between;
    }
    &-text {
      font-size: 24px;
      color: @text-red-color;
      text-align: center;
      margin-bottom: 30px;
    }
  }

</style>
<style lang="less" rel="stylesheet/less">
  .confirm-dialog-footer > button {
    margin-right: 20px;
    &:last-child {
      margin-right: 0;
      display: inline-block;
    }
  }
</style>
