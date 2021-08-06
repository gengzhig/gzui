<!--
 * @Author: gz
 * @Date: 2021-08-03 09:35:42
 * @LastEditors: gz
 * @LastEditTime: 2021-08-04 10:25:56
 * @Description: file content
 * @FilePath: \gi-ui\src\libs\gz-ui\components\Table\index.vue
-->
<template>
  <div class="gz-table" style="">
    <!-- 表头 -->
    <div class="div_thead" style="padding-right: 17px">
      <table border="" class="div-table" cellspacing="" cellpadding="">
        <colgroup>
          <col style="width: 100px" />
          <col style="width: 300px" />
          <col style="width: 300px" />
          <col style="width: 300px" />
          <col style="width: 300px" />
          <col style="width: 300px" />
          <col style="width: 300px" />
        </colgroup>
        <thead>
          <tr
            style="
              height: 48px;
              line-height: 48px;
              background-color: rgb(255, 124, 64);
            "
          >
            <th style="">序号</th>
            <th style="">书名</th>
            <th style="">作者</th>
            <th style="">书名</th>
            <th style="">作者</th>
            <th style="">书名</th>
            <th style="">操作</th>
          </tr>
        </thead>
      </table>
    </div>
    <!-- 主体 -->
    <div class="div_tbody" style="max-height: 200px; overflow: auto">
      <table border="" cellspacing="" cellpadding="" class="div-table">
        <colgroup>
          <col style="width: 100px" />
          <col style="width: 300px" />
          <col style="width: 300px" />
          <col style="width: 300px" />
          <col style="width: 300px" />
          <col style="width: 300px" />
          <col style="width: 300px" />
        </colgroup>
        <tbody>
          <tr>
            <td>1</td>
            <td>java</td>
            <td>李刚</td>
            <td>java</td>
            <td>李刚</td>
            <td>java</td>
            <td>
              <button>编辑</button>
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>js</td>
            <td>大神</td>
            <td>js</td>
            <td>大神</td>
            <td>js</td>
            <td>
              <button>编辑</button>
            </td>
          </tr>
          <tr>
            <td>3</td>
            <td>html</td>
            <td>大神</td>
            <td>html</td>
            <td>大神</td>
            <td>html</td>
            <td>
              <button>编辑</button>
            </td>
          </tr>
          <tr>
            <td>4</td>
            <td>css</td>
            <td>李刚</td>
            <td>css</td>
            <td>李刚</td>
            <td>css</td>
            <td>
              <button>编辑</button>
            </td>
          </tr>
          <tr>
            <td>5</td>
            <td>ts</td>
            <td>大神</td>
            <td>ts</td>
            <td>大神</td>
            <td>ts</td>
            <td>
              <button>编辑</button>
            </td>
          </tr>
          <tr>
            <td>6</td>
            <td>vue</td>
            <td>大神</td>
            <td>vue</td>
            <td>大神</td>
            <td>vue</td>
            <td>
              <button>编辑</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- 底部合计 -->
    <div class="div_footer" style="display: none">
      <table border="" cellspacing="" cellpadding="" class="div-table">
        <colgroup>
          <col style="width: 100px" />
          <col style="width: 300px" />
          <col style="width: 300px" />
          <col style="width: 300px" />
          <col style="width: 300px" />
          <col style="width: 300px" />
          <col style="width: 300px" />
        </colgroup>
        <tfoot>
          <tr
            style="height: 48px; line-height: 48px; background-color: #f1f1f1"
          >
            <td>合计</td>
            <td>4</td>
            <td>4</td>
            <td>4</td>
            <td>4</td>
            <td>4</td>
            <td>4</td>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "gzTable",
  setup() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.gz-table {
  col {
    display: table-column;
  }
  .div_thead {
    color: #909399;
    .div-table {
      width: 100%;
      text-align: center;
      border: 1px solid #e6e6e6;
      border-collapse: collapse;
    }
  }
  .div_tbody {
    width: 100%;
    // height: 500px;
    .div-table {
      width: 100%;
      text-align: center;
      border: 1px solid #e6e6e6;
      border-collapse: collapse;
      tbody {
        tr {
          td {
            color: #606266;
            height: 48px;
            text-align: center;
          }
          &:nth-child(even) {
            background-color: #fafafa;
          }
          &:nth-child(odd) {
            background-color: #fff;
          }
          &:hover {
            background-color: #f5f7fa;
          }
        }
      }
    }
  }
  .div_footer {
    .div-table {
      width: 100%;
      text-align: center;
      border: 1px solid #e6e6e6;
      border-collapse: collapse;
    }
  }
}
</style>
