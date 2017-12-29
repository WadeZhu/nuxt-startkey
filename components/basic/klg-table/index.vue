<template>
  <table class="klg-table" :class="{'klg-table-bordered': fullBordered, 'klg-table-no-cell-bordered': !cellBordered, 'klg-table-no-content-bordered': !contentBordered}">
    <slot></slot>
  </table>
</template>

<script>
export default {
  name: 'x-table',
  props: {
    fullBordered: Boolean,
    cellBordered: {
      type: Boolean,
      default: true
    },
    contentBordered: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang="less">
@import '../../../assets/styles/fn.less';

.klg-table {
  position: relative;
  width: 100%;
  border-collapse: collapse;
  line-height: 1.7;
}

.klg-table th {
  font-weight: normal;
  text-align: center;
  color: @text-gray-color;
}

.klg-table td {
  line-height: 2.4;
  border-bottom: 1px dashed @line-light-color; /* no */
  text-align: center;
}

.klg-table tbody {
  margin-top: 20px;
}

.klg-table tr td:first-child,
.klg-table tr th:first-child {
  text-align: left;
}

.klg-table tr td:last-child,
.klg-table tr th:last-child {
  text-align: right;
}
</style>
