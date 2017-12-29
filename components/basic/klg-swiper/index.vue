<template>
  <div class="klg-slider">
    <slot></slot>
    <div
      v-if="showDots && swiper && dotsLength > 1"
      :class="[dotsClass, 'klg-indicator', 'klg-indicator-' + dotsPosition]"
    >
      <a href="javascript:" v-for="key in dotsLength">
        <i class="klg-icon-dot" :class="{'active': key - 1 === swiper.currentSlide}"></i>
      </a>
    </div>
  </div>
</template>

<script>
  import Siema from './siema'

  export default {
    name: 'klg-swiper',
    props: {
      duration: {
        type: Number,
        default: 300
      },
      easing: {
        type: String,
        default: 'ease-out'
      },
      perPage: {
        type: Number,
        default: 1
      },
      startIndex: {
        type: Number,
        default: 0
      },
      draggable: {
        type: Boolean,
        default: true
      },
      threshold: {
        type: Number,
        default: 20
      },
      loop: {
        type: Boolean,
        default: false
      },
      // extend siema
      auto: {
        type: Boolean,
        default: false
      },
      interval: {
        type: Number,
        default: 5000
      },
      showDots: {
        type: Boolean,
        default: true
      },
      dotsPosition: {
        type: String,
        default: 'center'
      },
      dotsClass: String
    },
    data() {
      return {
        swiper: null
      }
    },
    computed: {
      dotsLength() {
        return this.swiper ? this.swiper.innerElements.length - this.swiper.perPage + 1 : 0
      }
    },
    methods: {
      render() {
        this.swiper && this.swiper.destroy()
        this.swiper = new Siema({
          selector: this.$el,
          duration: this.duration,
          easing: this.easing,
          perPage: this.perPage,
          startIndex: this.startIndex,
          draggable: this.draggable,
          threshold: this.threshold,
          loop: this.auto ? true : this.loop
        })
      },
      autoplay() {
        if (this.swiper) {
          this.swiperInterval = setInterval(() => this.swiper.next(), this.interval)
        }
      }
    },
    mounted() {
      this.render()
      this.auto && this.autoplay()
    },
    destroy() {
      this.swiperInterval && clearInterval(this.swiperInterval)
      this.swiper && this.swiper.destroy()
    }
  }
</script>

<style lang="less" scope>
  .klg-slider {
    overflow: hidden;
    position: relative;

    > .klg-indicator, .klg-indicator-right {
      position: absolute;
      z-index: 1;
      right: 15px;
      bottom: 6px;

      > a {
        float: left;
        margin-left: 8px;

        > .klg-icon-dot {
          display: inline-block;
          vertical-align: middle;
          width: 6px;
          height: 6px;
          border-radius: 3px;
          background-color: #d0cdd1;
        }
        > .klg-icon-dot.active {
          background-color: #f1973c;
        }

      }
    }

    > .klg-indicator-center {
      right: 50%;
      transform: translateX(50%)
    }

    > .klg-indicator-left {
      left: 15px;
      right: auto;
    }
  }
</style>