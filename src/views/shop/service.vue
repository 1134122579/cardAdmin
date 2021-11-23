<template>
  <div class="app-container">
    <!-- 搜索 -->
    <el-card>
      <el-form :inline="true" :model="listQuery" label-width="160px" class="demo-form-inline">
        <el-form-item label="项目名称:">
          <el-input
            v-model="listQuery.project_name"
            clearable
            size="mini"
            placeholder="请输入项目名称"
            style="width: 250px"
            class="filter-item"
            @keyup.enter.native="handleFilter"
          />
        </el-form-item>
        <el-form-item label="状态:">
          <el-radio-group v-model="listQuery.status" size="mini" @change="selectStatus()">
            <!-- 状态：1 为 启用，2 停用 出库 3为 停用-->
            <el-radio-button label>全部</el-radio-button>
            <el-radio-button :label="1">启用</el-radio-button>
            <el-radio-button :label="2">停用</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <div>
          <el-form-item label="添加日期:">
            <el-date-picker
              v-model="listQuery.querydate"
              clearable
              size="mini"
              value-format="yyyy-MM-dd"
              unlink-panels
              type="daterange"
              class="filter-item"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            />
          </el-form-item>

          <el-form-item>
            <el-button
              v-waves
              size="mini"
              class="filter-item search"
              type="success"
              icon="el-icon-circle-plus"
              @click="handleAdd('add','')"
            >添加项目</el-button>
            <el-button
              v-waves
              size="mini"
              class="filter-item search"
              type="primary"
              icon="el-icon-search"
              @click="handleFilter"
            >搜索</el-button>
          </el-form-item>
        </div>
      </el-form>
    </el-card>
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
        <el-table-column label="编号" align="center" fixed="left" min-width="60px">
          <template slot-scope="{ row }">
            <span>{{ row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column label="项目名称" align="center" :show-overflow-tooltip="true" min-width="100">
          <template slot-scope="{ row }">
            <span>{{ row.project_name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="项目封面" align="center" :show-overflow-tooltip="true" min-width="120">
          <template slot-scope="{ row }">
            <el-image class="logo" :src="row.cover" :preview-src-list="[row.cover]"></el-image>
          </template>
        </el-table-column>
        <el-table-column label="所属分类" align="center" :show-overflow-tooltip="true" min-width="60">
          <template slot-scope="{ row }">
            <span>{{ row.cat_name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="会员价" align="center" :show-overflow-tooltip="true" min-width="100">
          <template slot-scope="{ row }">
            <span>{{ row.vip_price }}</span>
          </template>
        </el-table-column>
        <el-table-column label="价格" align="center" :show-overflow-tooltip="true" min-width="60">
          <template slot-scope="{ row }">
            <span>{{ row.price }}</span>
          </template>
        </el-table-column>
        <el-table-column label="服务时长" align="center" :show-overflow-tooltip="true">
          <template slot-scope="{ row }">
            <span>{{ row.server_time }}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态" align="center" :show-overflow-tooltip="true" min-width="60">
          <template slot-scope="{ row }">
            <el-tag
              :type="row.status | typeFilter"
              effect="dark"
              @click="handleEditStatus(row.id, row.status)"
            >{{ row.status | statusFilter }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="创建时间"
          :show-overflow-tooltip="true"
          align="center"
          min-width="100px"
        >
          <template slot-scope="{ row }">
            <span>{{ row.create_time }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" min-width="120">
          <template slot-scope="{ row }">
            <el-button type="primary" size="mini" @click="handleAdd('edit', row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDel(row.id)">删除</el-button>
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
    <!-- 导入地点 -->
    <el-dialog
      :title="fromType == 'add' ? '添加项目' : '修改项目'"
      :visible.sync="dialogFormVisible"
      center
      top="5vh"
      width="40%"
    >
      <el-form :model="form" label-width="100px" ref="formName" :rules="rules">
        <el-form-item label="项目名称:" prop="project_name" min-width="80">
          <el-input v-model="form.project_name" clearable placeholder="请输入项目名称" />
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
            <el-image class="avatar" :src="form.cover" v-if="form.cover" />
            <i class="el-icon-plus avatar-uploader-icon" v-else></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="服务时长:" prop="server_time">
          <el-input-number
            v-model="form.server_time"
            clearable
            controls-position="right"
            precision="0"
            :min="1"
            :max="100000000"
            placeholder="请输服务时长"
          ></el-input-number>单位(分钟)
        </el-form-item>
        <el-form-item label="所属分类:" prop="class_id">
          <el-select v-model="form.class_id" placeholder="请选择">
            <el-option
              v-for="item in classOptions"
              :key="item.id"
              :label="item.cat_name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="项目状态:">
          <el-radio-group v-model="form.status">
            <!-- 状态：1 出租，2 自用 -->
            <el-radio-button :label="1">启用</el-radio-button>
            <el-radio-button :label="2">停用</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="项目价格:" prop="price">
          <el-input-number
            v-model="form.price"
            clearable
            controls-position="right"
            precision="2"
            :min="1"
            :max="100000000"
            placeholder="请输入项目费用"
          ></el-input-number>单位(元)
        </el-form-item>
        <el-form-item label="会员价格:" prop="vip_price">
          <el-input-number
            v-model="form.vip_price"
            clearable
            controls-position="right"
            precision="2"
            :min="1"
            :max="100000000"
            placeholder="请输入项目会员价格"
          ></el-input-number>单位(元)
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
import {
  getProjectList,
  editProject,
  delProject,
  setProjectStatus,
  addProject,
  getProjectClass
} from '@/api/shop'
import waves from '@/directive/waves' // waves directive 123
import { parseTime } from '@/utils'
import Tinymce from '@/components/Tinymce/index'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
export default {
  name: 'getProjectList',
  components: {
    Pagination,
    Tinymce
  },
  directives: {
    waves
  },
  filters: {
    // 状态：1 为入库，2 为 出库 3 为 停用
    statusFilter(status) {
      const statusMap = {
        1: '启用',
        2: '停用',
        3: '删除'
      }
      return statusMap[status]
    },
    // 状态颜色
    typeFilter(status) {
      const statusMap = {
        1: 'success',
        2: 'warning',
        3: 'danger'
      }
      return statusMap[status]
    }
  },

  data() {
    return {
      rules: {
        title: [
          { required: true, message: '请输入地点名称', trigger: 'change' }
        ],
        address: [{ required: true, message: '请输入地点', trigger: 'change' }],
        // tump: [{ required: true, message: "请上传缩略图", trigger: "change" }],
        class_id: [
          { required: true, message: '请选择所属分类', trigger: 'change' }
        ],
        status: [{ required: true, message: '请选择状态', trigger: 'change' }],
        lng: [
          { required: true, message: '请输入地点经度lng', trigger: 'change' }
        ],
        lat: [
          { required: true, message: '请输入地点纬度lat', trigger: 'change' }
        ]
      },
      fromType: null,
      classOptions: [],
      action: process.env.VUE_APP_BASE_API + '/upImage',
      tableKey: 0,
      list: null,
      total: 0,
      tableTotal: 0,
      date: '',
      ID: '',
      listLoading: false,
      table: true,
      status: '全部',
      disabled: 'false',
      fileList: [],
      listQuery: {
        page: 1,
        pageSize: 10,
        project_name: '',
        class_id: '',
        status: '',
        querydate: ''
      },
      form: {
        project_name: '',
        cover: '',
        vip_price: '',
        server_time: '',
        status: '',
        price: '',
        class_id: ''
      }, //导入文件
      fileLoading: false, //文件上传loading
      submitType: '',
      dialogFormVisible: false,
      imageloading: false
    }
  },
  watch: {
    dialogFormVisible(nV, oV) {
      if (!nV) {
        this.ID = 0
      }
    }
  },
  created() {
    this.getList()
    this.getClassOption()
  },
  methods: {
    //富文本编辑
    TinymceInput(value) {
      this.form.desc = value
    },
    // 上传到本地
    uploadChange(file, fileList) {
      this.form.file = file.raw
    },
    // 上传前
    beforeAvatarUpload(file) {
      this.imageloading = true
    },
    handleAvatarSuccess(res) {
      this.imageloading = false
      this.form.cover = res.data.imgUrl
      console.log(this.form.cover)
    },
    //提交
    submitProData() {
      switch (this.fromType) {
        case 'add':
          addProject(this.form).then(res => {
            this.$message({
              message: '提交成功',
              type: 'success'
            })
            this.getList()
            this.dialogFormVisible = false
          })
          break
        case 'edit':
          editProject(this.form).then(res => {
            this.$message({
              message: '提交成功',
              type: 'success'
            })
            this.getList()
            this.dialogFormVisible = false
          })
          break
      }
      return
    },
    //弹出导入地点表单
    handleAdd(fromType, row) {
      this.fromType = fromType
      switch (fromType) {
        case 'add':
        this.form={}
          // this.$refs["formName"].resetFields();
          break
        case 'edit':
          this.ID = JSON.parse(JSON.stringify(row)).id
          this.form = JSON.parse(JSON.stringify(row))
          break
      }

      this.dialogFormVisible = true
    },
    // 修改地点状态
    handleEditStatus(id, status) {
      this.$confirm('此操作将修改项目状态, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          let pstatus = status == 1 ? 2 : 1
          setProjectStatus({ id: id, status: pstatus }).then(response => {
            this.getList()
            this.$message({
              type: 'success',
              message: '操作成功!'
            })
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          })
        })
    },
    // 删除地点
    handleDel(id) {
      this.$confirm('此操作将删除地点, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          delProject({ id: id }).then(response => {
            this.$message({
              type: 'success',
              message: '操作成功!'
            })
            this.getList()
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          })
        })
    },
    // 筛选地点状态
    selectStatus() {
      this.getList()
    },
    // 筛选地点类型
    selectType() {
      this.getList()
    },
    //获取分类选项
    getClassOption() {
      getProjectClass().then(response => {
        this.listLoading = false
        this.classOptions = response.data
      })
    },
    // 获取地点列表
    getList() {
      this.listLoading = true
      getProjectList(this.listQuery).then(response => {
        this.listLoading = false
        this.list = response.data.result
        this.total = response.data.pageInfo.total
      })
    },
    //筛选过滤
    handleFilter() {
      this.getList()
    }
  }
}
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
  height: 80px;
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
