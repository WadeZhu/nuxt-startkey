<template>
  <ActionSheet
    class="policy-sheet"
    v-model="visible"
    :menus="menus"
    :showCancel="true"
    @on-click-menu="handleMenuClick"
  />
</template>

<script>
  import ActionSheet from '~/components/basic/klg-actionsheet'

  export default {
    name: 'policy-sheet',
    props: ['show', 'policyType'],
    components: {
      ActionSheet
    },
    data() {
      return {
        visible: this.show
      }
    },
    computed: {
      menus() {
        return this.getMenu(this.policyType)
      }
    },
    watch: {
      show() {
        this.visible = this.show
      },
      visible(val) {
        this.$emit('update:show', val)
      }
    },
    methods: {
      getMenu(policyType) {
        if (policyType === 'transfer') {
          return {
            '/koala_app/risk_assessment': '风险测评',
            '/koala_app/agreement': '考拉理财服务协议'
          }
        } else {
          return {
            '/msite/contract': '借款合同',
            '/koala_app/risk_assessment': '风险测评'
          }
        }
      },
      handleMenuClick(key) {
        this.$emit('click:menu', key)
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '../../../assets/styles/fn.less';
  .policy-sheet {
    text-align: center;
  }
</style>
