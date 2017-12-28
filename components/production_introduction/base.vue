<template>
  <div>
    <div class="content">
      <div class="content-title">产品介绍</div>
      <p class="content-line"><span class="content-text">产品名称：</span>{{product.name}}</p>
      <p class="content-line"><span class="content-text">投资期限：</span>{{product.term}}天</p>
      <p class="content-line"><span class="content-text">项目总额：</span>{{product.quota}}元</p>
      <p class="content-line"><span class="content-text">起投金额：</span>{{product.minQuota}}元</p>
      <p class="content-line"><span class="content-text">投资上限：</span>{{product.remains}}元</p>
      <p class="content-line"><span class="content-text">预期年化收益：</span>{{product.baseRate * 100 | cutFloat | toFixed}}%<span v-if="product.bonusRate">+{{product.bonusRate * 100 | cutFloat | toFixed}}%</span></p>
    </div>
    <div class="content" v-if="product.groupType === 'repaymentPerMonth'">
      <div class="content-title icon-month">月月回产品</div>
      <p class="content-line">每月将一定比例的本金和利息回款至可用余额。资金灵活且收益高，按月回款更降低投资风险。</p>
    </div>
    <div class="content" v-if="product.category === 'newuser'">
      <div class="content-title icon-newuser">新手产品</div>
      <p class="content-line">新手系列产品，单个用户总购买限额为10万元，购买不限次数。</p>
    </div>
    <div class="content">
      <div class="content-title icon-buy">购买说明</div>
      <p class="content-line">考拉理财严格按照现有标的后产生产品销售的原则。在产品满额后，立即对接优选的标的。并且用户可以看到一一对应的具体标的物。</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['product'],
  computed: {
    max () {
      return this.product.remains > this.product.userQuota ? this.product.userQuota : this.product.remains
    }
  }
}
</script>


<style lang="less" scoped>
  .icon-month::after {
    background-image: url('~/static/image/production_introduction/month.png');
  }
  .icon-newuser::after {
    background-image: url('~/static/image/production_introduction/newuser.png');
  }
  .icon-buy::after {
    background-image: url('~/static/image/production_introduction/buy.png');
  }
</style>
