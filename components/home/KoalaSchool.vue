<template>
  <section class="koalaSchool" v-if="banners && banners.length">
    <div class="koalaSchool-header">{{name}}</div>
    <div class="koalaSchool-content">
      <div class="koalaSchool-detail">
        <ActivityBanners :banners="banners" />
      </div>
    </div>
  </section>
</template>

<script>
  import KlgButton from '~/components/basic/klg-button'
  import ActivityBanners from './ActivityBanners.vue'

  export default {
    name: 'KoalaSchool',
    props: [
      'name',
      'articles'
    ],
    computed: {
      banners () {
        return this.articles
      }
    },
    components: {
      KlgButton,
      ActivityBanners
    },
    methods: {

    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  @import '../../assets/styles/fn.less';

  .koalaSchool {
    margin-top: 20px;
    padding-left: 40px;
    background-color: #fff;
  }

  .koalaSchool-header {
    font-size: 28px;
    padding: 20px 80px;
    background: url('~/static/image/home/img_Label_knowledge@2x.png') left center no-repeat;
    background-size: 60px 30px;
    .retina-3x({
      background-image: url('~/static/image/home/img_Label_knowledge@3x.png');
    })
  }

  .koalaSchool-content {
    padding: 0 40px 40px 0;
  }

  .koalaSchool-detail {
    text-align: center;
    line-height: 1.5;
    margin-top: 20px;
  }
</style>
