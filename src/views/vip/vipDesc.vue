<template>
  <div class="app-container">
    <!-- 列表 -->
    <el-card style="margin-top: 20px">
      <el-table
        :key="tableKey"
        v-loading="listLoading"
        :data="list"
        border
        fit
        highlight-current-row
        style="width: 100%"
      >
        <el-table-column
          label="编号"
          align="center"
          fixed="left"
          min-width="40"
        >
          <template slot-scope="{ row }">
            <span>{{ row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="权益名称"
          align="center"
          min-width="40"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="{ row }">
            <span>{{ row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="权益"
          align="center"
          min-width="140"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="{ row }">
            <img class="logo" :src="row.img_url" />
          </template>
        </el-table-column>
        <el-table-column
          label="权益须知"
          align="center"
          min-width="180"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="{ row }">
            <div v-html="row.desc"></div>
          </template>
        </el-table-column>
        <el-table-column
          label="录入时间"
          :show-overflow-tooltip="true"
          align="center"
        >
          <template slot-scope="{ row }">
            <span>{{ row.create_time }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="{ row }">
            <el-button type="primary" size="mini" @click="handleEdit(row)"
              >编辑</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.pageSize"
      @pagination="getList"
    />
    <!-- 权益信息 -->
    <el-dialog
      title="修改会员权益"
      :visible.sync="dialogFormVisible"
      center
      top="5vh"
      width="35%"
    >
      <el-form :model="form" label-width="100px" ref="formName" :rules="rules">
        <el-form-item label="权益名称:" prop="name">
          <el-input
            v-model="form.name"
            clearable
            placeholder="请输入权益名称"
          />
        </el-form-item>
        <el-form-item label="上传封面:" label-position="right">
          <el-upload
            class="avatar-uploader"
            :action="action"
            name="file"
            accept="image/*"
            :on-success="handleAvatarSuccess"
            :show-file-list="false"
          >
            <el-image class="avatar" :src="form.img_url" v-if="form.img_url" />
            <i class="el-icon-plus avatar-uploader-icon" v-else></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="权益描述:" prop="desc">
          <Tinymce
            v-if="ID == form.id"
            :value="form.desc"
            style="width: 100%"
            @input="TinymceInput"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitProData()">立即提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getVipDescList, editVipDesc } from "@/api/vip";
import waves from "@/directive/waves"; // waves directive 123
import Tinymce from "@/components/Tinymce/index";
import { parseTime } from "@/utils";
import Pagination from "@/components/Pagination"; // secondary package based on el-pagination
export default {
  name: "getVipDescList",
  components: {
    Pagination,
    Tinymce,
  },
  directives: {
    waves,
  },
  filters: {
    // 状态： 1 自动，2 手动
    statusFilter(is_auto) {
      const statusMap = {
        1: "自动",
        2: "手动",
      };
      return statusMap[is_auto];
    },

    // 状态颜色
    typeFilter(status) {
      const statusMap = {
        1: "success",
        2: "warning",
        3: "danger",
      };
      return statusMap[status];
    },
  },

  data() {
    return {
      rules: {
        title: [
          { required: true, message: "请输入地点名称", trigger: "change" },
        ],
        address: [{ required: true, message: "请输入地点", trigger: "change" }],
        // tump: [{ required: true, message: "请上传缩略图", trigger: "change" }],
        class_id: [
          { required: true, message: "请选择所属分类", trigger: "change" },
        ],
        status: [{ required: true, message: "请选择状态", trigger: "change" }],
        lng: [
          { required: true, message: "请输入地点经度lng", trigger: "change" },
        ],
        lat: [
          { required: true, message: "请输入地点纬度lat", trigger: "change" },
        ],
      },
      fromType: null,
      action: process.env.VUE_APP_BASE_API + "/upImage",
      tableKey: 0,
      list: null,
      total: 0,
      tableTotal: 0,
      date: "",
      ID: "",
      listLoading: false,
      table: true,
      status: "全部",
      disabled: "false",
      fileList: [],
      listQuery: {
        page: 1,
        pageSize: 10,
        name: "",
        type: "",
        area_id: "",
        status: "",
        querydate: "",
      },
      form: {
        img_url: "",
        name: "",
        desc: "",
        id: "",
      }, //导入文件
      fileLoading: false, //文件上传loading
      multipleSelection: [],
      submitType: "",
      dialogFormVisible: false,
      imageloading: false,
    };
  },
  watch: {},
  created() {
    this.getList();
    this.getAreaOption();
  },
  methods: {
    //富文本编辑
    TinymceInput(value) {
      this.form.desc = value;
    },
    // 上传前
    beforeAvatarUpload(file) {
      this.imageloading = true;
    },
    // 上传成功
    handleAvatarSuccess(res) {
      this.imageloading = false;
      this.form.img_url = res.data.imgUrl;
    },
    //提交
    submitProData() {
      editVipDesc(this.form).then((res) => {
        this.dialogFormVisible = false;
        this.$message({
          message: "修改成功",
          type: "success",
        });
        this.getList();
      });
    },

    //弹出导入地点表单
    handleEdit(row) {
      this.ID = JSON.parse(JSON.stringify(row)).id;
      this.form = JSON.parse(JSON.stringify(row));
      this.dialogFormVisible = true;
    },
    // 修改地点状态
    handleEditStatus(id, status) {
      this.$confirm("此操作将修改设备控制方式, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let pstatus = status == 1 ? 2 : 1;
          setMapsStatus({ id: id, status: pstatus }).then((response) => {
            this.getList();
            this.$message({
              type: "success",
              message: "操作成功!",
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作",
          });
        });
    },
    // 删除设备 暂时没用
    handleDel(row) {
      this.$confirm("此操作将删除地点, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delMaps({ id: row.id }).then((response) => {
            this.$message({
              type: "success",
              message: "操作成功!",
            });
            this.getList();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作",
          });
        });
    },
    // 筛选项目
    selectProject(e) {
      this.form.projectId = e.project_id;
      this.form.project_name = e.project_name;
      this.getTempOption();
      this.getGroupOption();
    },
    // 筛选项目
    selectGroup(e) {
      this.form.groupId = e.id;
      this.form.group_name = e.title;
    },
    // 筛选地点状态
    selectStatus() {
      this.getList();
    },
    // 获取地点列表
    getList() {
      this.listLoading = true;
      getVipDescList(this.listQuery).then((response) => {
        this.listLoading = false;
        this.list = response.data.result;
        this.total = response.data.pageInfo.total;
      });
    },
    // 获取分类选项
    getAreaOption() {
      getSelectArea().then((response) => {
        this.areaOptions = response.data;
      });
    },
    // 获取项目分类
    getProjectOption() {
      queryProjectList().then((response) => {
        this.projectOptions = response.data;
      });
    },
    // 获取分组选项
    getGroupOption() {
      getDevGroups({ projectId: this.form.projectId }).then((response) => {
        this.groupOptions = response.data;
      });
    },
    // 获取模板选项
    getTempOption() {
      getDeviceTemplates({ projectId: this.form.projectId }).then(
        (response) => {
          this.tempOptions = response.data;
        }
      );
    },
    //筛选过滤
    handleFilter() {
      this.getList();
    },
  },
};
</script>
<style lang="scss" scoped>
.demonstration {
  display: inline-block;
  margin: 0 10px;
  font-size: 12px;
  font-weight: 600;
  color: #606266;
}
.textinput {
  width: 60%;
}
.search {
  margin-left: 30px;
}
.list_time {
  width: 88px;
}
.sarch {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.logo {
  width: 100%;
  height: 100%;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
