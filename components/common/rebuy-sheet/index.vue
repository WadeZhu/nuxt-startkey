<template>
  <div class="actionsheet">
    <transition name="klg-actionsheet-mask">
      <div class="klg-mask klg-mask_transparent" @click="onClickingMask" v-show="show"></div>
    </transition>
    <div class="klg-actionsheet" :class="{'klg-actionsheet_toggle': show}">
      <div class="investsheet">
        <div class="investsheet-header">
          到期后操作
          <span class="icon-question" @click="showRebuyInfo()"></span>
          <span class="icon-close" @click="emitEvent('on-click-menu', 'cancel')">取消</span>
        </div>
        <div class="investsheet-body">
          <div class="investsheet-content">
            <ul>
              <li @click="emitResult(false)">
                <div class="investsheet-content-left">
                  <p class="line1">本息转至{{isTransferToBalance ? '余额' : '快转'}}</p>
                  <p class="line2">本金和利息都转回{{isTransferToBalance ? '余额' : '快转'}}</p>
                </div>
                <span class="investsheet-content-right" :class="{choosed: !rebuyStatus}"></span>
              </li>
              <li @click="emitResult(true, product)" v-for="(product, index) in newProduct" :key="index">
                <div class="investsheet-content-left">
                  <p class="line1">本金复投至{{product.newProductName}}<span class="tips">送{{product.rate | toPercent}}加息</span></p>
                  <p class="line2">本金复投至{{product.newProductName}}，自动加息{{product.rate | toPercent}}，利息转回余额</p>
                </div>
                <span class="investsheet-content-right" :class="{choosed: clickData && (clickData.newProductTerm === product.newProductTerm)}"></span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RebuyrulesDialog from 'components/rebuyrules-dialog/index.js'
import Toast from '~/components/basic/klg-toast'

export default {
  name: 'investsheet',
  mounted () {
    this.$nextTick(() => {
      this.$tabbar = document.querySelector('.klg-tabbar')
    })
  },
  props: {
    value: Boolean,
    rebuyStatus: Boolean,
    clickData: Object,
    newProduct: Array,
    isTransferToBalance: Boolean
  },
  data () {
    return {
      show: false
    }
  },
  methods: {
    showRebuyInfo() {
      RebuyrulesDialog()
    },
    emitResult(result, product) {
      if (this.rebuyStatus && !result) {
        Toast({
          message: '建议选择本息复投，可加息0.8%哦'
        })
      }
      this.$emit('choose', result, product)
      this.show = false
    },
    onClickingMask () {
      this.$emit('on-click-mask')
      this.show = false
    },
    emitEvent (event, menu) {
      if (event === 'on-click-menu' && !/.noop/.test(menu)) {
        this.$emit(event, menu)
        this.$emit(`${event}-${menu}`)
        this.show = false
      }
    },
    fixIos (zIndex) {
      if (this.$el.parentNode && this.$el.parentNode.className.indexOf('v-transfer-dom') !== -1) {
        return
      }
      if (this.$tabbar && /iphone/i.test(navigator.userAgent)) {
        this.$tabbar.style.zIndex = zIndex
      }
    }
  },
  watch: {
    show (val) {
      this.$emit('input', val)
      if (val) {
        this.fixIos(-1)
      } else {
        setTimeout(() => {
          this.fixIos(100)
        }, 200)
      }
    },
    value: {
      handler: function (val) {
        this.show = val
      },
      immediate: true
    }
  },
  beforeDestroy () {
    this.fixIos(100)
  }
}
</script>

<style lang="less" scoped>
@import '../../../assets/styles/fn.less';

.klg-actionsheet {
  position: fixed;
  left: 0;
  bottom: 0;
  transform: translate(0, 100%);
  backface-visibility: hidden;
  z-index: 5000;
  width: 100%;
  background-color: #fff;
  //slide up animation
  transition: transform .3s;
}

//actionSheet aniamtion
.klg-actionsheet_toggle{
  transform: translate(0, 0);
}

.klg-mask {
  position: fixed;
  z-index: 1000;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, .4);
}

.klg-mask_transparent{
  position: fixed;
  z-index: 1000;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
}

.investsheet {
  background-color: #fff;
  text-align: center;
  color: @text-gray-color;
  &-header {
    padding: 25px 0;
    font-size: 32px;
    color: @text-main-color;
    position: relative;
    .icon-close {
      display: inline-block;
      position: absolute;
      right: 50px;
      top: 50%;
      margin-top: -18px;
      font-size: @text-s-size;
      color: @text-gray-color;
    }
    .icon-question {
      width: 28px;
      height: 28px;
      display: inline-block;
      background: url('~/static/image/assets_trade_original/detail_icon_rule@2x.png') no-repeat;
      background-size: 100% 100%;
      .retina-3x({
        background-image: url('~/static/image/assets_trade_original/detail_icon_rule@3x.png');
      })
    }
  }
  &-body {
    padding: 38px;
    min-height: 700px;
  }
  &-content {
    height: 500px;
    position: relative;
    li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 30px 0;
      border-bottom: 1px solid @line-light-color; /* no */
      position: relative;
    }
    li:last-child {
      border: none;
    }
    &-left {
      text-align: left;
      .line1 {
        font-size: 28px;
        color: @text-main-color;
        .tips {
          display: inline-block;
          height: 40px;
          line-height: 40px;
          color: white;
          padding: 0 8px;
          border-radius: 10px;
          background: linear-gradient(to right, #ff6881, #ff8fdf);
          position: relative;
          margin-left: 10px;
          &:after {
            content: "";
            position: absolute;
            left: -1.3*4px;
            top: 50%;
            margin-top: -2px;
            display: inline-block;
            width: 8px;
            height: 8px;
            background-color: #ff6881;
            transform: rotate(-45deg);
          }
        }
      }
      .line2 {
        font-size: 24px;
      }
    }
    &-right {
      width: 30px;
      height: 30px;
      background: url('~/static/image/invest/icon_uncheck@2x.png') no-repeat;
      background-size: 100% 100%;
      .retina-3x({
        background-image: url('~/static/image/invest/icon_uncheck@3x.png')
      });
    }
    .choosed {
      background: url('~/static/image/invest/icon_check@2x.png') no-repeat;
      background-size: 100% 100%;
      .retina-3x({
        background-image: url('~/static/image/invest/icon_check@3x.png')
      });
    }
  }
}

.klg-actionsheet-menu-primary {
  color: @actionsheet-label-primary-color;
}
.klg-actionsheet-menu-warn {
  color: @actionsheet-label-warn-color;
}
.klg-actionsheet-menu-default {
  color: @actionsheet-label-default-color;
}
.klg-actionsheet-menu-disabled {
  color: @actionsheet-label-disabled-color;
}
.klg-actionsheet-mask-enter,
.klg-actionsheet-mask-leave-active {
  opacity: 0;
}
.klg-actionsheet-mask-leave-active,
.klg-actionsheet-mask-enter-active {
  transition: opacity 300ms!important;
}
</style>