<template>
  <div class="listWraper">
    <table>
      <colgroup>
        <col :style="[getColspanRealWidth(columns, column, index)]" v-for="(column, index) in trueColumns" :key="index">
      </colgroup>
      <thead>
        <tr>
          <th 
            :class="[getHeaderCellClass(columns, column), column.order ? column.order:'']" 
            v-for="(column, index) in trueColumns" 
            :key="index" 
            @click.stop="($event) => handleHeaderClick($event, column, index)"
          >
            <slot v-if="column.slots" :name="column.slots.title"></slot>
            <div class="cell" v-else>{{column.title}}<span v-if="column.sorter" class="caret-wrapper">
                <i class="sort-caret ascending" @click.stop="($event) => handleSortClick($event, column, index, 'ascending')"></i>
                <i class="sort-caret descending" @click.stop="($event) => handleSortClick($event, column, index, 'descending')"></i>
              </span>
            </div>
          </th>
        </tr>
      </thead>
      <tbody v-for="(value, index) in dataSource" :key="index">
        <tr>
          <td v-for="(column, index) in trueColumns" :key="index">
            <slot
              v-if="column.scopedSlots"
              :name="column.scopedSlots.customRender"
              :row="column.dataIndex ? value[column.dataIndex]:value"
              >
              {{value[column.dataIndex]}}
            </slot>
            <div v-else class="cell">{{value[column.dataIndex]}}</div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    columns: {
      type: Array,
      required: true
    },
    dataSource: {
      default: () => []
    }
  },
  data() {
    return {
      trueColumns: this.columns.map(value => {
        return {
          ...value,
          order: '',
          clickNum: 0
        }
      })
    };
  },
  methods: {
    getHeaderCellClass(columns, column) {
      const classes = [];

      if (column.sorter) {
        classes.push('is-sortable');
      }
      return classes.join(' ');
    },
    handleHeaderClick(event, column, index) {
      event.stopPropagation();
      const target = event.target;
      if (column.sorter) {
        this.handleSortClick(event, column, index)
      }
    },
    toggleOrder({ order, sortOrders }) {
      if (order === '') return sortOrders[0];
      const index = sortOrders.indexOf(order || null);
      return sortOrders[index > sortOrders.length - 2 ? 0 : index + 1];
    },
    handleSortClick(event, column, index, givenOrder) {
      // console.log(this.$parent)
      // console.log(column, index, this.trueColumns)
      this.handleColumnsOrder(index)
      // if (this.columns[index].sorter) {
      //   this.$set(this.columns[index], 'order', 'ascending')
      // }
    },
    handleSortClickT(event, column, givenOrder) {
      event.stopPropagation();
      let target = event.target;
      while (target && target.tagName !== 'TH') {
        target = target.parentNode;
      }
      console.log(target)
      const order = column.order === givenOrder
        ? null
        : (givenOrder || this.toggleOrder(column));
      if (target && target.tagName === 'TH') {
        console.log('th')
        // if (hasClass(target, 'noclick')) {
        //   removeClass(target, 'noclick');
        //   return;
        // }
      }
      if (!column.sorter) return;
      console.log(order);
      console.log('handleSortClick')
    },
    handleColumnsOrder(index) {
      this.trueColumns.forEach((value, iindex) => {
        if (index == iindex) {
          value.order=='' ? value.order = 'ascending' : value.order == 'ascending' ? value.order = 'descending' : value.order = 'ascending'
          const sorterFn = this.getSorterFn(value);
          if (sorterFn) {
            if (value.order === 'ascending') {
              this.dataSource.sort(value.sorter);
            } else if (value.order === 'descending') {
              this.reverse()
            }
          }
        } else {
          value.order = ''
        }
      })
    },
    reverse(){
      this.dataSource.reverse();
    },
    getColspanRealWidth(columns, colspan) {
      let style = {};
      if (colspan.width) {
        const width = colspan.width;
        style = {
          width: width.indexOf('%') ? width: width.indexOf('px') ? width:width+'px',
          minWidth: width.indexOf('%') ? width: width.indexOf('px') ? width:width+'px',
        }
      } else {
        style = {};
      }
      return style;
    },
    getSorterFn(state) {
      const { sorter: sorter } = state;
      if (typeof sorter !== 'function') {
        return
      }
      return true;
    }
  }
};
</script>

<style lang="scss">
@import './table.scss';

.ascending .sort-caret.ascending {
  border-bottom-color: #409eff;
}
.descending .sort-caret.descending {
  border-top-color: #409eff;
}
</style>