<template>
  <div class="empty">
    <img class="empty-image" :src="info.imgSrc">
    <p class="empty-title">{{info.title}}</p>
    <p class="empty-text">{{info.text}}</p>
    <KlgButton class="empty-botton" v-if="btnText">{{btnText}}</KlgButton>
  </div>
</template>

<script>
  import KlgButton from '~/components/basic/klg-button'

  export default {
    name: 'empty',
    props: {
      type: {
        type: String,
        required: true
      },
      btnText: {
        type: String
      }
    },
    components: {
      KlgButton
    },
    data() {
      return {
        content: {
          'empty': {
            'imgSrc': '~/static/image/common/icon_nothing@2x.png',
            'title': '这里竟然空空的，什么都没有',
            'text': '先去其他页面看看吧'
          },
          'noNetwork': {
            'imgSrc': '~/static/image/common/icon_No_network@2x.png',
            'title': '网络跟考拉一样睡着了',
            'text': '下拉刷新叫醒他们吧～'
          },
          'error404': {
            'imgSrc': '~/static/image/common/img_404@2x.png',
            'title': '信息可能被外星人带走啦～',
            'text': '考拉努力找回中，先去其他页面看看吧'
          }
        },
        info: null
      }
    },
    created() {
      this.info = this.content[this.type]
    }
  }
</script>

<style lang="less" scoped>
  @import '../../../assets/styles/fn.less';

  .empty {
    text-align: center;
    padding-top: 40px;
    &-image {
      width: 480px;
      margin-bottom: 30px;
    }
    &-title {
      color: @text-secondary-color;
      font-size: 28px;
      margin-bottom: 10px;
    }
    &-text {
      color: @text-gray-color;
      margin-bottom: 30px;
    }
    &-botton {
      width: 300px
    }
  }
</style>
