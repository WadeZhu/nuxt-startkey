<template>
  <div class="success">
    <div class="success-content">
      <img class="success-img" src="https://app.kaolalicai.cn/images/weixin_v2/koala_success.png">
      <p class="success-text">{{text}}</p>
    </div>
    <div class="klg-cells">
      <klg-cell title="产品名称" :value="productName" />
      <klg-cell title="金额" :value="amount" />
    </div>
  </div>
</template>

<script>
  /**
   * success-info
   * @module components/success-info
   * @desc 购买、赎回的成功页提示信息
   * @param {string} [text] - 描述文字
   * @param {string} [productName] - 产品名称
   * @param {string} [amount] - 金额
   *
   * @example
   * <success-info text="申请成功，预计30分钟内赎回成功" productName="快转" amount="1000"></success-info>
   */
  import KlgCell from '~/components/basic/klg-cell'
  export default {
    name: 'success-info',
    props: ['text', 'productName', 'amount'],
    components: {
      KlgCell
    }
  }
</script>

<style lang="less" scoped>
  @import '../../../common/styles/index.less';
  .success {
    padding-top: 82px;
    background-color: #fff;
    &-img {
      width: 208px;
      height: 216px;
    }
    &-content {
      text-align: center;
    }
    &-text {
      margin-top: 10px;
      margin-bottom: 64px;
      color: #999999;
      font-size: 32px;
    }
  }
  
  .info-wraper {
    padding: 0 40px;
    .info {
      padding: 10px 0;
      border-bottom: 1px solid #eeeeee; /*no*/
      color: #333;
      font-size: 28px;
      text-align: left;
      height: 80px;
      line-height: 80px;
      &-right {
        float: right;
        line-height: 50px;
      }
    }

    .info:last-child {
      border: none;
    }
  }
</style>
