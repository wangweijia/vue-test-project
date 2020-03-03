<template>
    <div class="rootList" >
        <div v-for="(item, index) in listData" @click="toDetail" :key="index" :style="{'background-color': item.color}" class="itemCell" >
            {{item.index}}
        </div>
    </div>
</template>

<script>
export default {
    name: 'ListView',
    data() {
        return {
            listData: []
        }
    },
    created() {
        console.log('created');
        setTimeout(() => {
            this.listData = this.initList()
        }, 1000);
    },
    mounted() {
        // 获取缓存数据 ！！！！！
        this.getSessionStorage();
    },
    methods: {
        getSessionStorage() {
            const list = sessionStorage.getItem("myList");
            if (list) {
                this.listData = JSON.parse(list);
            }
        },
        initList() {
            const list = [];
            const showItemIndex = 55;
            const l = Math.ceil(Math.random()*50) + 50;
            console.log(l);
            for (let index = 0; index < l; index++) {
                list.push({
                    name: 'list',
                    index: index,
                    show: index === showItemIndex,
                    color: index%2===0?'white':'#666666',
                })
            }
            // 添加缓存数据 ！！！！！
            sessionStorage.setItem("myList", JSON.stringify(list));
            return list;
        },
        toDetail() {
            this.$router.push({
                path: 'detail'
            })
        }
    },
}
</script>

<style lang="less" scoped>

.rootList {
    display: flex;
    flex: 1;
    flex-direction: column;
    background-color: aquamarine;
    overflow: scroll;

    .itemCell {
        flex-shrink: 0;/*防止被压缩*/
        height: 44px;
    }
}

</style>