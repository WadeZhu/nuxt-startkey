<template>
  <span :class="className">
    <span @click="isShowDialog=true"><slot></slot></span>
    <klg-dialog v-model="isShowDialog" :showCloseIcon="false">
      <div class="gain-dialog">
        <div class="gain-dialog-title">昨日总收益</div>
        <div class="gain-dialog-content">
          <div class="gain-product">
            <div v-if="!isNewUser" class="gain-product-item gain-product-item--demand">
              <div class="gain-product-name">快转计划</div>
              <div class="gain-product-amount">￥{{demandLastDayGain | cutFloat | toFixed | comma}}</div>
            </div>
            <div class="gain-product-item gain-product-item--time">
              <div class="gain-product-name">定期</div>
              <div class="gain-product-amount">￥{{expectedLastDayGain | cutFloat | toFixed | comma}}</div>
            </div>
          </div>
          <p class="gain-dialog-text">
            *定期收益是根据当前定期资产估算出的昨日收益，
            <span v-if="!isNewUser">包含原账户及存管账户，</span>
            实际以到账金额为准
          </p>
        </div>
        <div class="gain-dialog-footer">
          <klg-button type="secondary" @click.native="isShowDialog=false">我知道了</klg-button>
        </div>
      </div>
    </klg-dialog>
  </span>
</template>

<script>
  import KlgDialog from '~/components/basic/klg-dialog'
  import KlgButton from '~/components/basic/klg-button'

  export default {
    props: ['className', 'isNewUser', 'demandLastDayGain', 'expectedLastDayGain'],
    name: 'gain-dialog',
    data() {
      return {
        isShowDialog: false
      }
    },
    components: {
      KlgDialog,
      KlgButton
    }
  }
</script>

<style lang="less" scoped>
  @import '../../assets/styles/fn.less';

  .gain-dialog {
    padding: 32px;
    color: @text-main-color;
    &-title {
      font-size: 28px;
      padding-bottom: 32px;
    }
    &-content {
      text-align: left;
      font-size: 28px; /*px*/
    }
    &-highlight {
      color: @text-red-color;
    }
    &-text {
      color: @text-gray-color;
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

  .gain-product {
    display: flex;
    text-align: center;
    margin-top: 20px;
    margin-bottom: 40px;
    &-item {
      padding-top: 80px;
      flex-grow: 1;
      &--demand {
        position: relative;
        background: url('~/static/image/home/homepopup_icon_kuaizhuan@2x.png') top center no-repeat;
        background-size: 64px;
        &:after {
          content: "";
          position: absolute;
          right: 0;
          top: 15%;
          height: 70%;
          width: 1px; /*no*/
          background-color: @line-dark-color;
        }
        .retina-3x({
          background-image: url('~/static/image/home/homepopup_icon_kuaizhuan@3x.png');
        })
      }
      &--time {
        background: url('~/static/image/home/homepopup_icon_regular@2x.png') top center no-repeat;
        background-size: 64px;
        .retina-3x({
          background-image: url('~/static/image/home/homepopup_icon_regular@3x.png');
        })
      }
    }
    &-name {
      font-size: 24px;
      color: @text-secondary-color;
    }
    &-amount {
      font-size: 32px;
      font-weight: bold;
      color: @text-orange-color;
    }
  }
</style>
