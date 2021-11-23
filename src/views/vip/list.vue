<template>
  <div class="app-container">
    <!-- 搜索 -->
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
        <el-table-column label="会员名称" align="center" :show-overflow-tooltip="true">
          <template slot-scope="{ row }">
            <span>{{ row.name }}</span>
          </template>
        </el-table-column>

        <el-table-column label="活动价格" align="center" :show-overflow-tooltip="true" width="150px">
          <template slot-scope="{ row }">
            <span>{{ row.price }}</span>
          </template>
        </el-table-column>

        <el-table-column label="原价" align="center" :show-overflow-tooltip="true">
          <template slot-scope="{ row }">
            <span>{{ row.const_price }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="活动截止时间"
          align="center"
          :show-overflow-tooltip="true"
          min-width="120px"
        >
          <template slot-scope="{ row }">
            <span>{{ row.end_time }}</span>
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
        <el-table-column label="操作" align="center" min-width="120px">
          <template slot-scope="{ row }">
            <el-button type="primary" size="mini" @click="handleAdd( row)">编辑</el-button>
            <!-- 设备信息维护  <el-button size="mini" type="danger" @click="handleDel(row)">删除</el-button> -->
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
    <!-- 设备信息维护 -->
    <el-dialog title="修改会员信息" :visible.sync="dialogFormVisible" center top="5vh" width="35%">
      <el-form :model="form" label-width="120px">
        <el-form-item label="会员名称:" prop="name">
          <el-input v-model="form.name" clearable placeholder="请输入会员名称" />
        </el-form-item>
        <el-form-item label="会员原价:" prop="name">
          <el-input v-model="form.const_price" clearable placeholder="请输入会员费原价" />
        </el-form-item>
        <el-form-item label="截止时间:" label-position="right" prop="end_time">
          <el-date-picker
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss"
            v-model="form.end_time"
            type="datetime"
            placeholder="选择日期时间"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="活动价格:" label-position="right" prop="end_time">
          <el-input v-model="form.price" clearable placeholder="请输入会员活动价格" />
        </el-form-item>
        <el-form-item label="抵扣额度:" label-position="right" prop="discount_price">
          <el-input v-model="form.discount_price" clearable placeholder="请输入会员每次可抵扣舞蹈室费用额度" />
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
import { getVipList, editVip } from '@/api/vip'
import waves from '@/directive/waves' // waves directive 123
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
export default {
  name: 'getVipList',
  components: {
    Pagination
  },
  directives: {
    waves
  },
  filters: {
    // 状态： 1 自动，2 手动
    statusFilter(status) {
      const statusMap = {
        1: '启用',
        2: '停用'
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
      fromType: null,
      action: process.env.VUE_APP_BASE_API + '/upImage',
      tableKey: 0,
      list: null,
      total: 0,
      tableTotal: 0,
      date: '',
      listLoading: false,
      table: true,
      status: '全部',
      disabled: 'false',
      fileList: [],
      listQuery: {
        page: 1,
        pageSize: 10,
        name: '',
        type: '',
        area_id: '',
        status: '',
        querydate: ''
      },
      form: {
        name: '',
        id: '',
        price: '',
        const_price: '',
        end_time: '',
        discount_price: ''
      }, //导入文件
      fileLoading: false, //文件上传loading
      activity: 2, //项目
      submitType: '',
      dialogFormVisible: false,
      imageloading: false
    }
  },
  watch: {},
  created() {
    this.getList()
  },
  methods: {
    // 上传前
    beforeAvatarUpload(file) {
      this.imageloading = true
    },
    handleAvatarSuccess(res, file) {
      this.imageloading = false
      this.form.tump = res.data.baseImg
      // this.form.tumplook=res.data.imgUrl
    },
    //提交
    submitProData() {
      editVip(this.form).then(res => {
        this.dialogFormVisible = false
        this.$message({
          message: '操作成功',
          type: 'success'
        })
        this.getList()
      })
    },

    //修改会员信息
    handleAdd(row) {
      this.form = JSON.parse(JSON.stringify(row))
      this.dialogFormVisible = true
    },
    // 修改地点状态
    handleEditStatus(id, status) {
      this.$confirm('此操作将修改设备控制方式, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          let pstatus = status == 1 ? 2 : 1
          setMapsStatus({ id: id, status: pstatus }).then(response => {
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
    // 删除设备 暂时没用
    handleDel(row) {
      this.$confirm('此操作将删除地点, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          delMaps({ id: row.id }).then(response => {
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
    // 筛选项目
    selectProject(e) {
      this.form.projectId = e.project_id
      this.form.project_name = e.project_name
      this.getTempOption()
      this.getGroupOption()
    },
    // 筛选项目
    selectGroup(e) {
      this.form.groupId = e.id
      this.form.group_name = e.title
    },
    // 筛选地点状态
    selectStatus() {
      if (this.activity == 2) {
        this.form.end_time == ''
      }
    },
    // 获取地点列表
    getList() {
      this.listLoading = true
      getVipList(this.listQuery).then(response => {
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
<style>
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
  width: 80px;
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
