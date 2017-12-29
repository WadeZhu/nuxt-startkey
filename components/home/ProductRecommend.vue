<template>
  <section class="product"  :class="productTypeTheme">
    <div class="product-header">{{name}} <span v-for="item in bonuses" :key="item" v-text="item" class="tag"></span></div>
    <div class="product-content">
      <div class="product-detail">
        <div class="product-detail-section">
          <div class="product-info-text">预期年化收益</div>
          <div class="product-rate">
            <span class="product-rate-total">{{(baseRate + bonusRate) * 100 | cutFloat | toFixed}}</span>
            <span class="product-rate-percent">%</span>
          </div>
        </div>
        <div class="product-detail-section">
          <div class="product-info-text">
            {{minQuota}}元起投
            &nbsp;
            |
            &nbsp;
            项目期限
            <span class="product-text product-term">{{term}}</span>天
          </div>
        </div>
        <div class="product-detail-section">
          <div class="product-action">
            <span v-if="!isSoldOut" class="product-button" @click="buyProduct('首页_已登录_点击_购买产品')">
              <klg-button block>马上抢购</klg-button>
            </span>
            <klg-button
              v-if="isSoldOut"
              type="disabled"
              @click.native="handleSoldOutBtnClick"
              block
            >
              抢光了
            </klg-button>
            <div class="product-action-info" v-if="isSoldOut">资产即将更新</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import KlgButton from '~/components/basic/klg-button'
  import Toast from '~/components/basic/klg-toast'

  export default {
    name: 'ProductRecommend',
    props: [
      'name',
      'productId',
      'baseRate',
      'bonusRate',
      'term',
      'minQuota',
      'isSoldOut',
      'bonuses',
      'tickets',
      'groupType'
    ],
    components: {
      KlgButton
    },
    computed: {
      productTypeTheme() {
        if (this.tickets && this.tickets.length) {
          return 'product--recommend'
        }
        return ''
      }
    },
    methods: {
      handleSoldOutBtnClick() {
        this.$analyst.send({'text': `首页_已登录_点击_已抢光_${this.name}`})
        Toast({
          message: '今日已抢光，明天早点来哦。'
        })
      },
      buyProduct(gaText) {
        this.$analyst.send({'text': `${gaText}_${this.name}`})
        let query = {
          'channel': 'home',
          'productId': this.productId
        }
        this.$klg.redirect.redirectInvest({query})
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  @import '../../assets/styles/fn.less';

  .product {
    padding-left: 40px;
    background-color: #fff;
    position: relative;
  }

  .product-header {
    font-size: 28px;
    padding: 20px 80px;
    background: url('~/static/image/home/img_Label_tuijian@2x.png') left center no-repeat;
    background-size: 60px 30px;
    .retina-3x({
      background-image: url('~/static/image/home/img_Label_tuijian@3x.png');
    });
    .tag {
      font-size: 24px;
      color: @text-red-color;
      border: 1px solid @text-red-color; /* no */
      margin-left: 10px;
      border-radius: 6px;
      padding: 0 8px;
      display: inline-block;
      text-align: center;
      vertical-align: text-bottom;
      height: 38px;
      line-height: 38px;
    }
  }

  .product-content {
    padding: 0 40px 40px 0;
  }

  .product-name {
    font-size: 32px;
  }

  .product-detail {
    text-align: center;
    line-height: 1.5;
    margin-top: 20px;
    &-section {
      position: relative;
      &--amount {
        &:after {
          content: "";
          position: absolute;
          right: 0;
          top: 15%;
          height: 70%;
          width: 1px; /*no*/
          background-color: @line-dark-color;
        }
      }
    }
  }

  .product-info-text {
    font-size: 24px;
    color: @text-gray-color;
  }

  .product-rate {
    font-size: 24px;
    color: @text-red-color;
    &-total {
      font-size: 80px;
    }
    &-base {
      font-size: 50px;
    }
    &-up {
      font-size: 36px;
    }
  }

  .product-term {
    font-size: 32px;
  }

  .product-text {
    font-size: 24px;
    color: @text-secondary-color;
  }

  .product-action {
    margin: 0 auto;
    padding: 5px 0;
    width: 80%;
    position: relative;
    text-align: center;
  }

  .product-action-info {
    font-size: 24px;
    color: @text-gray-light-color;
  }

  .product--recommend {
    background: #fff url('/msite/static/image/assets/icon_youquan@2x.png') top right no-repeat;
    background-size: 78px 84px;
    .retina-3x({
      background-image: url('/msite/static/image/assets/icon_youquan@3x.png');
    })
  }
</style>
