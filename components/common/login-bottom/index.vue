<template>
  <div>
    <div class="bonus-card-group">
      <div class="bonus-card">
        <div class="bonus-card-title">
          <p v-text="product.productOne.title"></p>
        </div>
        <div class="bottom-dash"></div>
        <div class="bonus-intro" v-text="product.productOne.text"></div>
        <div class="bonus-rate">
          <div class="rate">
            <span class="big" v-text="product.productOne.rate"></span>
            <span class="little" v-text="product.productOne.addRate"></span>
          </div>
          <p>年化收益率(%)</p>
        </div>
        <div class="bonus-purchase" @click="scrollTop">
          注册购买
        </div>
      </div>
      <div class="bonus-card">
        <div class="bonus-card-title">
          <p v-text="product.productTwo.title"></p>
        </div>
        <div class="bottom-dash"></div>
        <div class="bonus-intro" v-text="product.productTwo.text"></div>
        <div class="bonus-rate">
          <div class="rate">
            <span class="big" v-text="product.productTwo.rate"></span>
            <span class="little" v-text="product.productTwo.addRate"></span>
          </div>
          <p>年化收益率(%)</p>
        </div>
        <div class="bonus-purchase" @click="scrollTop">
          注册购买
        </div>
      </div>
    </div>
    <div class="koala-detail">
      <div class="content">
        <img src="https://dn-kaolalicai.qbox.me/login_invite/login_bottom.png" alt="">
      </div>
    </div>
    <div class="about-exmoney">
      <div class="content">
        <img src="https://dn-kaolalicai.qbox.me/login_invite/img_GuanYuTiYanJin.png" alt="">
      </div>
    </div>
  </div>
</template>

<script>
export default{
  name: 'LoginBottom',
  data() {
    return {
      product: {
        productOne: {
          title: '21天定期',
          text: '1元起投',
          rate: '7.30%',
          addRate: ''
        },
        productTwo: {
          title: '三月定期',
          text: '高息产品 ',
          rate: '9.80%',
          addRate: ''
        }
      }
    }
  },
  methods: {
    async fetchProductData() {
      const { body } = await this.$http.get('/activity/api/SpreadSettingProduct/get')
      if (body) {
        if (body.productOne) this.product = body
      }
      if (this.$urlQuery.chnl === 'qiye') {
        this.product = {
          productOne: {
            title: '三月定期',
            text: '名企员工专享福利',
            rate: '12%',
            addRate: ''
          },
          productTwo: {
            title: '六月定期',
            text: '高息产品 坐享收益 ',
            rate: '9%',
            addRate: ''
          }
        }
      }
    },
    scrollTop() {
      const timer = setInterval(function () {
        const osTop = document.documentElement.scrollTop || document.body.scrollTop
        const isSpeed = Math.floor(-osTop / 6)
        document.documentElement.scrollTop = document.body.scrollTop = osTop + isSpeed
        if (osTop <= 1) clearInterval(timer)
      }, 10)
    }
  },
  created() {
    this.fetchProductData()
  }
}
</script>

<style lang="less" scoped>
.bonus-card-group {
  margin: 40px auto;
  .bonus-card {
    width: 90%;
    height: 257*9/570rem;
    margin: 30px auto;
    background: #fff;
    position: relative;
    border-radius: 10px;
    -webkit-box-shadow: 0 0 18px rgba(0, 0, 0, 0.5);
    -moz-box-shadow: 0 0 18px rgba(0, 0, 0, 0.5);
    box-shadow: 0 0 18px rgba(0, 0, 0, 0.5);
    .bonus-card-title {
      width: 223px;
      height: 52px;
      background: url("https://dn-kaolalicai.qbox.me/activity/new_login/color_tape_bg.png");
      background-size: 100% 100%;
      position: relative;
      top: 12px;
      p {
        margin-left: 20px;
        line-height: 52px;
        font-size: 30px;
        color: #fff;
      }
      .triangle {
        width: 0;
        border: 0.4rem solid #ff0678;
        border-right-color: transparent;
        position: absolute;
        right: -30px;
        top: 0;
      }
    }
    .bottom-dash {
      width: 100%;
      height: 0;
      border-bottom: 1px dashed #ddd; /* no */
      position: relative;
      bottom: -0.5rem;
    }
    .bonus-intro {
      position: absolute;
      top: 0.45rem;
      right: 0.5rem;
      color: #666;
      font-size: 0.38rem;
    }
    .bonus-rate {
      margin: 1rem 0.4rem;
      color: #666;
      font-size: 0.3rem;
      .big {
        color: #ff303d;
        font-size: 0.9rem;
        font-weight: bold;
      }
      .little {
        color: #ff303d;
        font-size: 0.6rem;
        font-weight: bold;
      }
    }
    .bonus-purchase {
      width: 3.3rem;
      height: 79*3.3/227rem;
      background: url("https://dn-kaolalicai.qbox.me/activity/new_login/button2.png");
      background-size: cover;
      position: absolute;
      bottom: 0.7rem;
      right: 0.5rem;
      line-height: 79*3.3/227rem;
      text-align: center;
      color: #fff;
      font-size: 0.45rem;
    }
  }
}
.koala-detail,
.about-exmoney {
  margin-top: 1rem;
  .content {
    text-align: center;
    img {
      width: 80%;
    }
  }
}
</style>
