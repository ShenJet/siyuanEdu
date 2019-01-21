<template>
  <div class="goodscon">
    <div class="l">
      <img :src="goodsinfo.thumbnail" mode="aspectFill" alt="商品图片">
    </div>
    <div class="r">
      <div class="part1">{{goodsinfo.name}}</div>
      <div class="part2">{{goodsinfo.briefDesc}}</div>
      <div class="part3">
        <span>已售{{goodsinfo.salescount}}件</span>
      </div>
      <div class="part4">
        <div class="l">
          <div>批物价</div>
          <div class="price">
            <span class="nowprice">￥{{goodsinfo.currentPrice}}</span>
            <span class="oldprice">{{goodsinfo.oldPrice}}</span>
          </div>
        </div>
        <div class="r">
          <button hover-class="hoverbtn" @click="routeTo(goodsinfo._id)">立即抢购</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "goodsItem",
  props: {
    goodsinfo: Object
  },
  data: function() {
    return {};
  },
  methods: {
    routeTo(x) {
      wx.navigateTo({
        url: `/pages/goodsdetail/main?goodsid=${x}&origin=platform`
      });
    }
  }
};
</script>

<style lang='scss' scoped>
$maincolor: #377BF0;
.goodscon {
  width: 710rpx;
  height: 280rpx;
  overflow: hidden;
  margin: 0 auto;
  padding: 5rpx 0 0rpx;
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid #f1f1f1;
  .l {
    width: 250rpx;
    // padding: 20rpx;
    overflow: hidden;
    display: flex;
    align-items: center;
    img {
      width: 250rpx;
      height: 187.5rpx;
    }
  }
  .r {
    width: 460rpx;
    margin-left: 20rpx;
    & > div {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .part1 {
      font-size: 35rpx;
      color: #000;
      font-weight: 700;
      max-width: 80%;
    }
    .part2 {
      color: #7e7e7e;
      font-size: 31rpx;
      max-width: 80%;
    }
    .part3 {
      max-width: 80%;
      span {
        display: inline-block;
        border: 1px solid #909090;
        color: #909090; //d1d1d1
        font-size: 28rpx;
        height: 34rpx;
        line-height: 34rpx;
        border-radius: 17rpx;
        padding: 0rpx 20rpx;
      }
    }
    .part4 {
      font-size: 24rpx;
      color: $maincolor;
      width: 100%;
      display: flex;
      flex-direction: row;
      .l {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        width: 55%;
        padding-top: 10rpx;
        & > div {
          width: 100%;
          text-align: left;
        }
        .price {
          display: flex;
          flex-direction: row;
          align-items: center;
          span {
            height: 100%;
            display: inline-block;
          }
          .nowprice {
            font-size: 42rpx;
            font-weight: 700;
          }
          .oldprice {
            margin-left: 8rpx;
            color: #d1d1d1;
            text-decoration: line-through;
            font-size: 35rpx;
          }
        }
      }
      .r {
        overflow: hidden;
        display: flex;
        align-items: center;
        width: 45%;
        button {
          width: 100%;
          height: 70rpx;
          line-height: 70rpx;
          border: none;
          border-radius: 35rpx;
          color: #fff;
          background-color: $maincolor;
          font-size: 36rpx;
        }
        .hoverbtn {
          background-color: #9c2518;
        }
      }
    }
  }
}
</style>
