<template>
  <div class="rootBox" v-loading="loading" >
    <div>
      要选择正确的解析格式
    </div>
    <el-radio-group v-model="imageToTxtType">
      <el-radio v-for="(item, index) in analysisOpts" :key="index" :label="item.value">{{ item.name }}</el-radio>
    </el-radio-group>
    <el-upload
      class="upload-demo"
      drag
      :limit="1"
      :action="updateAction"
      :on-error="error"
      :before-upload="beforeUpload"
      :on-success="success"
      multiple>
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，限制大小为2兆</div>
    </el-upload>
    <div>
      <template v-for="(item, index) in successFiles" >
        <a v-if="item.imageToTxtType === ImageToTxtType.Excel" :key="index" :href="item.result_data" >解析成功：{{item.name}}，点击下载</a>
        <div 
        v-else-if="item.imageToTxtType === ImageToTxtType.OnlyTxt" 
        :key="index"
        @click="()=>showDialog(item)"
        >解析成功：{{item.name}}，点击查看数据</div>
      </template>
    </div>

    <el-dialog
      title="解析结果"
      :visible.sync="dialogVisible"
      width="80%" >
      <!-- <span>解析结果</span> -->
      <pre>{{ currentTxtInfo.words_result }}</pre>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

const ImageToTxtType = {
  // 普通文字
  OnlyTxt: 1,
  // 表格
  Excel: 2
}

export default {
  data() {
    return {
      ImageToTxtType,
      successFiles: [],
      loading: false,
      imageToTxtType: ImageToTxtType.OnlyTxt,
      dialogVisible: false,
      currentTxtInfo: {}
    }
  },
  computed: {
    analysisOpts() {
      return [
        {
          name: '普通文字',
          value: ImageToTxtType.OnlyTxt
        }, {
          name: '表格',
          value: ImageToTxtType.Excel
        }
      ]
    },
    updateAction() {
      switch (this.imageToTxtType) {
        case ImageToTxtType.OnlyTxt:
          return 'http://118.190.162.218:9901/onlyText';
        case ImageToTxtType.Excel:
          return 'http://118.190.162.218:9901/imgeUpdate';
        default:
          return '';
      }
    }
  },
  methods: {
    success(response, file, fileList) {
      console.log(response, file, fileList);

      if (this.imageToTxtType === ImageToTxtType.OnlyTxt) {
        const { words_result } = response;
        const { name } = file;
        this.successFiles.push({
          words_result,
          name,
          imageToTxtType: this.imageToTxtType
        });
      }
      if (this.imageToTxtType === ImageToTxtType.Excel) {
        const { result } = response;
        const { name } = file;
        this.successFiles.push({
          ...result,
          name,
          imageToTxtType: this.Excel
        });
      }

      this.loading = false;
    },
    beforeUpload(file) {
      console.log(file);
      const { size } = file;
      const sizeLimt = 2 * 1024 * 1204;
      if (size < sizeLimt) {
        this.loading = true;
        return true;
      }

      this.$notify.error({
        title: '错误',
        message: '目前图片大小不能超过2M'
      });

      return false;
    },
    error(err) {
      this.loading = false;
      this.$notify(err);
    },
    showDialog(item) {
      this.dialogVisible = true;
      this.currentTxtInfo = item;
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

.upload-demo {
  margin-top: 10px;
}

</style>