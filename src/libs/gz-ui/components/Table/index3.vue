<!--
 * @Author: your name
 * @Date: 2020-08-25 21:56:18
 * @LastEditTime: 2021-01-22 17:39:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \郑大管理端\src\components\table\commonTable.vue
-->
<template>
  <div class="common-table">
    <!--新增区域 可选-->
    <div class="newArea" v-if="config.newBuildButton">
      <el-button type="primary" @click="newBuild" v-if="config.newBuildButton">新建</el-button>
      <slot name="headerButton"></slot>
    </div>
    <!--表格区域-->
    <div v-loading="config.loading" class="table-wrapper">
      <el-table
        border
        stripe
        header-cell-class-name="grey-background"
        style="width: 100%"
        :ref="config.ref ? config.ref : 'elTab'"
        :key="config.tabKey"
        :data="config.tableData"
        :header-cell-style="{ background: '#F7F8FC', color: '#333' }"
        :height="config.height"
        :max-height="config.maxHeight"
        :default-sort="{
          prop: config.defaultSort ? config.defaultSort.sidx : '',
          order: config.defaultSort ? (config.defaultSort.order == 'ASC' ? 'ascending' : 'descending') : ''
        }"
        :highlight-current-row="highlightRow"
        :row-key="config.rowKey || 'ddddd'"
        :summary-method="getSummaries"
        :show-summary="config.summary"
        @current-change="handleCurrentChange"
        @sort-change="changeTableSort"
        @selection-change="handleSelectionChange"
      >
        <div v-for="(tItem, tIndex) in config.tableHeaders" :key="tIndex">
          <!--详情下拉-->
          <el-table-column v-if="tItem.type === 'expand'" type="expand" :formatter="tItem.formatter" fixed :width="tItem.width">
            <template slot-scope="props">
              <el-form label-position="right" class="demo-table-expand table-expand-form">
                <template v-for="(gbItem, gbIndex) in config.tableHeaders">
                  <el-form-item
                    v-if="gbItem.isExpand"
                    :key="gbItem + gbIndex"
                    :label="gbItem.label + ':'"
                    :label-width="config.expandLabelWidth + 'px'"
                    class="table-expand-form-item"
                  >
                    <span v-if="gbItem.formatter" v-html="gbItem.formatter(props.row[gbItem.prop], props.row, props.$index)"> </span>
                    <span v-if="!gbItem.formatter" :title="props.row[gbItem.prop]">
                      {{
                        props.row[gbItem.prop] !== "" && props.row[gbItem.prop] !== undefined && props.row[gbItem.prop] !== null
                          ? props.row[gbItem.prop]
                          : "-"
                      }}
                    </span>
                  </el-form-item>
                </template>
              </el-form>
            </template>
          </el-table-column>
          <!--复选框-->
          <el-table-column
            v-if="tItem.type === 'checkbox'"
            type="selection"
            fixed
            :width="tItem.width || 50"
            align="center"
            :reserve-selection="true"
            :selectable="config.selectable"
          />
          <!--序号-->
          <el-table-column
            v-else-if="tItem.type === 'index'"
            :type="tItem.type"
            fixed
            :width="tItem.width"
            :label="tItem.label"
            :index="indexMethod"
            tooltip-effect="light"
            align="center"
          />
          <!--基本列-->
          <el-table-column
            v-else-if="tItem.isShow"
            :fixed="tItem.fixed"
            :formatter="tItem.formatter"
            :sortable="tItem.sortable"
            :prop="tItem.prop"
            :label="tItem.label"
            :width="tItem.width"
            :min-width="tItem.minWidth"
            :show-overflow-tooltip="tItem.overflowHide"
            placement="bottom"
            :filters="tItem.filters"
            :filter-method="tItem.filterHandler"
            :align="tItem.align ? tItem.align : 'center'"
          >
            <template slot-scope="scope">
              <slot v-if="tItem.template" :name="tItem.template" :index="scope.$index" :rowData="scope.row"></slot>
              <div v-else>
                <span v-if="tItem.formatter" v-html="tItem.formatter(scope.row[tItem.prop], scope.row, scope.$index)"> </span>
                <span v-if="!tItem.formatter" :title="scope.row[tItem.prop]" class="table-content">{{
                  scope.row[tItem.prop] !== "" && scope.row[tItem.prop] !== undefined && scope.row[tItem.prop] !== null ? scope.row[tItem.prop] : "-"
                }}</span>
              </div>
            </template>
          </el-table-column>
        </div>
      </el-table>
      <!--分页器区域-->
      <div class="pagingBox">
        <div v-if="config.total > 0" class="bathBtnBox">
          <!-- 基础 - 批量操作 - 只返回勾选数据（回调batchOperation） -->
          <el-button :type="(batchOperate.base && batchOperate.base.type) || 'primary'" v-if="batchOperate && batchOperate.base" @click="batchInfo">
            {{ batchOperate.base.buttonName }}
          </el-button>
          <!-- 删除（回调batchOperation） -->
          <el-button
            :type="(batchOperate.delete && batchOperate.delete.type) || 'danger'"
            v-if="batchOperate && batchOperate.delete"
            @click="batchDelete(batchOperate.delete)"
          >
            {{ batchOperate.delete.buttonName || "批量删除" }}
          </el-button>
          <!-- 打印 （回调batchPrint）-->
          <el-button type="primary" v-if="batchOperate && batchOperate.print" @click="batchPrint(batchOperate.print)">
            {{ batchOperate.print.buttonName }}
          </el-button>
          <!-- 导出 -->
          <el-button type="primary" v-if="batchOperate && batchOperate.export" @click="batchExport(batchOperate.export)">
            {{ batchOperate.export.buttonName }}
          </el-button>
        </div>
        <template v-if="pagination">
          <pagination
            v-show="config.total > 0"
            :total="config.total"
            :page.sync="config.listQuery.page"
            :limit.sync="config.listQuery.limit"
            :background="false"
            @pagination="getData"
          />
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import pagination from "@/components/Pagination";
import { parseTime } from "@/utils";
import projuctConfig from "@/assets/js/config";
import request from "@/utils/request";
import { clearRightsCache } from "@/api/user";
import qs from "qs";
export default {
  components: {
    pagination
  },
  props: {
    config: {
      type: Object,
      default: () => {}
    },
    batchOperate: {
      type: Object,
      default: () => {}
    },
    pagination: {
      type: Boolean,
      default: true
    },
    highlightRow: {
      type: Boolean,
      default: false
    },
    highLightFirstRow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      sumData: [],
      projuctConfig: {},
      headers: {
        Authorization: ""
      },
      allSelect: []
    };
  },
  watch: {
    "config.tableData": {
      handler(v) {
        // 高亮表格第一行
        if (this.highLightFirstRow) {
          this.$nextTick(() => {
            this.$refs.elTab.setCurrentRow(v[0]);
          });
        }
      },
      deep: true
    },
    "config.summaryData": {
      handler(value) {
        this.formatterSummaryData(this.config.tableHeaders, value);
      },
      deep: true
    }
  },
  // 解决表格左下角单元格偶尔多一条横线
  activated() {
    this.config.tabKey = new Date().getMilliseconds();
  },
  created() {
    this.projuctConfig = projuctConfig;
    this.headers.Authorization = this.cookies.get("zhengda-Token");
  },
  methods: {
    // 表格-新建按钮
    newBuild() {
      this.$emit("newBuild");
    },
    // 表格排序
    changeTableSort(v) {
      v.order = v.order == "ascending" ? "ASC" : "DESC";
      this.config.defaultSort.sidx = v.prop;
      this.config.defaultSort.order = v.order;
      this.$emit("sortChange", {
        order: v.order,
        prop: v.prop
      });
    },
    // 清除表格全部勾选
    clearSelection() {
      this.$refs[this.config.ref || "elTab"].clearSelection();
    },
    formatterSummaryData(headers, sumData) {
      let sum = [];
      // 过滤掉isShow为false的列
      let filterHeaders = headers.filter(h => h.isShow || h.type == "index" || h.type == "expand" || h.type == "checkbox");
      for (let i = 0; i < filterHeaders.length; i++) {
        if (["index", "checkbox", "expand"].includes(filterHeaders[i].type)) {
          if (filterHeaders[i].summary) {
            sum.push("合计");
          }
        } else {
          sum.push("");
          for (let j = 0; j < Object.keys(sumData).length; j++) {
            if ((filterHeaders[i].isShow && filterHeaders[i].prop) == Object.keys(sumData)[j]) {
              sum.splice(i, 1, Object.values(sumData)[j]);
            }
          }
        }
      }
      this.sumData = sum;
    },
    // 自定义合计行数据
    getSummaries(columns, data) {
      const sums = this.sumData;
      return sums;
    },
    // 表格勾选
    handleSelectionChange(v) {
      this.allSelect = JSON.parse(JSON.stringify(v));
      this.$emit("selectionChange", this.allSelect);
    },
    // 设置table可排序字段
    selectable(row, index) {
      this.$emit("selectable", row);
    },
    // 表格单选
    handleCurrentChange(v) {
      this.$emit("handleCurrentChange", v);
    },
    // 获取表格数据(核心方法)
    getData() {
      const filter = {
        page: this.config.listQuery ? this.config.listQuery.page : "",
        limit: this.config.listQuery ? this.config.listQuery.limit : ""
      };
      this.$emit("getList", filter);
    },
    // 基础-批量导出
    batchInfo() {
      if (this.allSelect && this.allSelect.length === 0) {
        this.$message({
          message: `请先勾选数据！`,
          type: "warning"
        });
      } else {
        this.$emit("batchOperation", this.allSelect);
      }
    },
    // 批量删除
    batchDelete() {
      if (this.allSelect && this.allSelect.length === 0) {
        this.$message({
          message: `请勾选要批量删除的数据！`,
          type: "warning"
        });
      } else {
        this.$confirm(`此操作将永久删除选择数据, 是否继续?`, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$emit("batchOperation", this.allSelect);
            this.clearSelection();
          })
          .catch(() => {});
      }
    },
    // 批量导出
    batchExport(query) {
      this.$store.dispatch("app/setLayoutLoading", {
        text: "数据导出中..."
      });
      request({
        url: query.url,
        method: "post",
        data: query.FormData ? qs.stringify(query.param) : query.param,
        headers: {
          "Content-Type": query.FormData ? "application/x-www-form-urlencoded;charset=UTF-8" : "application/json;charset=UTF-8"
        },
        responseType: "blob"
      })
        .then(res => {
          this.$store.dispatch("app/clearLayoutLoading");
          this.$tool.exportData({ data: res, name: query.excelName });
        })
        .catch(() => {});
    },
    // 批量打印
    batchPrint(query) {
      if (this.allSelect && this.allSelect.length === 0) {
        this.$message({
          message: `请勾选要打印的数据！`,
          type: "warning"
        });
      } else {
        // 传url和param时返回接口调用结果,没传时返回勾选数据
        if (query.url && query.param) {
          request({
            url: query.url,
            method: "post",
            data: query.param
          })
            .then(res => {
              this.$emit("batchPrint", res);
            })
            .catch(() => {});
        } else {
          this.$emit("batchOperation", this.allSelect);
        }
      }
    },
    formatJson(filterVal) {
      return this.config.tableData.map(v =>
        filterVal.map(j => {
          if (j === "timestamp") {
            return parseTime(v[j]);
          } else {
            return v[j];
          }
        })
      );
    },
    indexMethod(index) {
      return this.config.listQuery ? (this.config.listQuery.page - 1) * this.config.listQuery.limit + index + 1 : index + 1;
    },
    // 表格复选框默认勾选
    toggleRowSelectionFun(rows, type) {
      rows.forEach(row => {
        this.$refs[this.config.ref].toggleRowSelection(row, type);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.common-table {
  .newArea {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    background: #f6f7fc;
  }

  .table-wrapper {
    .pagingBox {
      margin-top: 10px;
      display: flex;
      justify-content: space-between;
    }
  }
}

::v-deep .el-table thead {
  color: #333 !important;
}

//强制不换行，超出部分隐藏且以省略号形式出现
::v-deep .table-content {
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
<style>
.el-table .el-table__fixed-right {
  height: 100% !important;
}
</style>
<style lang="scss">
.table-expand-form {
  display: flex;
  flex-wrap: wrap;

  .table-expand-form-item {
    width: 30%;
    margin-right: 5%;

    &:nth-child(3n) {
      margin-right: 0;
    }

    .el-form-item__content {
      span {
        display: block;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}

.el-table__expanded-cell {
  background-color: #f5f7fa !important;

  &:hover {
    background-color: #f5f7fa !important;
  }
}
</style>
