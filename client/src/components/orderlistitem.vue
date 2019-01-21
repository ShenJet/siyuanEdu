<template>
  <div class="ordercon">
    <div class="header main">
      <div class="u">
        <div class="status">
          {{statusname[orderinfo.status]}}
        </div>
        <div class="time">
          {{ orderinfo._createtime }}
        </div>
      </div>
      <div class="m">
        <div class="l">
          <!-- <img :src="orderinfo.urls[0]" mode='widthFix' alt=""> -->
        </div>
        <div class="m">
          {{orderinfo.goodsname}}
        </div>
        <div class="r">
          ￥{{orderinfo.price}}
          <div class="count">x{{orderinfo.count}}</div>
          <div class="total_fee">总价:￥{{orderinfo.total_fee/100}}</div>
        </div>
      </div>
      <div class="d">
          <button plain type="warn" @click='deleteOrder()'>删除订单</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "orderlistItem",
  props: {
    orderinfo: Object
  },
  data: function() {
    return {
      statusname:{
        1:'未支付',
        2:'待商户确认',
        3:'已发货',
        4:'已发货',
        5:'已发货',
        6:'已收货',
        7:'退款申请中',
        8:'已退款',
        9:'退款申请中',
        10:'订单已关闭',
        11:'提现申请中',
        12:'提现已完成',
      }
    };
  },
  methods: {
    routeTo(x) {
      wx.navigateTo({
        url: "/pages/goodsdetail/main?goodsid="+x
      });
    }
  },
  computed: {},
  methods: {
    deleteOrder(){

    }
  },
};
</script>

<style lang='scss' scoped>
$maincolor: #377BF0;
.main{
  border-top: 20rpx solid #f5f5f5 ;
  padding: 20rpx 20rpx;
  .u{
    color: #b3b3b3;
    font-size: 32rpx;
    // font-size: 13pt;
    border-bottom: 1px solid #f5f5f5;
    display: flex;
    flex-direction: row;
    .status{
      padding: 0 15rpx 0 0;
      border-right: 1px solid #f5f5f5;
      color: $maincolor;
    }
  }
}

.header{
  
  &>.m{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    padding: 20rpx 0;
    border-bottom: 1px solid #f5f5f5;
    div{
      text-align: right;
    }
    .l{
      width: 25%;
      img{
        width: 90%;
      }
    }
    .m{
      width: 35%;
      text-align: left!important;
      display: flex;
      justify-content: flex-start;
      padding-left: 25rpx;
      font-size: 32rpx;
    }
    .r{
      width: 40%;
      font-size: 32rpx;
      .count{
        color:#ccc;
      }
    }
  }
  .d{
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    padding: 20rpx 0 0;
    button{
      // width: 60rpx;
      height: 45rpx;
      padding: 0 8rpx;
      line-height: 40rpx;
      text-align: center;
      font-size: 30rpx;
      margin: 0;
    }
    input{
      width: 100rpx;
      height: 60rpx;
      padding: 0;
      line-height: 60rpx;
      text-align: center;
      font-size: 40rpx;
    }
  }
}
</style>
