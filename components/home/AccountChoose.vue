<template>
  <section class="account">
    <div class="account-item">
      <!-- <span v-if="!isNewUser" class="account-item-link account-item-link--old" @click="redirect({'url': '/msite/assets_original'}, '首页_已登录_点击_原账户')">原账户</span>
      <span v-if="isNewUser" @click="handleLinkClick({'url': '/msite/withdraw', 'query': {'channel': 'home'}}, '首页_已登录_点击_提现')" class="account-item-link account-item-link--withdraw">提现</span> -->
      <span @click="handleLinkClick({'url': '/msite/withdraw', 'query': {'channel': 'home'}}, '首页_已登录_点击_提现')" class="account-item-link account-item-link--withdraw">提现</span>
    </div>
    <div class="account-item">
      <!-- <span v-if="!isNewUser" class="account-item-link account-item-link--new" @click="redirect({'url': '/msite/user_assets'}, '首页_已登录_点击_存管账户')">存管账户</span>
      <span v-if="isNewUser" @click="handleLinkClick({'url': '/msite/recharge', 'query': {'channel': 'home'}}, '首页_已登录_点击_充值')" class="account-item-link account-item-link--recharge">充值</span> -->
      <span @click="handleLinkClick({'url': '/msite/recharge', 'query': {'channel': 'home'}}, '首页_已登录_点击_充值')" class="account-item-link account-item-link--recharge">充值</span>
    </div>
  </section>
</template>

<script>
  import ExpandDialog from '~/components/common/expand-dialog/index.js'
  import BindCardDialog from '~/components/common/bindCard-dialog'

  export default {
    name: 'AccountChoose',
    props: ['isNewUser', 'isExpand', 'hasBankcard'],
    methods: {
      handleLinkClick(urlParam, str) {
        if (!this.isExpand) {
          this.$analyst.send({'text': str})
          ExpandDialog({redirectUrl: encodeURIComponent(location.href)})
          return
        }
        if (!this.hasBankcard) {
          BindCardDialog({redirectUrl: encodeURIComponent(location.href)})
          return
        }
        this.redirect(urlParam, str)
      },
      redirect(urlParam, str) {
        this.$analyst.send({'text': str})
        if (this.isExpand) {
          urlParam.query = {
            'isExpand': this.isExpand,
            'isDisplayExpand': false
          }
        } else {
          urlParam.query = {
            'isExpand': this.isExpand,
            'isDisplayExpand': true
          }
        }
        this.$klg.redirect.redirectUrl(urlParam)
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '../../assets/styles/fn.less';

  .account {
    display: flex;
    padding: 32px 16px;
    line-height: 1;
    background-color: #fff;
    &-item {
      flex-grow: 1;
      font-size: 28px;
      text-align: center;
      &:last-child {
        border-left: 1px solid @line-dark-color; /* no */
      }
      &-link {
        display: inline-block;
        padding: 12px 60px 12px;
        text-align: center;
        color: @text-secondary-color;
        &--old {
          background: url('~/static/image/home/home_icon_PTZH@2x.png') left center no-repeat;
          background-size: 42px 32px;
          .retina-3x({
            background-image: url('~/static/image/home/home_icon_PTZH@3x.png');
          })
        }
        &--new {
          padding-left: 54px;
          background: url('~/static/image/home/home_icon_CGZH@2x.png') left center no-repeat;
          background-size: 36px 40px;
          .retina-3x({
            background-image: url('~/static/image/home/home_icon_CGZH@3x.png');
          })
        }
        &--recharge {
          padding-left: 57px;
          background: url('~/static/image/home/home_icon_recharge@2x.png') left center no-repeat;
          background-size: 39px 45px;
          .retina-3x({
            background-image: url('~/static/image/home/home_icon_recharge@3x.png');
          })
        }
        &--withdraw {
          padding-left: 58px;
          background: url('~/static/image/home/home_icon_withdraw@2x.png') left center no-repeat;
          background-size: 40px 40px;
          .retina-3x({
            background-image: url('~/static/image/home/home_icon_withdraw@3x.png');
          })
        }
      }
    }
  }
</style>
