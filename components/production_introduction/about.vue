<template>
  <div>
    <div class="content">
      <div class="content-title icon-about">关于考拉</div>
      <p class="content-line">考拉理财是华南地区颇具影响力的互联网金融平台，通过云计算技术，结合深度数据挖掘、分析与监测，用分散投资的方式，帮助用户更大程度地降低风险。</p>
      <div class="info">
        <div class="column">
          <div class="item item1">
            <img src="~/static/image/production_introduction/OPI_icon_quality@2x.png">
            <p class="title">投资安全</p>
            <p class="detail">上线以来100%本息兑付</p>
            <p class="detail">提供银行级别保障</p>
          </div>
          <div class="item item2">
            <img src="~/static/image/production_introduction/OPI_icon_security@2x.png">
            <p class="title">拥抱合规</p>
            <p class="detail">广州互金协会会员单位</p>
            <p class="detail">获评国家高新技术企业</p>
          </div>
        </div>
        <div class="column">
          <div class="item item3">
            <img src="~/static/image/production_introduction/OPI_icon_major@2x.png">
            <p class="title">银行存管</p>
            <p class="detail">由新网银行全程存管</p>
            <p class="detail">资金安全再升级</p>
          </div>
          <div class="item item4">
            <img src="~/static/image/production_introduction/OPI_icon_Compliance@2x.png">
            <p class="title">信息安全</p>
            <p class="detail">健全的服务器体系</p>
            <p class="detail">保障数据网络传输安全</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
  .icon-about::after {
    background-image: url('~/static/image/production_introduction/about.png');
  }
  .info {
    background-color: #fff7ee;
    height: 600px;
    margin: 30px 0;
    display: flex;
    .column {
      flex: 1;
      display: flex;
      flex-direction: column;
    }
    .item {
      flex: 1;
      padding-top: 30px;
      padding-bottom: 20px;
      text-indent: 0;
      text-align: center;
      img {
        width: 109px;
        height: 109px;
      }
      .title {
        font-size: 26px;
        color: #704d29;
        line-height: 50px;
      }
      .detail {
        font-size: 20px;
        color: #a78562;
        line-height: 30px;
      }
    }
  }
</style>
