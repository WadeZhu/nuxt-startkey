<template>
  <label class="klg-switch">
    <input class="klg-switch-input" :disabled="disabled" @change="$emit('change', currentValue)" type="checkbox" v-model="currentValue">
    <span class="klg-switch-core"></span>
    <div class="klg-switch-label"><slot></slot></div>
  </label>
</template>

<script>
/**
 * klg-switch
 * @module components/switch
 * @desc 切换按钮
 * @param {boolean} [value] - 绑定值，支持双向绑定
 * @param {slot} - 显示内容
 *
 * @example
 * <klg-switch v-model="value"></klg-switch>
 */
export default {
  name: 'mt-switch',

  props: {
    value: Boolean,
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    currentValue: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('input', val);
      }
    }
  }
};
</script>

<style lang="less" scoped>

  .klg {
    &-switch {
      display: flex;
      align-items: center;
      position: relative;
      * {
        pointer-events: none;
      }

      &-label {
        margin-left: 10px;
        display: inline-block;

        &:empty {
          margin-left: 0;
        }
      }

      &-core {
        display: inline-block;
        position: relative;
        width: 82px;
        height: 52px;
        border: 1px solid #d9d9d9; /* no */
        border-radius: 26px;
        box-sizing: border-box;
        background: #d9d9d9;

        &::after, &::before {
          content: " ";
          position: absolute;
          top: 0;
          left: 0;
          transition:transform .3s;
          border-radius: 25px;
        }

        &::after {
          width: 50px;
          height: 50px;
          background-color: #fff;
          box-shadow: 0 1px 3px rgba(0, 0, 0, .4);
        }

        &::before {
          width: 80px;
          height: 50px;
          background-color: #fdfdfd;
        }
      }

      &-input {
        display: none;

        &:checked {
          + .klg-switch-core {
            border-color: #26a2ff;
            background-color: #26a2ff;

            &::before {
              transform: scale(0);
            }

            &::after {
              transform: translateX(30px);
            }
          }
        }
      }
    }
  }
</style>
