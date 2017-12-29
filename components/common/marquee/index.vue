<template>
  <div class="marquee-wraper" :style="{ backgroundColor:  bgColor || '' }">
    <div class="marquee">
      <div>
        <p>{{tips}}</p>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: ['tips', 'bgColor'],
  name: 'marquee',
  data() {
    return {
    }
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
@import '../../../assets/styles/fn.less';

  .marquee {
    height: 50px;
    width: 700px;
    margin: 0 auto;
    overflow: hidden;
    line-height: 50px;
    position: relative;
    &-wraper {
      color: #f1973c;
    }
    div {
      margin-left: 50px;
      overflow: hidden;
      position: relative;
    }
    &:before {
      content: '';
      display: inline-block;
      width: 26px;
      height: 30px;
      background-size: 100%;
      background-image: url("~/static/image/common/icon_lingdang.png");
      position: absolute;
      left: 20px;
      top: 10px;
    }
    p {
      font-size: 28px;
      display: inline-block;
      white-space: nowrap;
      animation: marquee-animation 7s linear infinite;
    }
  }
  @keyframes marquee-animation {
    0% {
      transform: translateX(650px)
    }
    100% {
      transform: translateX(-100%)
    }
  }
</style>