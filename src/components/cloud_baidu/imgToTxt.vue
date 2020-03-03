<template>
  <div class="rootBox" v-loading="loading" >
    <el-upload
      class="upload-demo"
      drag
      action="http://118.190.162.218:9901/imgeUpdate"
      :on-error="error"
      :before-upload="beforeUpload"
      :on-success="success"
      multiple>
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip" slot="tip">只能上传jpg/png文件</div>
    </el-upload>
    <div>
      <template v-for="(item, index) in successFiles" >
        <a :key="index" :href="item.result_data" >解析成功：{{item.name}}，点击下载</a>
      </template>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      successFiles: [],
      loading: false,
    }
  },
  methods: {
    success(response, file, fileList) {
      console.log(response, file, fileList);
      const { result } = response;
      const { name } = file;
      this.successFiles.push({
        ...result,
        name
      });
      this.loading = false;
    },
    beforeUpload() {
      this.loading = true;
    },
    error(err) {
      this.loading = false;
      this.$notify(err);
    }
  }
}
</script>

<style lang="less" scoped>

.rootBox {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
}

</style>