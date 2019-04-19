<template>
  <div class="g-breadcrumb-com">
    <div class="breadcrumb-con">
      <ul>
        <li @click="sendMsgToParents(-1)">
          <span :class="{'active':show}">{{firstItemName}}</span>
          <span v-show="show">/</span>
        </li>
        <li v-for="(item,index) in name" :key="index" @click="sendMsgToParents(index)">
          <span :class="{'active':(index < name.length-1)}">{{item.name}}</span>
          <span v-show="index < name.length-1">/</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Breadcrumb',
  props: {
    name: { type: Array, default: () => {
      return []
    } },
    firstItemName: { type: String, default: null }
  },
  data () {
    return {}
  },
  methods: {
    sendMsgToParents (index) {
      if (index < this.name.length - 1) {
        this.$emit('getIndex', index)
      }
    }
  },
  computed: {
    show () {
      return this.name.length
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.g-breadcrumb-com {
  margin: 10px 0;
  .breadcrumb-con {
    height: 30px;
    line-height: 30px;
    font-size: 12px;
    background: #f5f5f5;
    padding-left: 10px;
    border-left: 10px solid #51B6EE;
    ul {
      list-style: none;
      li {
        float: left;
        cursor: pointer;
        color: #666;
        span {
          padding: 0 3px;
        }
        .active {
          color: #5BB8EA;
        }
      }
    }
  }
}
</style>
