<template>
  <div>
    <div class="content">
      <div class="content-title icon-interest">计息说明</div>
      <p class="content-line orange">利息=在投本金*年化利率/365*本金在投天数</p>
      <p class="content-line orange">利息=在投本金*起息日期为：匹配上标当天开始起息的日期</p>
      <p class="content-line orange">预期到期日期=起息日期+产品期限</p>
      <p class="content-line">申购成功后，最迟下个工作日开始计息。如在下一工作日未能匹配到标的，考拉理财将为您提供补贴，您的所购产品当前年化收益可达到目标年化收益。</p>
    </div>
    <div class="content">
      <div class="content-title icon-repayment">回款说明</div>
      <p class="content-line">本金将严格按照实际标的的回款情况发放</p>
      <p class="content-line">若标的提前回款，对应资金将提前结束投资，实际收益以具体回款情况为准</p>
      <p class="content-line">若标的投资到期，正常当日回款至可用余额，因银行系统及资金到账等问题可能延迟至次日。</p>
      <div class="content-tips">注：如遇小数，将按照向下取整两位小数的规则结算。</div>
    </div>
    <div class="content">
      <div class="content-title icon-withdraw">赎回说明</div>
      <p class="content-line">依据国家监管规定，不再提供债权转让、提前赎回功能，请规划好您的投资计划。</p>
    </div>
  </div>
</template>

<style lang="less" scoped>
  .icon-interest::after {
    background-image: url('~/static/image/production_introduction/interest.png');
  }
  .icon-repayment::after {
    background-image: url('~/static/image/production_introduction/repayment.png');
  }
  .icon-withdraw::after {
    background-image: url('~/static/image/production_introduction/withdraw.png');
  }
</style>
