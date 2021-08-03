<!--
 * @Author: gz
 * @Date: 2021-08-03 09:35:42
 * @LastEditors: gz
 * @LastEditTime: 2021-08-03 13:37:52
 * @Description: file content
 * @FilePath: \gi-ui\src\libs\gz-ui\components\Table\index.vue
-->
<template>
  <div class="gz-table">
    <div class="div_thead" style="padding-right: 17px">
      <table border="" class="div-table" cellspacing="" cellpadding="">
        <!-- 表头 -->
        <colgroup>
          <col style="width: 10%" />
          <col style="width: 30%" />
          <col style="width: 30%" />
          <col style="width: 30%" />
        </colgroup>
        <thead>
          <tr>
            <th style="">序号</th>
            <th style="">书名</th>
            <th style="">作者</th>
            <th style="">操作</th>
          </tr>
        </thead>
      </table>
    </div>
    <div class="div_tbody" style="height: 200px; overflow-y: auto">
      <table border="" cellspacing="" cellpadding="" class="div-table">
        <!-- 主体 -->
        <colgroup>
          <col style="width: 10%" />
          <col style="width: 30%" />
          <col style="width: 30%" />
          <col style="width: 30%" />
        </colgroup>
        <tbody>
          <tr>
            <td>1</td>
            <td>java</td>
            <td>李刚</td>
            <td>
              <button>编辑</button>
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>js</td>
            <td>大神</td>
            <td>
              <button>编辑</button>
            </td>
          </tr>
          <tr>
            <td>3</td>
            <td>html</td>
            <td>大神</td>
            <td>
              <button>编辑</button>
            </td>
          </tr>
          <tr>
            <td>4</td>
            <td>java</td>
            <td>李刚</td>
            <td>
              <button>编辑</button>
            </td>
          </tr>
          <tr>
            <td>5</td>
            <td>js</td>
            <td>大神</td>
            <td>
              <button>编辑</button>
            </td>
          </tr>
          <tr>
            <td>6</td>
            <td>html</td>
            <td>大神</td>
            <td>
              <button>编辑</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <table border="1">
      <!-- 底部合计 -->
      <tfoot>
        <tr>
          <td colspan="2">合计：</td>
        </tr>
      </tfoot>
    </table>
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
  .div_thead {
    .div-table {
      width: 100%;
      text-align: center;
      border: 1px solid #e6e6e6;
      border-collapse: collapse;
    }
  }
  .div_tbody {
    width: 100%;
    height: 500px;
    overflow-y: auto;
    .div-table {
      width: 100%;
      text-align: center;
      border: 1px solid #e6e6e6;
      border-collapse: collapse;
      // thead {
      //   background-color: rgb(255, 124, 64);
      //   height: 48px;
      //   color: #909399;
      // }
      // tbody {
      //   tr {
      //     td {
      //       color: #606266;
      //       height: 48px;
      //       text-align: center;
      //     }
      //     &:nth-child(even) {
      //       background-color: #fafafa;
      //     }
      //     &:nth-child(odd) {
      //       background-color: #fff;
      //     }
      //     &:hover {
      //       background-color: #f5f7fa;
      //     }
      //   }
      // }
      // tfoot {
      //   td {
      //     height: 48px;
      //   }
      // }
    }
  }
}
</style>
