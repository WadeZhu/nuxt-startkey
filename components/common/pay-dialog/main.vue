<template>
  <klg-dialog v-model="visible" :showCloseIcon="false">
    <div class="pay-dialog">
      <div class="pay-dialog-header">
        <div class="pay-dialog-title">支付确认</div>
        <span @click="visible = false" class="pay-dialog-close"></span>
      </div>
      <div class="pay-dialog-content">
        <div class="pay-dialog-buy">
          <p>购买金额(元)</p>
          <div class="pay-dialog-amount">{{amount}}</div>
        </div>
        <div class="pay-dialog-payment">
          <span>余额支付</span>
          <span>{{amount}}元</span>
        </div>
      </div>
      <div class="pay-dialog-footer">
        <klg-button type="secondary" @click.native="handleConfirm">确认支付</klg-button>
      </div>
    </div>
  </klg-dialog>
</template>

<script>
  import KlgDialog from '~/components/basic/klg-dialog'
  import KlgButton from '~/components/basic/klg-button'
  import Loading from '~/components/basic/klg-loading'
  import Toast from '~/components/basic/klg-toast'

  export default {
    props: ['visible', 'amount', 'productId', 'productName', 'channel', 'ticketId'],
    name: 'pay-dialog',
    components: {
      KlgDialog,
      KlgButton
    },
    methods: {
      async invest({ amount, productId, productName, channel = 'wap', ticketId }) {
        let instance
        console.log(ticketId)
        try {
          instance = Loading({isShowCover: true})
          const body = await this.$http.post('/api/v2/asset/invest', { amount, productId, channel, ticketId })
          instance.close()
          const url = `/msite/invest_callback?amount=${amount}&productId=${productId}&productName=${encodeURIComponent(productName)}&channel=${encodeURIComponent(channel)}&code=${JSON.parse(body.bodyText).code}&tips=${body.body.tips}&topAction=${encodeURIComponent(JSON.stringify(body.body.topAction))}&bottomAction=${encodeURIComponent(JSON.stringify(body.body.bottomAction))}`
          process.BROWSER_BUILD && window.location.href = url
        } catch (error) {
          instance && instance.close()
          this.error = error
        }
      },
      handleConfirm() {
        console.log(this.ticketId)
        this.$analyst.send({'text': '购买页支付popup_点击_确认支付'})
        if (!this.amount) {
          return Toast({
            message: '购买金额缺失'
          })
        }

        if (!this.productId) {
          return Toast({
            message: '购买产品缺失'
          })
        }
        this.invest({
          amount: this.amount,
          productId: this.productId,
          channel: this.channel,
          productName: this.productName,
          ticketId: this.ticketId
        })
      }
    }
  }
</script>

<style lang="less">
  @import '../../../assets/styles/fn.less';

  .pay-dialog {
    &-header {
      font-size: 30px;
      padding: 20px;
      text-align: center;
      border-bottom: 1px solid @line-dark-color; /* no */
    }
    &-buy {
      font-size: 24px;
      color: @text-secondary-color;
      text-align: center;
      line-height: 1.5;
    }
    &-close {
      position: absolute;
      right: 30px;
      top: 30px;
      width: 23px;
      height: 23px;
      background: url('~/static/image/common/icon_purchase_comfirmCancle@2x.png') center no-repeat;
      background-size: 100%;
      .retina-3x({
        background-image: url('~/static/image/common/icon_purchase_comfirmCancle@3x.png');
      })
    }
    &-payment {
      display: flex;
      justify-content: space-between;
      color: @text-secondary-color;
      font-size: 24px;
      padding-top: 20px;
      margin-top: 30px;
      border-top: 1px dashed @line-dark-color; /* no */
    }
    &-amount {
      font-size: 38px;
      color: @text-orange-color;
    }
    &-content {
      padding: 32px;
    }
    &-footer {
      padding: 20px 30px 30px;
    }
  }
</style>
