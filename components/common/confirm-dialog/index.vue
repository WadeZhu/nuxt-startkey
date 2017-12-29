<template>
  <klg-dialog v-model="visible" :showCloseIcon="false">
    <div class="confirm-dialog">
      <div class="confirm-dialog-title">
          {{title}}
          <div @click="visible=false" class="icon-close"></div>
      </div>
      <div class="confirm-dialog-content">
        金额(元)
        <p>{{amount}}</p>
      </div>
      <div class="confirm-dialog-footer">
        <klg-button type="secondary" @click.native="handleConfirm">{{btnText}}</klg-button>
      </div>
      <p class="confirm-dialog-text" v-if="productName">{{tipText[productName]}}</p>
    </div>
  </klg-dialog>
</template>

<script>
  import KlgDialog from '~/components/basic/klg-dialog'
  import KlgButton from '~/components/basic/klg-button'

  export default {
    props: ['show', 'title', 'amount', 'btnText', 'productName'],
    name: 'confirm-dialog',
    data() {
      return {
        visible: this.show,
        tipText: {
          '一月定期': '提前赎回按照年化利率1%计算收益。',
          '三月定期': '提前赎回按照年化利率1%计算收益。',
          '六月定期': '提前赎回按照年化利率3%计算收益。',
          '九月定期': '提前赎回按照年化利率4%计算收益。',
          '十二月定期': '提前赎回按照年化利率6%计算收益。'
        }
      }
    },
    components: {
      KlgDialog,
      KlgButton
    },
    methods: {
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
    overflow: hidden;
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
        background: url("~/static/image/common/icon_purchase_comfirmCancle@2x.png") no-repeat;
        background-size: cover;
      }
    }
    &-content {
      font-size: 28px;
      text-align: center;
      padding: 35px 0;
      color: @text-secondary-color;
      p {
        margin-top: 10px;
        color: @text-orange-color;
        font-size: 48px;
      }
    }
    &-footer {
      display: flex;
      margin: 10px 0 30px 0;
      > button {
        margin: 0px 50px;
      }
    }
    &-text {
      font-size: 24px;
      color: @text-red-color;
      text-align: center;
      margin-bottom: 30px;
    }
  }

</style>
