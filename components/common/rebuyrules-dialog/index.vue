<template>
  <div class='wraper' v-if="visible">
    <div class="content">
      <div class="main-title">
        复投领加息规则
      </div>
      <div class="rules">
        <p><b>1</b>开户前定期产品且单笔到期本息金额≥100元的订单，可设置复投；</p>
        <p><b>2</b>优先为您复投相同期限中利率最高的产品；</p>
        <p><b>3</b>若设置的复投产品不可买(下架、售罄、份额不足)，到期后金额将转到余额，用户可获得0.8%通用加息券，有效期2天;</p>
        <p><b>4</b>未开户的用户，需要开户后才能设置复投；</p>
        <p><b>5</b>快享和10天定期暂时不能进行复投设置。</p>
      </div>
      <div class="main">
        <div class="close" @click="visible = false"></div>
      </div>
    </div>
  </div>
</template>

<script>
import KlgTable from '~/components/basic/klg-table'

export default {
  name: 'reinvest_rules',
  components: {
    KlgTable
  },
  props: ['visible'],
  data() {
    return {
      products: [
        {
          before: '1月定期',
          after: '30天定期',
          rate: '0.80%'
        },
        {
          before: '3月定期',
          after: '90天定期',
          rate: '0.80%'
        },
        {
          before: '6月定期',
          after: '180天定期',
          rate: '0.80%'
        },
        {
          before: '9月定期',
          after: '180天定期',
          rate: '0.80%'
        },
        {
          before: '12月定期',
          after: '360天定期',
          rate: '0.80%'
        }
      ]
    }
  }
}
</script>

<style lang='less' scoped>
  @import '../../../common/styles/index.less';
  @import '../../../assets/styles/fn.less';

  .wraper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: white;
    z-index: 10000;
  }

  .content {
    height: 100%;
    overflow: auto;
  }

  .rules {
    padding: 45px;
    p {
      padding-left: 40px;
      position: relative;
      line-height: 40px;
      font-size: 28px;
      color: @text-main-color;
      b {
        display: flex;
        width: 30px;
        height: 30px;
        justify-content: center;
        align-items: center;
        text-align: center;
        border-radius: 15px;
        background-color: #f7c18a;
        position: absolute;
        left: 0;
        top: 5px;
        font-weight: normal;
      }
    }
  }

  .main {
    &-title {
      text-align: center;
      color: @text-main-color;
      font-size: @text-xl-size;
      font-weight: bold;
      margin-top: 100px;
      &::before,
      &::after {
        content: "";
        width: 32px;
        height: 16px;
        display: inline-block;
        vertical-align: middle;
        background: url("~/static/image/assets_trade_original/img_light@2x.png")
          no-repeat;
        background-size: 100% 100%;
        .retina-3x({
            background-image: url(~/static/image/assets_trade_original/img_light@3x.png);
          });
      }
      &::after {
        background: url("~/static/image/assets_trade_original/img_right@2x.png")
          no-repeat;
        background-size: 100% 100%;
        .retina-3x({
            background-image: url(~/static/image/assets_trade_original/img_right@3x.png);
          });
      }
    }
    .close {
      width: 97px;
      height: 97px;
      margin: 0 auto;
      margin-top: 300px;
      margin-bottom: 50px;
      background: url('~/static/image/assets_trade_original/btn-close.png') no-repeat;
      background-size: 100% 100%;
    }
  }
</style>
