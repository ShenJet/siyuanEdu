<template>
  <div class="container">
    
      <div class="mapcon">
        <map
          id="map"
          v-if="map.mapshow"
          name
          :longitude="map.longitude"
          :latitude="map.latitude"
          :scale="map.scale"
          :markers="map.markers"
          :circles="map.circles"
          @markertap="markertap"
          enable-zoom="true"
          enable-scroll="true"
          show-location=true
          show-compass=true
        ></map>
      </div>
      
  </div>
</template>
<script>

import qc from 'wafer2-client-sdk'
import conf from '@/config'
import qqmap from "@/wxapis/qqmap.js";
var mymap = new qqmap({
  // 地图开发秘钥
  key: conf.mapkey // 必填
});

export default {
  data: function() {
    return {
      map: {
        mapshow: true,
        showopensettingbtn: true,
        longitude: "",
        latitude: "",
        scale: 17,
        markers: [],
        circles: [],
        controls: [
          {
            position: {
              left: 0,
              top: 0,
              width: 32,
              height: 32
            },
            iconPath: "/static/img/initialAvatar.png"
          }
        ]
      }
    };
  },
  methods: {
    reverseGeocoder(longitude, latitude) {
      return new Promise(function(resolve, reject) {
        mymap.reverseGeocoder({
          location: {
            latitude: latitude,
            longitude: longitude
          },
          success: function(res) {
            resolve(res);
          },
          fail: function(res) {
            resolve(null);
          }
        });
      });
    },
  },
  async onLoad() {
    // console.log("onload");
    wx.showShareMenu({
      withShareTicket: true
    });
  },
  async onShow() {
    if (!this.globalData.loginstate) {
      wx.showToast({
        title: "请先登录哦",
        icon: "none",
        mask: true,
        duration: 1500,
        success() {
          setTimeout(function() {
            wx.switchTab({ url: "/pages/my/main" });
          }, 1500);
        }
      });
    }
    let {longitude , latitude} = this.$root.$mp.query
    this.map.longitude = longitude
    this.map.latitude = latitude
    this.map.markers.push({
      longitude,latitude,

    })
    let query = await this.reverseGeocoder(longitude , latitude)
    // console.log(query);
    
  }
};
</script>
<style lang="scss" scoped>
$maincolor: #377BF0;
  .mapcon{
    width: 750rpx;
    height: 100vh;
    map{
      width: 750rpx;
      height: 100vh;
    }
}
</style>
