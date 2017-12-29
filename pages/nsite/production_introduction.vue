<template>
  <div>
    <AppHeader title="产品介绍">
      <a class="app-header-back" slot="left" ></a>
    </AppHeader>
    <div class="tabbar">
      <div class="tab" :class="{active: item.value === activeValue}" v-for="(item, index) in tabvalue" :key="index" @click="activeValue = item.value">{{item.label}}</div>
    </div>
    <transition name="fade">
      <BaseInfo v-if="activeValue === 'base'" :product="product"/>
      <Repayment v-if="activeValue === 'repayment'" />
      <Risk v-if="activeValue === 'risk'" />
      <About v-if="activeValue === 'about'" />
    </transition>
  </div>
</template>

<script>
import BaseInfo from '~/components/production_introduction/base.vue'
import Repayment from '~/components/production_introduction/repayment.vue'
import Risk from '~/components/production_introduction/risk.vue'
import About from '~/components/production_introduction/about.vue'
import AppHeader from '~/components/common/app-header'
import Loading from '~/components/basic/klg-loading'
// import '~/plugins/device'

export default {
  name: 'main',
  head () {
    return {
      title: '产品介绍'
    }
  },
  components: {
    AppHeader,
    BaseInfo,
    Repayment,
    Risk,
    About
  },
  data () {
    return {
      tabvalue: [
        {value: 'base', label: '基本信息'},
        {value: 'repayment', label: '回款计息'},
        {value: 'risk', label: '风控系统'},
        {value: 'about', label: '关于考拉'}
      ],
      activeValue: 'base',
      product: {
        name: '--_--',
        term: '--_--',
        minQuota: '--_--',
        remains: '--_--',
        userQuota: '--_--',
        baseRate: null,
        bonusRate: null,
        category: null,
        groupType: null
      }
    }
  },
  methods: {
    async getProduct () {
      const instance = Loading()
      try {
        const {body} = await this.$http.get(`/api/v2/product/getProductInfo`, {
          params: {productId: this.$urlQuery.productId}
        })
        this.product = body
      } catch (error) {
        console.log(error)
      } finally {
        instance.close()
      }
    }
  },
  created () {
    this.getProduct()
  }
}
</script>

<style lang="less">
  @import '../../assets/styles/fn.less';
  body {
    font-size: 32px;
    background: #eee;
  }
  .tabbar {
    height: 88px;
    line-height: 88px;
    border-bottom: 1px solid @line-light-color;
    background-color: white;
    display: flex;
    .tab {
      display: flex;
      flex: 1;
      align-items: center;
      justify-content: center;
      font-size: @text-m-size;
      position: relative;
    }
    .active {
      color: #F2A643;
      &::after {
        content: '';
        width: 120px;
        height: 2px; /* no */
        background-color: #F2A643;
        position: absolute;
        bottom: 0;
        left: 50%;
        margin-left: -60px;
      }
    }
  }
  .content {
    padding: 20px 30px 50px;
    background-color: white;
    color: @text-main-color;
    margin-bottom: 20px;
    &-title {
      font-size: @text-m-size;
      padding-left: 50px;
      height: 80px;
      line-height: 80px;
      position: relative;
      &::after {
        content: '';
        width: 40px;
        height: 40px;
        display: inline-block;
        background: url('~/static/image/production_introduction/basic.png') no-repeat;
        background-size: 100% 100%;
        position: absolute;
        left: 0;
        top: 20px;
      }
    }
    &-line {
      font-size: @text-n-size;
      position: relative;
      padding-left: 40px;
      &::before {
        content: '';
        width: 10px;
        height: 10px;
        border-radius: 10px;
        background-color: #F2A643;
        display: inline-block;
        position: absolute;
        left: 10px;
        top: 15px;
      }
    }
    &-text {
      color: @text-gray-color;
      display: inline-block;
      width: 230px;
    }
    &-tips {
      height: 88px;
      line-height: 88px;
      background-color: #f8f8f8;
      color: #A3AAB6;
      font-size: @text-n-size;
      margin-top: 30px;
      text-align: center;
    }
    &-img {
      margin-top: 30px;
      text-align: center;
      img {
        width: 100%;
      }
    }
    .orange {
      color: #F2A643;
    }
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.2s ease-in-out;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
    opacity: 0
  }
</style>
