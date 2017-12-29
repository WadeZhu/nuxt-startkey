<template>
  <section class="security">
    <div class="security-item" @click="redirect({'url': 'http://v7.rabbitpre.com/m/mj7mVRAmy'}, '首页_已登录_点击_了解考拉')">
      <div class="security-item--koala"></div>
      <span class="security-item-text">了解考拉</span>
    </div>
    <div class="security-item" @click="redirect({'url': `/msite/depository_knowledge?isExpand=${isExpand}`}, '首页_已登录_点击_新网银行')">
      <div class="security-item--xw"></div>
      <span class="security-item-text">新网银行</span>
    </div>

    <div class="security-item" @click="redirect({'url': '/msite/security'}, '首页_已登录_点击_安全保障')">
      <div class="security-item--safety"></div>
      <span class="security-item-text">安全保障</span>
    </div>
  </section>
</template>

<script>
  import KlgButton from '~/components/basic/klg-button'

  export default {
    name: 'Security',
    components: {
      KlgButton
    },
    methods: {
      redirect (urlParam, str) {
        this.$analyst.send({'text': str})
        this.$klg.redirect.redirectUrl(urlParam)
      }
    },
    computed: {
      isExpand () {
        return localStorage.getItem('isExpand')
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  @import '../../assets/styles/fn.less';

  .security {
    margin-bottom: 20px;
    display: flex;
    background-color: #fff;
    padding: 20px 30px;
    text-align: center;
    &-item {
      flex-grow: 1;
      text-align: center;
      font-size: 24px;
      color: @text-gray-color;
      &-text {
        display: inline-block;
      }
    }
    .security-item {
      flex: 1;
    }
    .security-item-text {
      text-align: center;
    }
    &-item--koala {
      width: 88px;
      height: 88px;
      margin: 0 auto;
      background: url('~/static/image/home/trust_icon_understand-kaola@2x.png') left center no-repeat;
      background-size: 88px 88px;
      .retina-3x({
        background-image: url('~/static/image/home/trust_icon_understand-kaola@3x.png');
      })
    }
    &-item--xw {
      margin: 0 auto;
      width: 88px;
      height: 88px;
      background: url('~/static/image/home/trust_icon_bank-custody@2x.png') left center no-repeat;
      background-size: 88px 88px;
      .retina-3x({
        background-image: url('~/static/image/home/trust_icon_bank-custody@3x.png');
      })
    }
    &-item--safety {
      width: 88px;
      height: 88px;
      margin: 0 auto;
      background: url('~/static/image/home/trust_icon_safety-guarantee@2x.png') left center no-repeat;
      background-size: 88px 88px;
      .retina-3x({
        background-image: url('~/static/image/home/trust_icon_safety-guarantee@3x.png');
      })
    }
  }
</style>
