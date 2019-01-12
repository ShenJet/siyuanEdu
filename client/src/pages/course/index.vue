<template>
    <div>
        <p>{{route}}</p>

    </div>
</template>
<script>
    // import Name from './components/Name.vue'
    
    export default {
        data:function() {
            return {
                route:''
            }
        },
        onLoad(options){
            console.log(options);
            this.route = options.coursecate
        },
        
    }
</script>
<style lang="scss" scoped>



</style>