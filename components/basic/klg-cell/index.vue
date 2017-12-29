<template>
  <div
    class="klg-cell"
    :class="{
      'klg-tap-active': isLink || !!link,
      'klg-cell_access': isLink || !!link,
      'klg-cell-no-border-intent': !borderIntent,
      'klg-cell-disabled': disabled
    }"
    @click="onClick">
    <div class="klg-cell__hd">
      <slot name="icon"></slot>
    </div>
    <div class="klg-cell-bd" :class="{'klg-cell-primary': primary === 'title' && valueAlign !== 'left'}">
      <p>
        <label class="klg-label" :style="getLabelStyles()" v-if="title || hasTitleSlot">
          <slot name="title">{{ title }}</slot>
        </label>
        <slot name="after-title"></slot>
      </p>
      <slot name="inline-desc">{{ inlineDesc }}</slot>
    </div>
    <div class="klg-cell__ft" :class="valueClass">
      <slot name="value"></slot>
      <slot>{{ value }}</slot>
      <i class="klg-spining" v-if="isLoading"></i>
    </div>
    <slot name="child"></slot>
  </div>
</template>

<script>
export default {
  name: 'cell',
  props: {
    title: [String, Number],
    value: [String, Number, Array],
    isLink: Boolean,
    isLoading: Boolean,
    inlineDesc: [String, Number],
    primary: {
      type: String,
      default: 'title'
    },
    link: [String, Object],
    valueAlign: [String, Boolean, Number],
    borderIntent: {
      type: Boolean,
      default: true
    },
    disabled: Boolean,
    arrowDirection: String // down or up
  },
  beforeMount () {
    this.hasTitleSlot = !!this.$slots.title
  },
  computed: {
    valueClass () {
      return {
        'klg-cell-primary': this.primary === 'content' || this.valueAlign === 'left',
        'klg-cell-align-left': this.valueAlign === 'left',
        'klg-cell-arrow-transition': !!this.arrowDirection,
        'klg-cell-arrow-up': this.arrowDirection === 'up',
        'klg-cell-arrow-down': this.arrowDirection === 'down'
      }
    }
  },
  methods: {
    getLabelStyles () {
      return {
        width: this.$parent.labelWidth || this.$parent.$parent.labelWidth,
        textAlign: this.$parent.labelAlign || this.$parent.$parent.labelAlign,
        marginRight: this.$parent.labelMarginRight || this.$parent.$parent.labelMarginRight
      }
    },
    onClick () {
      if (!this.disabled && this.link) {
        window.location.href = this.link
      }
    }
  },
  data () {
    return {
      hasTitleSlot: false
    }
  }
}
</script>

<style lang="less">
@import '../../../assets/styles/fn.less';
@import '../../../assets/styles/tap.less';
@import '../../../assets/styles/loading.less';

.klg-cells {
  margin-top: @cells-margin-top;
  background-color: @cell-bg;
  line-height: @cell-line-height;

  overflow: hidden; //因为每个cell的border使用before元素left搞的，ie下伪元素的containing block估计跟标准不同，在cell上用oh不生效

  // onepx
  position: relative;
  &:before {
    .setTopLine(@cell-border-color);
  }
  &:after {
    .setBottomLine(@cell-border-color);
  }
}

.klg-cell {
  padding: @cell-gap-v @cell-gap-h;
  position: relative; //这个是为了兼容cells容器onepx方案被before挡住而做的
  display: flex;
  align-items: center;
  &:before {
    .setTopLine(@cell-border-color);
    left: @cell-gap-h;
  }
  &:first-child {
    &:before {
      display: none;
    }
  }
}

.klg-cell_access {
  color: inherit;
  .klg-cell__ft {
    padding-right: 13px;
    position: relative;
    &:after {
      content: " ";
      .setArrow(right, @cell-default-arrow-width, @cell-default-arrow-color, @cell-default-arrow-border-width);
      position: absolute;
      top: 50%;
      margin-top: -4px;
      right: 2px;
    }
  }
}


.klg-cell_primary{
  align-items: flex-start;
}
.klg-cell__bd{
  flex: 1;
}
.klg-cell__ft {
  text-align: right;
  color: @text-gray-color;
}

.klg-cell-primary {
  flex: 1;
}
.klg-label {
  display: block;
  word-wrap: break-word;
  word-break: break-all;
}
.klg-cell__ft .klg-loading {
  display: block;
}
.klg-cell__ft.klg-cell-align-left {
  text-align: left;
}
.klg-cell.klg-cell-no-border-intent:before {
  left: 0;
}
.klg-cell_access .klg-cell__ft.klg-cell-arrow-down:after {
  transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0) rotate(90deg);
}
.klg-cell_access .klg-cell__ft.klg-cell-arrow-up:after {
  transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0) rotate(-90deg);
}
.klg-cell-arrow-transition:after {
  transition: transform 300ms;
}
.klg-cell-disabled {
  .klg-label {
    color: #b2b2b2;
  }
  &.klg-cell_access .klg-cell__ft:after {
    border-color: @cell-disabled-arrow-color;
  }
}
</style>
