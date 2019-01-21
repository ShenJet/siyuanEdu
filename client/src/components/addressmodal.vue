<template>
    <div class="modalcon" v-if="show">
        <div class="title">
            {{title}}
        </div>
    </div>
</template>
<script>
export default {
    props:['show','type','item'],
    data:function(){
        return {

        }
    },
    computed: {
        title: function(){
            if(this.type == 'add'){
                return '新增收货地址'
            }else if(this.type == 'edit'){
                return '编辑收货地址'
            }
        }
    },
}
</script>
<style lang='scss' scoped>
.modalcon{
    height: 40vh;
    width: 80vw;
    background-color: #fff;
    position:fixed;
    top: 25vh;
    left: 10vw;
    display: flex;
    // align-items: c;
    // justify-content: center;
    z-index: 2;
    border-radius: 30rpx;
    border: 1px solid #ccc;
    padding: 0 20rpx;
    &>div{
        width: 100%;
    }
    .title{
        padding: 8rpx 0 12rpx;
        border-bottom: 1px solid #e5e5e5;
        text-align: center;
        height: 40rpx;
        line-height: 40rpx;
        font-size: 30rpx;
        
    }
}
</style>

