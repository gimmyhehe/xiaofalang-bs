<template>
  <div class="u-date-picker">
    <el-date-picker
      :class="`type-${type}`"
      v-model="value"
      :type="type"
      :format="format"
      :range-separator="$t('to')"
      :start-placeholder="$t('startTime')"
      :end-placeholder="$t('endTime')"
      :default-time="['00:00:00', '23:59:59']"
      :value-format="valueformat"
      :picker-options="pickerOptions"
      unlink-panels
      time-arrow-control
      @change="update">
    </el-date-picker>
  </div>
</template>
<script>
import { dateTimePicker } from '@/utils/tools'
export default {
  name: 'DateTimePicker',
  props: {
    dataTime: {
      type: Array
    },
    format: {
      type: String,
      default: 'yyyy-MM-dd HH:mm:ss'
    },
    valueformat: {
      type: String,
      default: 'yyyy-MM-dd HH:mm:ss'
    },
    type: {
      type: String,
      default: 'daterange'
    }
  },
  computed: {
    pickerType () {
      if (this.valueformat !== 'timestamp') {
        return (this.valueformat.replace(/m+/g, '{i}').replace(/y+/gi, '{y}').replace(/M+/g, '{m}').replace(/d+/gi, '{d}').replace(/h+/ig, '{h}').replace(/s+/ig, '{s}'))
      } else {
        return 'timestamp'
      }
    }
  },
  data () {
    return {
      value: this.dataTime,
      // 以本月周一开始计算的字符串格式
      pickerOptions: {
        // 更改当前绑定值来快捷选择时间
        shortcuts: [
          {
            text: this.$t('timePickerOptions.today'),
            onClick: () => {
              this.value = dateTimePicker.getDateRange(`today`, this.pickerType)
              // 关闭弹窗，当前触发的dom的子组件更改对象
              this.$children[0].pickerVisible = this.$children[0].picker.visible = false
            }
          }, {
            text: this.$t('timePickerOptions.threeDays'),
            onClick: () => {
              this.value = dateTimePicker.getDateRange(`yesterday`, this.pickerType)
              this.$children[0].pickerVisible = this.$children[0].picker.visible = false
            }
          },
          {
            text: '近七天',
            onClick: () => {
              this.value = dateTimePicker.getDateRange(`currentWeek`, this.pickerType)
              this.$children[0].pickerVisible = this.$children[0].picker.visible = false
            }
          },
          {
            text: '上周',
            onClick: () => {
              this.value = dateTimePicker.getDateRange(`cycleLastWeek`, this.pickerType)
              this.$children[0].pickerVisible = this.$children[0].picker.visible = false
            }
          },
          {
            text: '本周',
            onClick: () => {
              this.value = dateTimePicker.getDateRange(`cycleWeek`, this.pickerType)
              this.$children[0].pickerVisible = this.$children[0].picker.visible = false
            }
          },
          {
            text: '近一月',
            onClick: () => {
              this.value = dateTimePicker.getDateRange(`currentMonth`, this.pickerType)
              this.$children[0].pickerVisible = this.$children[0].picker.visible = false
            }
          },
          {
            text: '上月',
            onClick: () => {
              this.value = dateTimePicker.getDateRange(`cycleLastMonth`, this.pickerType)
              this.$children[0].pickerVisible = this.$children[0].picker.visible = false
            }
          },
          {
            text: '本月',
            onClick: () => {
              this.value = dateTimePicker.getDateRange(`cycleMonth`, this.pickerType)
              this.$children[0].pickerVisible = this.$children[0].picker.visible = false
            }
          },
          {
            text: this.$t('timePickerOptions.all'),
            onClick: () => {
              this.value = null
              // 当前dom的子组件
              this.$children[0].pickerVisible = this.$children[0].picker.visible = false
            }
          }]
      }
    }
  },
  methods: {
    // 子组件触发父组件的值更新
    update (timeDate) {
      this.$emit('update:dataTime', timeDate)
    }
  },
  watch: {
    // 父组件的值能够更新子组件的绑定值
    dataTime (val) {
      if (!this.dataTime) {
        this.value = null
      } else if (Array.isArray(this.dataTime)) {
        this.value = this.dataTime
      }
    }
  }
}
</script>

<style lang="scss">
.u-date-picker{
  .el-date-editor{
    &.el-input, &.el-input__inner {
      width: auto;
    }
    .el-range-separator {
       width: auto;
       padding: 0 2px;
    }
    .el-range-input {
        width: 120px;
    }
    .el-range__icon{
      line-height: normal;
      font-size: 12px;
      width: auto;
    }
    &.type-daterange{
      .el-range-input {
        width: 80px;
      }
    }
    .el-range__close-icon{
      width: 15px;
    }
  }
}
</style>
