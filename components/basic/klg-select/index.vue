<template>
  <div class="klg-select">
    <transition name="klg-select-mask">
      <div class="klg-mask klg-mask_transparent" :style="maskStyle" @click="onClickingMask" v-show="show"></div>
    </transition>
    <div @click="toggleMenu" class="klg-select-input" :class="{'klg-select-input--toggle': show}">
      {{getSelectedLabel()}}
    </div>
    <div class="klg-select-menu" :class="{'klg-select-menu--toggle': show}">
      <div class="klg-select-menu-item" :class="{'klg-select-menu--selected': item.value === value}" v-for="item in menus" @click="onMenuClick(item)">
        {{item.label}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'klg-select',
  props: {
    value: [Number, String],
    menus: {
      type: [Array],
      default: () => ([])
    },
    closeOnClickingMask: {
      type: Boolean,
      default: true
    },
    closeOnClickingMenu: {
      type: Boolean,
      default: true
    },
    placeholder: {
      type: String,
      default: '请选择'
    }
  },
  data () {
    return {
      show: false,
      maskStyle: {
        top: 0
      }
    }
  },
  methods: {
    toggleMenu() {
      this.show = !this.show
    },
    onMenuClick (item) {
      this.emitEvent('on-click-menu', item)
    },
    onClickingMask () {
      this.$emit('on-click-mask')
      this.closeOnClickingMask && (this.show = false)
    },
    emitEvent (event, menu) {
      if (event === 'on-click-menu') {
        this.$emit(event, menu)
        this.closeOnClickingMenu && (this.show = false)
      }
    },
    getSelectedLabel() {
      if (this.value && this.menus) {
        return this.menus.filter(item => item.value === this.value)[0].label
      }
      return this.placeholder
    },
    fixMask() {
      const { bottom } = this.$el.getBoundingClientRect()
      this.maskStyle = {
        top: bottom + 'px'
      }
    }
  },
  watch: {
    show (val) {
      if (val) {
        this.fixMask()
      }
    }
  }
}
</script>

<style lang="less">
@import '../../../assets/styles/fn.less';

.klg-select {
  position: relative;
  z-index: 901;
  background-color: #fff;
}

.klg-select-input {
  width: 100%;
  text-align: center;
  padding: 20px;
  &:after {
    content: " ";
    .setArrow(down, 16px, @text-gray-color, 3px);
    margin-left: 4px;
    top: -6px;
    transition: transform .3s;
  }
}

.klg-select-input--toggle {
  &:after {
    top: 0;
    transform: matrix(0.71, -0.71, 0.71, 0.71, 0, 0);
  }
}

.klg-select-menu {
  display: none;
  position: absolute;
  top: 100%;
  width: 100%;
  z-index: 901;
  transition: transform .3s;
}

.klg-select-menu--toggle {
  display: block;
}

.klg-select-menu-item {
  background-color: #fff;
  width: 100%;
  text-align: center;
  padding: 20px;
  &:after {
    .setTopLine(@line-light-color);
  }
}

.klg-select-menu--selected {
  background-color: #f7f7f7;
}

.klg-mask {
  position: fixed;
  z-index: 900;
  width: 100%;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, .4);
}

.klg-mask_transparent{
  position: fixed;
  z-index: 900;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
}

.klg-select-mask-enter,
.klg-select-mask-leave-active {
  opacity: 0;
}
.klg-select-mask-leave-active,
.klg-select-mask-enter-active {
  transition: opacity 300ms!important;
}
</style>