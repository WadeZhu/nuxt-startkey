<template>
  <section class="product">
    <div class="product-header">
      <span>新手专享</span>
      <span class="product-header-info" v-html="leftTime"></span>
    </div>
    <div class="product-content">
      <div class="product-detail">
        <div class="product-rate">
          <div class="product-rate-number">
            <span class="product-rate-base">{{product.rate_base || product.rate_year | toPercent}}</span>
            <span v-if="+product.rate_up > 0">
              + {{product.rate_up | toPercent}}
            </span>
          </div>
          <div class="procurt-rate-text">预期年化收益</div>
        </div>
        <div class="product-term">
          <div class="product-term-number">
            <span class="product-term-base">{{product.term}}</span>
            <span class="product-term-util">天</span>
          </div>
          <div class="procurt-term-text">产品期限</div>
        </div>
        <div class="product-action">
          <klg-button @click.native="handleClick">马上抢购</klg-button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import KlgButton from '~/components/basic/klg-button'
  import dateUtils from 'common/tools/date'

  export default {
    name: 'ProductRecommend',
    props: ['product'],
    components: {
      KlgButton
    },
    computed: {
      leftTime() {
        if (this.product && this.product.leftSeconds) {
          const {days, hours, minutes} = dateUtils.secondToTime(this.product.leftSeconds)
          return `剩余<span class="text-orange">${days}</span>天<span class="text-orange">${hours}</span>时<span class="text-orange">${minutes}</span>分`
        }
        return ''
      }
    },
    methods: {
      handleClick() {
        this.$klg.redirect.redirectBuyTime({
          query: {
            productId: this.product.product_id
          }
        })
      }
    }
  }
</script>

<style lang="less">
  @import '../../assets/styles/fn.less';
  .text-orange {
    color: @text-orange-color;
  }
</style>

<style lang="less" scoped>
  @import '../../assets/styles/fn.less';

  .product {
    margin-top: 20px;
    padding-left: 40px;
    background-color: #fff;
  }

  .product-header {
    display: flex;
    justify-content: space-between;
    font-size: 28px;
    padding: 20px 40px;
    border-bottom: 1px solid @line-dark-color; /* no */
    background: url('~/static/image/home/icon-packs@2x.png') left center no-repeat;
    background-size: 24px 24px;
    .retina-3x({
      background-image: url('~/static/image/home/icon-packs@3x.png');
    })
  }

  .product-header-info {
    font-size: 24px;
  }

  .product-content {
    padding: 30px 40px 30px 0;
  }

  .product-detail {
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: center;
  }

  .product-rate-number {
    font-size: 24px;
    color: @text-red-color;
  }

  .product-term-number {
    font-size: 24px;
    color: #4f4f4f;
  }

  .product-rate-base,
  .product-term-base {
    font-size: 48px;
  }

  .procurt-rate-text,
  .procurt-term-text {
    font-size: 22px;
    color: @text-gray-color;
  }
</style>
