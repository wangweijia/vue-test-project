<template>
    <div class="page" >
        <router-link to="/list1">方法1，（方法1不行就试试方法2）</router-link>
        <br/>
        <router-link to="/list3">方法2，（再不行就没辙了）</router-link>
        <br>
        <router-link to="/imgToTxt">图片识别</router-link>
        <br>
        <router-link to="/stock" >股票数据统计</router-link>
    </div>
</template>

<script>
export default {
    name: 'Index',
}
</script>

<style lang="less" scoped>
.page {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    width: 100%;
    height: 100%;

    overflow: hidden;
}

</style>