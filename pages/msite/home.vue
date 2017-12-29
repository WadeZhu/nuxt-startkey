<template>
  <div :class="['home', !$device.isApp && 'home--has-tabbar']">
    <ActivityBanners v-if="getProps('banners') && getProps('banners').length" :banners="getProps('banners')" />
    <Security />
    <Marquee :tips="getProps('slideNews')" v-if="getProps('slideNews')"></Marquee>
    <ProductRecommend :name="getProps('specialProduct', 'name')" :productId="getProps('specialProduct', 'productId') || getProps('specialProduct', 'id')" :baseRate="getProps('specialProduct', 'baseRate')" :bonusRate="getProps('specialProduct', 'bonusRate')" :term="getProps('specialProduct', 'term')" :minQuota="getProps('specialProduct', 'minQuota')" :isSoldOut="getProps('specialProduct', 'isSoldOut')" :tickets="getProps('specialProduct', 'tickets')" :bonuses="getProps('specialProduct', 'bonuses')" />
    <KoalaSchool name="考拉学堂" :articles="getProps('articles')"></KoalaSchool>
    <DataSummary :data="getProps('opertionData')"></DataSummary>
    <AppTabbar activePage="home" :hasTicketNews="getProps('hasTicketNews')" v-if="!$device.isApp" />
  </div>
</template>

<script>
import get from 'lodash/get'
import AppTabbar from '~/components/common/app-tabbar'
import ProductRecommend from '~/components/home/ProductRecommend.vue'
import ActivityBanners from '~/components/home/ActivityBanners.vue'
import Security from '~/components/home/Security.vue'
import KoalaSchool from '~/components/home/KoalaSchool.vue'
import DataSummary from '~/components/home/DataSummary.vue'
import Marquee from '~/components/common/marquee'
import Loading from '~/components/basic/klg-loading'

export default {
  name: 'main',
  components: {
    AppTabbar,
    ProductRecommend,
    ActivityBanners,
    Security,
    KoalaSchool,
    DataSummary,
    Marquee
  },
  data() {
    return {
      data: null
    }
  },
  head() {
    return {
      title: '首页'
    }
  },
  methods: {
    getProps(...props) {
      if (this.data && this.data.isExpand) {
        process.BROWSER_BUILD && localStorage.setItem('isExpand', true)
      } else {
        process.BROWSER_BUILD && localStorage.setItem('isExpand', false)
      }
      return get(this.data, props)
    },
    async fetchData () {
      const instance = Loading()
      try {
        let body = await this.$http.get('/api/v2/overview/home')
        this.data = body.data
      } catch (error) {
        console.log(error)
      } finally {
        instance.close()
      }
    }
  },
  created() {
    if (process.BROWSER_BUILD && !localStorage.getItem('kllc_autoInfo')) {
      this.$klg.redirect.redirectLogin()
    }
    this.fetchData()
  }
}
</script>

<style lang="less">
@import '../../assets/styles/fn.less';

body {
  font-size: 32px;
  color: @text-main-color;
  background-color: @body-main-bg-color;
}

.home {
  max-width: 1500px;
  margin: 0 auto;
}

.home--has-tabbar {
  padding-bottom: 32 * 3px;
}
</style>
