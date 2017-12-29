<template>
  <span :class="className">
    <span @click="isShowDialog=true"><slot></slot></span>
    <klg-dialog v-model="isShowDialog">
      <div class="exmoney-dialog">
        <div class="exmoney-dialog-title">体验金说明</div>
        <div class="exmoney-dialog-content">
          <div class="exmoney-dialog-icon-wrapper">
            <img src="/koala_app/static/image/common/icon_ex_gold.png">
          </div>
          <p>1.体验金是供用户体验快转计划的奖励，无需操作，体验金有效期间按照快转计划利率自动计息，体验金每天产生的收益将自动存入快转计划。</p>
          <p>2.体验金不可提现，产生的收益可以提现，体验金到期后由系统自动回收。</p>
          <p>(点击“查看奖励”可查看体验金的有效期)</p>
        </div>
        <div class="exmoney-dialog-footer">
          <a class="exmoney-dialog-button" href="javascript:void(0)" @click="isShowDialog=false">我知道了</a>
        </div>
      </div>
    </klg-dialog>
  </span>
</template>

<script>
  import KlgDialog from '~/components/basic/klg-dialog'

  export default {
    props: ['className'],
    name: 'exmoney-dialog',
    data() {
      return {
        isShowDialog: false
      }
    },
    components: {
      KlgDialog
    }
  }
</script>

<style lang="less" scoped>
  @import '../../../assets/styles/fn.less';

  .exmoney-dialog {
    padding: 32px;
    &-title {
      font-size: 32px;
      font-weight: bold;
      text-align: center;
    }
    &-content {
      font-size: 28px; /*px*/
    }
    &-icon-wrapper {
      position: relative;
      text-align: center;
      img {
        width: 200px;
        height: 200px;
      }
    }
    &-footer {
      margin-top: 19.2px;
    }
    &-button {
      display: block;
      font-weight: bold;
      text-align: center;
      color: @text-red-color;
      border: 1px solid @text-red-color; /*no*/
      padding: 16px;
      font-size: 30px; /*px*/
    }
  }
</style>
