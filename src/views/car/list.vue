<template>
  <div class="app-container">
    <!-- 搜索   -->
    <el-card>
      <el-form :inline="true" :model="listQuery" label-width="100px" class="demo-form-inline">
        <el-form-item label="用户信息:">
          <el-input
            v-model="listQuery.userinfo"
            placeholder="请输入输入姓名、手机号"
            class="filter-item"
            clearable
            @keyup.enter.native="handleFilter"
          />
        </el-form-item>
        <el-form-item label="车牌号:">
          <el-input
            v-model="listQuery.car_no"
            placeholder="请输入输入车牌号"
            class="filter-item"
            clearable
          />
        </el-form-item>
        <el-form-item label="绑定时间:">
          <el-date-picker
            v-model="listQuery.querydate"
            clearable
            style="width: 250px"
            unlink-panels
            value-format="yyyy-MM-dd"
            type="daterange"
            class="filter-item"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </el-form-item>
        <el-form-item label="用户状态:">
          <el-radio-group v-model="listQuery.status" size="mini" @change="selectStatus">
            <!-- 用户状态 1 启用 2 冻结 3 注销 -->
            <el-radio-button label>全部</el-radio-button>
            <el-radio-button :label="1">启用</el-radio-button>
            <el-radio-button :label="2">解绑</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button
            v-waves
            size="mini"
            type="primary"
            class="starh_button"
            @click="handleFilter"
          >搜索</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 列    表 -->
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
        <el-table-column label="编号" prop="id" align="center" width="80">
          <template slot-scope="{ row }">
            <span>{{ row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column label="头像" align="center" min-width="40">
          <template slot-scope="{ row }">
            <el-avatar :src="row.headimgurl" shape="square" :size="40"></el-avatar>
          </template>
        </el-table-column>
        <el-table-column label="姓名" align="center">
          <template slot-scope="{ row }">
            <span>{{ row.user_name == '' ? '' : row.user_name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="手机号" align="center" min-width="80">
          <template slot-scope="{ row }">
            <span>{{ row.mobile == '' ? '/' : row.mobile }}</span>
          </template>
        </el-table-column>
        <el-table-column label="车牌号" align="center">
          <template slot-scope="{ row }">
            <span>{{ row.car_no == '' ? '/' : row.car_no }}</span>
          </template>
        </el-table-column>
        <el-table-column label="车辆品牌" align="center">
          <template slot-scope="{ row }">
            <span>{{ row.brand_name == '' ? '/' : row.brand_name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="车辆颜色" align="center">
          <template slot-scope="{ row }">
            <span>{{ row.car_color == '' ? '/' : row.car_color }}</span>
          </template>
        </el-table-column>
        <el-table-column label="车辆类型" align="center">
          <template slot-scope="{ row }">
            <span>{{ row.car_type == '' ? '/' : row.car_type }}</span>
          </template>
        </el-table-column>
        <el-table-column label="车架号" align="center">
          <template slot-scope="{ row }">
            <span>{{ row.vin_no == '' ? '/' : row.vin_no }}</span>
          </template>
        </el-table-column>
        <el-table-column label="车辆状态" align="center" min-width="50">
          <template slot-scope="{ row }">
            <el-tag
              :type="row.status | typeFilter"
              size="mini"
              effect="dark"
            >{{ row.status | statusFilter }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="绑定时间"
          align="center"
          sortable
          prop="create_time"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="{ row }">
            <span>{{ row.create_time }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="{ row }">
            <div class="we_flex we_column">
              <el-button
                :type="row.status == 1 ? 'danger' : 'success'"
                class="we_marginT we_marginL_"
                size="mini"
                @click="handleModifyStatus(row.id, row.status,row.user_id)"
              >{{ row.status == 1 ? '解绑' : '启用' }}</el-button>
              <el-button type="primary" size="mini" @click="handleEdit(row)">编辑</el-button>
            </div>
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
    <el-dialog title="修改车辆信息" :visible.sync="dialogFormVisible" center top="5vh" width="40%">
      <el-form :model="form" label-width="120px" ref="formName">
        <el-form-item label="车牌号:" prop="mobile">
          <el-input v-model="form.car_no" clearable placeholder="请输入车牌号" />
        </el-form-item>
        <el-form-item label="车架号:" prop="vip_time_out">
          <el-input v-model="form.vin_no" clearable placeholder="请输入车架号" />
        </el-form-item>
        <el-form-item label="车辆品牌:" prop="name">
          <el-input v-model="form.brand_name" clearable placeholder="请输入车辆品牌" />
        </el-form-item>
        <el-form-item label="车辆颜色:" prop="vip_time_out">
          <el-input v-model="form.car_color" clearable placeholder="请输入车辆颜色" />
        </el-form-item>
        <el-form-item label="车辆类型:" prop="vip_time_out">
          <el-input v-model="form.car_type" clearable placeholder="请输入车辆类型" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitData()">立即提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getCarList, setCarStatus, editCar, delCar } from '@/api/car'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
export default {
  name: 'UserList',
  components: {
    Pagination
  },
  directives: {
    waves
  },
  filters: {
    // 状态过滤   <!-- 用户状态 1 启用 2 冻结 3 注销 -->
    statusFilter(status) {
      const statusMap = {
        1: '启用',
        2: '解绑'
      }
      return statusMap[status]
    },
    // 性别过滤 1 男 2 女 3 未知
    sexFilter(status) {
      const statusMap = {
        1: '男',
        2: '女',
        0: '未知'
      }
      return statusMap[status]
    },
    // 状态类型过滤
    typeFilter(status) {
      const statusMap = {
        1: 'success',
        2: 'danger',
        3: 'warning '
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      form: {},
      total: 0,
      status: '全部',
      listLoading: true,
      disabled: 'false',
      type: '',
      downloadLoading: false,
      scoreList: null,
      filename: '',
      autoWidth: true,
      bookType: 'xlsx',
      listQuery: {
        page: 1,
        pageSize: 10,
        is_vip: 2,
        status: '',
        userinfo: '',
        querydate: ''
      },
      // 图片查看器变量
      showViewer: false,
      showReviewer: false,
      selectLoading: false,
      dialogFormVisible: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    // 清空
    handleNull() {
      ;(this.listQuery = {
        page: 1,
        pageSize: 10,
        userinfo: '',
        status: '',
        querydate: ''
      }),
        this.getList()
    },
    radioButtton(value, text) {
      this.getList()
    },
    onPreview: function() {
      this.showViewer = true
    },
    // 提交修改信息
    submitData() {
      editCar(this.form).then(response => {
        this.dialogFormVisible = false
        this.$notify({
          title: 'Success',
          message: '添加成功',
          type: 'success',
          duration: 2000
        })
        this.getList()
        return
      })
    },

    // 获取列表
    getList() {
      this.listLoading = true
      getCarList(this.listQuery).then(response => {
        this.listLoading = false
        this.list = response.data.result
        this.total = response.data.pageInfo.total
      })
    },
    // 搜索
    handleFilter() {
      this.getList()
    },
    //修改用户信息
    handleEdit(row) {
      this.form = JSON.parse(JSON.stringify(row))
      this.form.vip_time_out = parseTime(this.form.vip_time_out * 1000)
      this.dialogFormVisible = true
    },
    //修改车辆状态
    handleModifyStatus(id, status, user_id) {
      const userstatus = status == 1 ? 2 : 1
      const data = { status: userstatus, id: id, user_id: user_id }
      setCarStatus(data).then(() => {
        this.$notify({
          title: 'Success',
          message: '操作成功',
          type: 'success',
          duration: 2000
        })
        this.getList()
      })
    },
    // 筛选状态
    selectStatus(status) {
      this.getList()
    },
    // 审核任务
    handleUpdate(row) {
      this.$notify({
        title: 'Success',
        message: '操作成功',
        type: 'success',
        duration: 2000
      })
    }
  }
}
</script>
<style scoped>
.row_flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.demonstration {
  display: inline-block;
  margin: 0 10px;
  font-size: 12px;
  font-weight: 600;
  color: #606266;
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
.filter-item {
  width: 200px;
}
.starh_button {
  margin-left: 20px;
}
</style>
