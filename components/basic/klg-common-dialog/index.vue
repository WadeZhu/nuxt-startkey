<template>
  <klg-dialog class="common-dialog" v-model="visible" :showCloseIcon="false">
    <div class="main-content">
      <div @click="visible=false" class="icon-close" v-if="showCloseIcon"></div>
      <slot name="img"></slot>
      <slot name="message"></slot>
      <div class="btn-container" v-if="btnLeft && btnRight && !btnCenter">
        <div @click="emit('left')">
          <klg-button :type="btnLeft.type ? btnLeft.type : 'default'">{{btnLeft.text}}</klg-button>
        </div>
        <div @click="emit('right')">
          <klg-button :type="btnRight.type ? btnRight.type : 'secondary'">{{btnRight.text}}</klg-button>
        </div>
      </div>
      <div class="btn-container" v-if="btnCenter">
        <div @click="emit('center')" class="center">
          <klg-button :type="btnCenter.type ? btnCenter.type : 'default'">{{btnCenter.text}}</klg-button>
        </div>
      </div>
      <slot name="footer"></slot>
    </div>
  </klg-dialog>
</template>

<script>
  import KlgDialog from 'common/components/klg-dialog'
  import KlgButton from 'common/components/klg-button'
  import Loading from 'common/components/klg-loading'

  export default {
    /* 
      showCloseIcon: true
      btnLeft: {
        text: '', 按钮文字
        type: 'secondary'  不传就为默认颜色
      }
    */
    props: {
      show: Boolean,
      btnCenter: Object,
      btnLeft: Object,
      btnRight: Object,
      showCloseIcon: {
        type: Boolean,
        default: true
      }
    },
    name: 'common-dialog',
    components: {
      KlgDialog,
      KlgButton
    },
    data() {
      return {
        visible: this.show
      }
    },
    methods: {
      async emit(val) {
        this.$emit(val)
      }
    },
    watch: {
      show() {
        this.visible = this.show
      },
      visible(val) {
        this.$emit('update:show', val)
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '../../../assets/styles/fn.less';

  .main-content {
    padding: 30px;
    padding-top: 50px;
    background-color: white;
    border-radius: 10px;
    position: relative;
    text-align: center;
    .icon-close {
      position: absolute;
      top: 28px;
      right: 50px;
      display: block;
      width: 23px;
      height: 23px;
      background: url("/msite/static/image/common/icon_purchase_comfirmCancle@2x.png") no-repeat;
      background-size: cover;
    }
  }
  .btn-container {
    margin-top: 50px;
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    div {
      width: 280px;
    }
    .center {
      width: auto;
      flex: 1;
    }
  }
</style>
