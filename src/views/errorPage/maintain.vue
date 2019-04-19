<template>
 <div class="g-maintain">
   <div class="content">
      <img width="193" class="logo"  style="vertical-align: middle" src="../../assets/logo.png" alt="logo" v-once>
      <div class="title">维护中...</div>
      <div class="tipMessage">
        <p class="message-title">Sorry!</p>
        <p>由于系统正在维护，您所尝试的网页无法打开。非常抱歉给您带来的不便。</p>
        <p>维护时间：{{adminMaintain.start}} 至 {{adminMaintain.end}}</p>
        <p>We're down for scheduled maintenance.Sorry for the inconvenience.</p>
        <p>We'll be back shortly.</p>
        <p>Maintenance Time:{{adminMaintain.start}} - {{adminMaintain.end}}</p>
      </div>
   </div>
  <div class="customer-service">
    如有任何疑问，请联系在线客服
    <button class="ban-service">在线客服</button>
  </div>
 </div>
</template>
<script>
export default {
  data () {
    return {

    }
  },
  created () {
    this.maintainInfo()
  },
  methods: {
    async maintainInfo () {
      await this.$store.dispatch('GetMaintain')
      if (this.adminMaintain.type === 2) {
      // 维护结束离开维护页
        this.$router.push('/')
      }
    }
  },
  computed: {
    adminMaintain () {
      return this.$store.getters.adminMaintain
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
  .g-maintain{
    width: 100%;
    height: 100%;
    background-image: url('/static/images/underMaintenance.jpg');
    background-size: 100% 100%;
  .content{
    max-width: 1200px;
    height: 100%;
    width: 100%;
    margin: auto;
    .logo{
      margin: 20px;
    }
    .title{
      font-size: 80px;
      color: #C5A864;
      text-align: center;
      font-weight: 100;
      line-height: 80px;
    }
    .tipMessage{
      // back
      margin-top: 50px;
      padding: 18px 200px;
      border-top: 1px solid;
      border-bottom:1px solid;
      border-image: linear-gradient(to left, #000 0%, #C5A864 50%, #000 100%)1 1;
      // background-image: url('/static/images/line.png');
      // background-size: 100% 100%;
      width: 100%;
      height: auto;
      color: #D0D0D0;
      .message-title{
        font-size: 28px;
        line-height: 40px;
        color: #D0D0D0;
      }
      >p{
        font-size: 16px;
        line-height: 24px;
      }
    }
  }
  .customer-service{
    color: #C5A864;
    width: 100%;
    position: absolute;
    bottom: 60px;
    text-align: center;
    font-size: 18px;
    .ban-service{
      display: inline-block;
      color:#D0D0D0;
      background: #830115;
      border-radius: 5px;
      padding: 5px 10px;
      border: 0px;
      outline:none;
      &:hover,&:focus,&:active{
        border: 0px;
        background: #830115;
        color: white;
      }
    }
  }
}

</style>
