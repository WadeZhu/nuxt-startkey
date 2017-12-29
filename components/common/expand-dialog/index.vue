<template>
  <klg-dialog class="expand-dialog" v-model="isShowDialog" :showCloseIcon="true" closeIconPosition="bottom">
    <div class="img" :class="isTask2User ? 'new-user-task2-user': ''"></div>
    <div class="expand-dialog-footer">
      <div class="expand-dialog-footer-text" v-if="text">{{text}}</div>
      <span @click="redirectToUrl({'url': '/msite/depository_knowledge'})" class="expand-dialog-footer-link">了解更多</span>
    </div>
    <span @click="redirectExpand({query: {redirectUrl: redirectUrl}})" class="expand-dialog-btn">
      <klg-button type="expand" v-show="!isTask2User">马上开户</klg-button>
      <img src="https://dn-kaolalicai.qbox.me/activity/expandPop/button@3x.png" v-show="isTask2User" alt="">
    </span>
  </klg-dialog>
</template>

<script>
  import Toast from '~/components/basic/klg-toast'
  import KlgDialog from '~/components/basic/klg-dialog'
  import KlgButton from '~/components/basic/klg-button'
  export default {
    props: ['className', 'isShowDialog', 'text', 'redirectUrl'],
    name: 'expand-dialog',
    components: {
      KlgDialog,
      KlgButton
    },
    data () {
      return {
        isTask2User: false
      }
    },
    methods: {
      fetchUserRegisterTime () {
        this.$http.get(`/activity/api/user/info?userId=${this.$klg.auth.getUserInfo().ud}`)
          .then(res => res.json())
          .then(function (res) {
            if (res.code === 0) {
              this.isTask2User = (Number(res.data.createdAt) >= new Date('2017/10/13').getTime())
            } else {
              Toast('小考拉睡着啦,请稍后重试')
            }
          }).catch(function (err) {
            console.log('err=>', err)
            Toast('小考拉睡着啦,请稍后重试')
          })
      },
      redirectExpand(params) {
        this.$klg.redirect.redirectExpand(params)
      },
      redirectToUrl(urlParams) {
        this.$klg.redirect.redirectUrl(urlParams)
      }
    },
    created() {
      this.fetchUserRegisterTime()
    }
  }
</script>

<style lang="less">
  @import '../../../assets/styles/fn.less';

  .klg-btn--expand {
    font-size: 36px;
    background-color: @button-expand-bg;
    background-image: linear-gradient(@button-expand-bg-linear-top, @button-expand-bg-linear-bottom);
  }

  .expand-dialog {
    text-align: center;
    .img {
      width: 600px;
      height: 790px;
      background: url('~/static/image/expand/expandAccount_Bg@2x.png') no-repeat;
      background-size: 100% 100%;
      margin: 0 auto;
      .retina-3x({ background-image: url('~/static/image/expand/expandAccount_Bg@3x.png'); })
    }
    .new-user-task2-user {
      background: url('https://dn-kaolalicai.qbox.me/app/popup_3888@2x.png') no-repeat;
      background-size: 100% 100%;
    }
    .klg-dialog-body {
      background-color: transparent;
      margin-top: -20%;
    }
    &-btn {
      display: block;
      margin: 0 auto;
      width: 78%;
      img {
        width: 100%;
      }
    }
    .klg-dialog-close {
      top: 8px;
      right: 50px;
    }
    .klg-dialog-close:after {
      border: none !important;
    }
  }

  .expand-dialog-footer {
    font-size: 28px;
    margin-top: -230px;
    margin-bottom: 20px;
  }

  .expand-dialog-footer-text {
    color: #fff;
  }

  .expand-dialog-footer-link {
    color: #fff;
  }
</style>
