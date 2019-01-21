<template>
    <cover-view class="con" v-if="show">
        <div class="modal">
            
        </div>
    </cover-view>
</template>
<script>
export default {
    props:['show']
}
</script>
<style lang='scss' scoped>
.con{
    height: 100vh;
    width: 100vw;
    background-color: rgba(0,0,0,.7);
    position:fixed;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999999999;
    .modal{
        width: 70%;
        height: 60%;
        border-radius: 20rpx;
    }
}
</style>

