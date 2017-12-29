<template>
  <klg-dialog class="bindCard-dialog" v-model="visible" :showCloseIcon="false">
    <div class="main-content">
      <div class="kaola-img"></div>
      <p>你还未绑定银行卡</p>
      <div class="btn-container">
        <span @click="visible = false" class="bindCard-dialog-btn">
          <klg-button >暂不绑定</klg-button>
        </span>
        <span @click="bingCard" class="bindCard-dialog-btn">
          <klg-button type="secondary">立即绑定</klg-button>
        </span>
      </div>
    </div>
  </klg-dialog>
</template>

<script>
  import KlgDialog from '~/components/basic/klg-dialog'
  import KlgButton from '~/components/basic/klg-button'
  import Loading from '~/components/basic/klg-loading'

  export default {
    props: ['visible', 'redirectUrl'],
    name: 'bindCard-dialog',
    components: {
      KlgDialog,
      KlgButton
    },
    methods: {
      async bingCard() {
        let redirectUrl = location.protocol + '//' + location.host + '/msite/tied_card_callback'
        if (this.redirectUrl && this.redirectUrl !== 'undefined') {
          redirectUrl = location.protocol + '//' + location.host + '/msite/redirect_page?fromBindCard=true&redirectUrl=' + this.redirectUrl
        }
        const instance = Loading()
        try {
          const { body } = await this.$http.post('/api/v2/user/bindBankcard', {
            returnUrl: redirectUrl
          })
          document.write(body.html)
        } catch (error) {
          this.error = error
        } finally {
          instance.close()
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '../../../assets/styles/fn.less';

  .main-content {
    padding: 30px;
    background-color: white;
    border-radius: 10px;
    p {
      margin-top: 20px;
      color: @text-main-color;
      font-size: 28px;
      text-align: center
    }
  }
  .kaola-img {
    width: 204px;
    height: 200px;
    margin: 10px auto;
    background: url('/msite/static/image/common/icon_bundCard_remind@2x.png') no-repeat;
    background-size: 100% 100%;
    .retina-3x({
      background-image: url('/msite/static/image/common/icon_bundCard_remind@3x.png')
    })
  }
  .btn-container {
    margin-top: 50px;
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    span {
      width: 260px;
    }
  }
</style>
