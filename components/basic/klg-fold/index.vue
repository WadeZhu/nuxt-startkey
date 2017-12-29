<template>
  <div class="wrapper">
    <div class="container" v-for="question in list"  @click="openItem(question)">
      <h2>
        <img class="icon" :src="question.icon" v-if="question.icon">
        <div :class="question.icon ? 'title title-icon' : 'title'" v-html="question.question"></div>
        <div :class="question.isShow ? 'imgIcon showIcon' : 'imgIcon'"></div>
      </h2>
      <div class="content" v-show="question.isShow" v-html="question.answer"></div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        questionList: []
      }
    },
    props: {
      list: {
        type: Array,
        required: true
      }
    },
    methods: {
      openItem (question) {
        let curIsShow = !question.isShow
        this.list.forEach(function (item) {
          item.isShow = false
        })
        question.isShow = curIsShow
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '../../../assets/styles/fn.less';

  .container{
    background: #ffffff;
    padding: 28px 0;
    margin-left: 40px;
    border-bottom: 1px solid #e4e4e4; /*no*/
    h2{
      position: relative;
      color: #333333;
      font-size: @text-xl-size;
      font-weight: 100;
      .imgIcon{
        display: inline-block;
        position: absolute;
        top: 15px;
        right: 30px;
        width: 23px;
        height: 10px;
        background: url('/msite/static/image/common/problem_icon_Open.png') no-repeat;
        background-size: 100%;
      }
      .showIcon{
        background: url('/msite/static/image/common/problem_icon_close.png') no-repeat;
        background-size: 100%;
      }
    }
    .icon{
      width: 35px;
      height: 35px;
      position: absolute;
      top: 0;
      left: 0;
    }
    .title {
      font-size: @text-l-size;
    }
    .title-icon{
      padding: 0 45px;
    }
    .content{
      margin: 30px 30px 0 0;
      color: #666666;
      font-size: @text-l-size;
    }
  }
</style>
