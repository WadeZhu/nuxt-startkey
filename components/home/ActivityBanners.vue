<template>
  <div>
    <klg-swiper class="banners" :auto="true" dotsPosition="right">
      <div class="banners-item" @click="handleBannerClick(banner)" v-for="banner in banners">
        <img :src="banner.picLink" />
      </div>
    </klg-swiper>
    <logout-dialog>
      <div class="logout-koala"></div>
    </logout-dialog>
  </div>
</template>

<script>
  import KlgSwiper from '~/components/basic/klg-swiper'
  import LogoutDialog from '~/components/common/logout-dialog'

  export default {
    name: 'ActivityBanners',
    props: ['banners'],
    components: {
      KlgSwiper,
      LogoutDialog
    },
    methods: {
      handleBannerClick(banner) {
        console.log(banner)
        this.$analyst.send({'text': `首页_已登录_点击_banner_${banner && banner.action.linkUrl}`})
        this.$klg.redirect.redirectByJumptype({
          type: banner && banner.action.type,
          linkUrl: banner && banner.action.linkUrl,
          message: banner && banner.action.message,
          query: {
            isExpand: localStorage.getItem('isExpand'),
            channel: banner && banner.action.orderChnl,
            productId: banner && banner.action.productId,
            amount: banner && banner.action.defaultAmount,
            ...this.$klg.auth.getUserInfo()
          }
        })
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  @import '../../assets/styles/fn.less';

  .banners {
    /*margin-top: 20px;*/
    img {
      display: block;
      width: 100%;
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