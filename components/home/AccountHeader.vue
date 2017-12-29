<template>
  <div class="root">
    <header class="header">
      <div @click="redirect({'url': '/msite/user_center'}, '首页_已登录_点击_去查看')">
        <div>
          <span class="info-text">总资产(元)</span>
          <span class="check-tag">去查看</span>
        </div>
        <div class="header-amount">
          <span>{{totalAmount | toFixed | comma}}</span>
        </div>
        <span class="info-text header-gain-text">
          <span>累计收益:</span>
          <span>{{accumulatedEarning | toFixed | comma}}</span>
        </span>
      </div>
      <!-- <gain-dialog
        :isNewUser="isNewUser"
        :demandLastDayGain="demandLastDayGain"
        :expectedLastDayGain="expectedLastDayGain"
      >
        <span class="info-text header-gain-text">
           <i class="icon-info"></i> 
          <span>累计收益:</span>
          <span>{{lastDayGain | toFixed | comma}}</span>
        </span>
      </gain-dialog> -->
      <logout-dialog>
        <div class="logout-koala"></div>
      </logout-dialog>
    </header>
  </div>
</template>

<script>
  import LogoutDialog from '~/components/common/logout-dialog'
  // import GainDialog from './GainDialig'

  export default {
    name: 'AccountHeader',
    props: {
      totalAmount: {
        type: Number,
        default: 0
      },
      isNewUser: {
        type: Boolean,
        default: false
      },
      accumulatedEarning: {
        type: Number,
        default: 0
      }
      // demandLastDayGain: {
      //   type: Number,
      //   default: 0
      // },
      // expectedLastDayGain: {
      //   type: Number,
      //   default: 0
      // }
    },
    components: {
      LogoutDialog
      // GainDialog
    },
    methods: {
      redirect(urlParam, str) {
        this.$analyst.send({'text': str})
        this.$klg.redirect.redirectUrl(urlParam)
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '../../assets/styles/fn.less';

  .header {
    position: relative;
    display: flex;
    flex-direction: column;
    text-align: center;
    padding: 32px;
    color: #fff;
    background: #fff url('~/static/image/home/home_head@2x.png') top left no-repeat;
    height: 301px;
    background-size: cover;
    .retina-3x({
      background-image: url('~/static/image/home/home_head@3x.png');
    })
  }

  .header-amount {
    position: relative;
    color: #fff;
    font-size: 90px;
    font-weight: 400;
    line-height: 1.3;
  }

  .info-text {
    font-size: 24px;
    color: #ffffff;
  }
  
  .header-gain-text {
    font-size: 28px;
    > * {
      display: inline-block;
      vertical-align: middle;      
    }
  }

  .icon-info {
    display: inline-block;
    width: 24px;
    height: 25px;
    background: url('~/static/image/home/icon_rule-gray@2x.png') no-repeat;
    background-size: 100%;
    .retina-3x({
      background-image: url('~/static/image/home/icon_rule-gray@3x.png');
    })
  }

  .check-tag {
    margin-left: 4px;
    font-size: 22px;
    padding: 4px 12px;
    border-radius: 8px;
    background-color: #fff;
    color: @text-orange-color;
    &:after {
      content: " ";
      .setArrow(right, 12px, @text-orange-color, 3px);
    }
  }

  .logout-koala {
    position: absolute;
    top: 30px;
    right: 0;
    width: 53px;
    height: 75px;
    background: url('~/static/image/home/floatWindowIn@2x.png') no-repeat;
    background-size: 100%;
    .retina-3x({
      background-image: url('~/static/image/home/floatWindowIn@3x.png');
    })
  }
</style>