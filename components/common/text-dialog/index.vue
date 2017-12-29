<template>
  <span class="root">
    <span @click="gaEvent()">
      <slot></slot>
    </span>
    <klg-dialog v-model="isShowDialog" :showCloseIcon="false">
      <div class="dialog">
        <div class="dialog-title" v-if="title">{{title}}</div>
        <div class="dialog-content">
          <div class="dialog-text">{{text}}</div>
        </div>
        <div class="dialog-footer">
          <klg-button type="secondary" @click.native="isShowDialog=false">我知道了</klg-button>
        </div>
      </div>
    </klg-dialog>
  </span>
</template>

<script>
import KlgDialog from '~/components/basic/klg-dialog'
import KlgButton from '~/components/basic/klg-button'

export default {
  props: ['className', 'title', 'text'],
  name: 'text-dialog',
  data() {
    return {
      isShowDialog: false
    }
  },
  components: {
    KlgDialog,
    KlgButton
  },
  methods: {
    gaEvent() {
      if (this.$analyst) {
        this.$analyst.send({'text': `原定期明细页_点击_查看详情_${this.title}`})
      }
      this.isShowDialog = true
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../../assets/styles/fn.less';

.root {
  display: inline-block;
}

.dialog {
  padding: 40px;
  color: @text-main-color;
  &-title {
    text-align: center;
    font-size: 32px;
    padding-bottom: 32px;
  }
  &-content {
    font-size: 26px;
  }
  &-text {
    text-indent: 2em;
  }
  &-footer {
    display: flex;
    margin-top: 32px;
    >button {
      margin-left: 20px;
      margin-right: 20px;
    }
  }
}
</style>