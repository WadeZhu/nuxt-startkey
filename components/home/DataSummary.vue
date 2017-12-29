<template>
  <section class="summary">
    <div class="summary-content">
      <div class="summary-detail">
        <div class="summary-detail-row summary-detail-flex1">
          <div class="summary-detail-col">
            <p class="summary-info-text">{{data && data.publicity_date}}</p>
            <p class="summary-info-text">累计交易额（元）</p>
            <p>{{data && data.totalTurnover && parseInt(data && data.totalTurnover) | comma}}</p>
          </div>
        </div>
        <div class="summary-detail-row summary-detail-flex">
          <div class="summary-detail-col">
            <p class="summary-info-text">为用户赚取（元）</p>
            <p>{{data && data.totalEarning && parseInt(data.totalEarning) | comma}}</p>
          </div>
          <div class="summary-detail-col">
            <p class="summary-info-text">注册用户数（元）</p>
            <p>{{data && data.totalUser && parseInt(data.totalUser) | comma}}</p>
          </div>
        </div>
        <div class="summary-detail-remark">
          <p>您的资产由新网银行资金存管系统全程监管</p>
          <p>市场有风险，请理性投资</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'Summary',
    props: ['data']
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  @import '../../assets/styles/fn.less';

  .summary {
    margin-top: 20px;
    padding-left: 40px;
    background-color: #fff;
  }

  .summary-content {
    padding: 0 40px 40px 0;
  }
  .summary-info-text {
    font-size: 24px;
    color: @text-gray-color;
  }
  .summary-detail {
    text-align: center;
    line-height: 1.5;
    margin-top: 20px;
    padding: 20px 20px;
    &-flex {
      display: flex;
      justify-content: space-between;
    }
    &-flex1 {
      display: flex;
      justify-content: center;
    }
    &-col {
      font-size: 40px;
      color: @text-orange-color;
    }
    &-remark {
      margin-top: 20px;
      font-size: 22px;
      color: @text-gray-light-color;
    }
  }
</style>
