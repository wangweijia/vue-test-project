<template>
  <div>
    <div ref="box" class="box" >
      <slot></slot>
    </div>
    <el-button class="aBtn" @click="toImage" >截图下载</el-button>
  </div>
</template>

<script>
import domtoimage from 'dom-to-image';

export default {
  props: {
    fileName: {
      type: String,
    }
  },
  methods: {
    toImage() {
      const { box } = this.$refs;
      const name = this.fileName || 'my-node.png';
      if (box) {
        domtoimage.toBlob(box, { quality: 1 })
        .then((blob) => {
            window.saveAs(blob, name);
        });
      }
    }
  }
}
</script>

<style lang="less" scoped>

.box {
  padding: 10px;
  background-color: #ffffff;;
}

.aBtn {
  margin: 20px 0;
}
</style>