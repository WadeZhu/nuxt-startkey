<template>
  <klg-dialog v-model="visible" :showCloseIcon="false">
    <div class="password-dialog">
      <div class="password-dialog-title">请输入交易密码</div>
      <div @click="handleMaskClick" class="password-input-mask">
        <div class="password-input-mask-item" v-for="item in maskItems">
          {{password.length > item ? '●' : ''}}
        </div>
      </div>
      <input ref="passwordInput" v-model="password" type="password" class="password-input" name="clear">
      <div class="password-dialog-footer">
        <klg-button type="disabled" @click.native="visible=false">取消</klg-button>
        <klg-button type="secondary" @click.native="handleConfirm">确定</klg-button>
      </div>
      <div class="password-dialog-tip">
        <a class="password-dialog-tip-link" href="/wx/pay_password">忘记密码？</a>
      </div>
    </div>
  </klg-dialog>
</template>

<script>
  import KlgDialog from '~/components/basic/klg-dialog'
  import KlgButton from '~/components/basic/klg-button'
  import Toast from '~/components/basic/klg-toast'

  export default {
    props: ['className', 'show'],
    name: 'password-dialog',
    data() {
      return {
        password: '',
        visible: this.show,
        maskItems: [0, 1, 2, 3, 4, 5]
      }
    },
    components: {
      KlgDialog,
      KlgButton
    },
    methods: {
      handleMaskClick() {
        this.$refs.passwordInput.focus()
      },
      handleConfirm() {
        if (!this.password || this.password.length < 6) {
          return Toast('请输入6位数的交易密码')
        }
        this.$emit('confirm', this.password)
      }
    },
    watch: {
      show() {
        this.visible = this.show
      },
      visible(val) {
        this.$emit('update:show', val)
      },
      password(val) {
        this.password = val && String(val).slice(0, 6)
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '../../../assets/styles/fn.less';

  .password-dialog {
    padding: 32px;
    &-title {
      color: @text-secondary-color;
      font-size: 32px;
      text-align: center;
      padding-bottom: 32px;
    }
    &-content {
      font-size: 28px; /*px*/
    }
    &-footer {
      display: flex;
      margin-top: 19.2px;
      > button {
        margin-left: 20px;
        margin-right: 20px;
      }
    }
  }

  .password-input-mask {
    display: flex;
    margin-bottom: 32px;
    margin: 0 24px 32px;
    border: 1px solid @line-dark-color; /* no */
    &-item {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 16.66667%;
      height: 72px;
      background-color: #f4f4f4;
      border-right: 1px solid @line-dark-color; /* no */
    }
    &-item:last-child {
      border-right: none;
    }
  }

  .password-input {
    position: absolute;
    left: -99999px;
    opacity: 0;
  }

  .password-dialog-tip {
    margin-top: 20px;
    text-align: right;
  }

  .password-dialog-tip-link {
    font-size: 24px;
    color: @link-default-color;
  }
</style>
