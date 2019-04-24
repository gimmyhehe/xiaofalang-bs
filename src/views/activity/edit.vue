<template>
  <div class="m-activity-edit g-container" v-loading.body="loading">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
      <!-- 活动名称 -->
      <el-form-item :label="$t('activity.name')" prop="name" >
          <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <!-- 活动简介 -->
      <el-form-item :label="$t('activity.intro')" prop="brief_introduction" >
          <el-input v-model="ruleForm.brief_introduction"></el-input>
      </el-form-item>
      <el-form-item label="排列顺序" prop="order" :rules="[{ required:true, trigger:'change' ,message:$t('required')}]">
        <el-input v-model="ruleForm.order" maxlength="4" @keyup.native="utils.onlyNumber(ruleForm,'order','int',$event)"></el-input>
        <span class="tips">在网页中的排列顺序,数值越小排得越靠前,允许同样的数字</span>
      </el-form-item>
      <!-- 状态 -->
      <el-form-item :label="$t('activity.state')" prop="states" class="no-mr-bottom" >
        <el-checkbox v-model="ruleForm.status" :true-label="1" :false-label="0" :title="$t('activity.startUsing')">{{$t('user.enable')}}</el-checkbox>
          <!-- <el-radio v-model="ruleForm.status" :label="1" >{{$t('activity.startUsing')}}</el-radio>
          <el-radio v-model="ruleForm.status" :label="0">{{$t('activity.blockUp')}}</el-radio> -->
      </el-form-item>
      <el-form-item :label="$t('activity.times')" prop="time_limit">
        <div class="timescope">
          <el-checkbox v-model="ruleForm.time_limit" :true-label="0" :false-label="1">{{$t('activity.unlimited')}}</el-checkbox>
        </div>
        <el-form-item prop="time" v-show="ruleForm.time_limit===1" :rules="[{ validator: verifyDate,trigger:'change' }]">
          <date-time-picker :dataTime.sync="time" format="yyyy-MM-dd" valueformat="yyyy-MM-dd" ></date-time-picker>
        </el-form-item>
      </el-form-item>
      <!-- 备注：新修改的活动时间 -->
      <!-- <el-form-item :label="$t('activity.times')" prop="time_limit" class="multi-line">
        <el-form-item prop="begin_date" :rules="[{required:true,message:'请选择活动开始日期',trigger:'change'}]">
          <el-date-picker v-model="ruleForm.begin_date"  type="date" placeholder="开始日期" format="yyyy-MM-dd" valueFormat="yyyy-MM-dd HH:mm:ss"></el-date-picker>
        </el-form-item>
        <span class="symbol">-</span>
        <el-form-item prop="end_date" :rules="[{ validator: verifyDate,trigger:'change'}]">
          <el-date-picker v-model="ruleForm.end_date"    type="date"  :disabled="!ruleForm.time_limit"   placeholder="结束日期" format="yyyy-MM-dd" valueFormat="yyyy-MM-dd HH:mm:ss" ></el-date-picker>
        </el-form-item>
        <el-checkbox v-model="ruleForm.time_limit" :true-label="0" :false-label="1" @change="(value)=>{!value?ruleForm.end_date='':false}">{{$t('activity.unlimited')}}</el-checkbox>
      </el-form-item> -->
      <!-- 优惠类型 -->
      <el-form-item  v-if="![7].includes(ruleForm.type)" :label="$t('activity.preferentialType')" prop="is_percent" class="no-mr-bottom" >
          <el-radio v-model="ruleForm.is_percent" :label="0">{{$t('yuan')}}</el-radio>
          <el-radio v-model="ruleForm.is_percent" :label="1">%</el-radio>
      </el-form-item>
      <!-- 活动类型 -->
      <div class="activitytype" >
        <el-form-item :label="$t('activity.type')" prop="type" >
          <el-select v-model="ruleForm.type" @change="resetRewards">
            <el-option v-for="(item,key) in typeList" :label="item" :value="Number(key)" :key="key"></el-option>
          </el-select>
          <el-button type="primary" class="functionality-btn" @click="addRewards('add',null)" v-show="isAddType">{{$t('add')}}</el-button>
          <el-form-item >
            <div class="area">
               <!-- 注册活动 -->
                <div v-if="ruleForm.type===1" class="area-register">
                  <el-form-item prop="rewards[0].amount"
                   :rules="[{ required: true, message:$t('required'), trigger: 'change' }]">
                    <span class="area-title">{{$t('activity.gift')}}</span>
                    <el-input v-model="ruleForm.rewards[0].amount" @keyup.native="utils.onlyNumber(ruleForm.rewards[0],'amount','float',$event)"></el-input>{{$t('yuan')}}
                  </el-form-item>
                </div>
                 <!-- 投注活动或亏损救援金 -->
                <div class="awardlist" v-else-if="[2,8].includes(ruleForm.type)">
                      <!-- 仅投注活动选择游戏大类 -->
                  <el-checkbox-group v-model="ruleForm.rewards.game_types">
                    <el-checkbox label="TotalNeed">{{$t(`auditPoints.colligate`)}}</el-checkbox>
                    <el-checkbox v-for="(item,key) in gameType" :key="key" :label="key">{{$t(`game.${key}`)}}</el-checkbox>
                  </el-checkbox-group>
                  <div  v-for="(item,index) in ruleForm.rewards.content" :key="index+`bet${ruleForm.type}`" class="hint">
                      {{ ruleForm.type===8? $t('activity.countProfitLose'): $t('activity.betFlowingWater') }}
                      <el-form-item :prop="`rewards.content[${index}].bet_min`"
                       :rules="[{ required: true, message: $t('required'), trigger: 'change' }]">
                       <el-input v-model="ruleForm.rewards.content[index].bet_min" @keyup.native="utils.onlyNumber(ruleForm.rewards.content[index],'bet_min','float',$event)"></el-input>
                      </el-form-item>
                      {{$t('to')}}
                      <el-form-item :prop="`rewards.content[${index}].bet_max`"
                       :rules="[{ required: true, message: $t('required'), trigger: 'change' }]">
                         <el-input v-model="ruleForm.rewards.content[index].bet_max" @keyup.native="utils.onlyNumber(ruleForm.rewards.content[index],'bet_max','float',$event)"></el-input>
                      </el-form-item>
                      {{$t('activity.gift')}}
                      <el-form-item :prop="`rewards.content[${index}].amount`"
                       :rules="[{ required: true, message: $t('required'), trigger: 'change' }]">
                       <el-input v-model="ruleForm.rewards.content[index].amount" @keyup.native="utils.onlyNumber(ruleForm.rewards.content[index],'amount','float',$event)"></el-input>{{units}}
                      </el-form-item>
                      <!-- <el-button type="text" @click="addRewards('add',null,2)">{{$t('add')}}</el-button> -->
                      <el-button type="text"  class="functionality-btn" @click="addRewards('remove',index)" >{{$t('delete')}}</el-button>
                  </div>
                </div>
                <!-- 签到活动 -->
                <div  class="awardlist" v-else-if="[6].includes(ruleForm.type)">
                  <div  v-for="(item,index) in ruleForm.rewards" :key="index+'a'"  class="hint">
                      {{$t('activity.continuousSignIn')}}
                      <el-form-item :prop="`rewards[${index}].days`"
                       :rules="[{ required: true, message: $t('required'), trigger: 'change' }]">
                        <el-input v-model="ruleForm.rewards[index].days" @keyup.native="utils.onlyNumber(ruleForm.rewards[index],'days','float',$event)"></el-input>
                      </el-form-item>
                      {{$t('activity.days')}}，
                      {{$t('activity.betFlowingWater')}}
                      <el-form-item :prop="`rewards[${index}].bet_min`"
                       :rules="[{ required: true, message: $t('required'), trigger: 'change' }]">
                       <el-input v-model="ruleForm.rewards[index].bet_min" @keyup.native="utils.onlyNumber(ruleForm.rewards[index],'bet_min','float',$event)"></el-input>
                      </el-form-item>
                      {{$t('to')}}
                      <el-form-item :prop="`rewards[${index}].bet_max`"
                       :rules="[{ required: true, message: $t('required'), trigger: 'change' }]">
                         <el-input v-model="ruleForm.rewards[index].bet_max" @keyup.native="utils.onlyNumber(ruleForm.rewards[index],'bet_max','float',$event)"></el-input>
                      </el-form-item>
                      {{$t('activity.gift')}}
                      <el-form-item :prop="`rewards[${index}].amount`"
                       :rules="[{ required: true, message: $t('required'), trigger: 'change' }]">
                       <el-input v-model="ruleForm.rewards[index].amount" @keyup.native="utils.onlyNumber(ruleForm.rewards[index],'amount','float',$event)"></el-input>{{$t('yuan')}}
                      </el-form-item>
                      <!-- <el-button type="text" @click="addRewards('add',null,2)">{{$t('add')}}</el-button> -->
                      <el-button type="text" class="functionality-btn"  @click="addRewards('remove',index)" >{{$t('delete')}}</el-button>
                  </div>
                </div>
                <div class="awardlist" v-else-if="[3,4,5].includes(ruleForm.type)">
                  <div v-for="(item,index) in ruleForm.rewards" :key="index+'b'"  class="hint">
                    {{$t('activity.charge')}}
                    <el-form-item :prop="`rewards[${index}].charge_min`"
                      :rules="[{ required: true, message: $t('required'), trigger: 'change' }]">
                      <el-input v-model="ruleForm.rewards[index].charge_min" @keyup.native="utils.onlyNumber(ruleForm.rewards[index],'charge_min','float',$event)"></el-input>
                    </el-form-item>
                    {{$t('to')}}
                    <el-form-item :prop="`rewards[${index}].charge_max`"
                      :rules="[{ required: true, message: $t('required'), trigger: 'change' }]">
                      <el-input v-model="ruleForm.rewards[index].charge_max" @keyup.native="utils.onlyNumber(ruleForm.rewards[index],'charge_max','float',$event)"></el-input>
                    </el-form-item>
                    {{$t('activity.gift')}}
                    <el-form-item :prop="`rewards[${index}].amount`"
                      :rules="[{ required: true, message: $t('required'), trigger: 'change' }]">
                      <el-input v-model="ruleForm.rewards[index].amount" @keyup.native="utils.onlyNumber(ruleForm.rewards[index],'amount','float',$event)"></el-input>{{units}}
                    </el-form-item>
                    <!-- <el-button type="text"  @click="addRewards('add',null,3)">{{$t('add')}}</el-button> -->
                    <el-button type="text" class="functionality-btn"  @click="addRewards('remove',index)" >{{$t('delete')}}</el-button>
                  </div>
                </div>
            </div>
          </el-form-item>
        </el-form-item>
      </div>
      <!-- 统计周期 -->
      <!-- <div> -->
        <el-form-item :label="$t('activity.statisticsCycle')" class="no-mr-bottom" v-if="[2].includes(ruleForm.type)&&![7].includes(ruleForm.type)">
          <el-cascader
            expand-trigger="hover"
            :options="options"
            v-model="calculateTime"
          >
        </el-cascader>
        <span v-show="[4].includes(calculateTime[0])" class="tips">{{$t('activity.statisticsCycleWarn')}}</span>
        </el-form-item>
      <!-- </div> -->
      <!-- 稽核点设置，常态流水 -->
      <el-form-item  v-if="![7].includes(ruleForm.type)" :label="$t('activity.auditPoint')" class="no-mr-bottom" >
            <el-form-item  prop="total_need">
              <el-input class="gameaudit" v-model="ruleForm.total_need" @keyup.native="utils.onlyNumber(null,null,'float',$event)">
                <template slot="prepend">{{$t('auditPoints.colligate')}}</template>
                <template slot="append">{{$t('mulriple')}}</template>
              </el-input>
            </el-form-item>
            <el-form-item   v-for="(item,key) in gameType" :prop="item.lowercase_underline" :key="item.lowercase_underline">
              <el-input class="gameaudit" v-model="ruleForm[item.lowercase_underline]" @keyup.native="utils.onlyNumber(null,null,'float',$event)">
                <template slot="prepend">{{$t(`game.${item.lowercase_underline}`)}}</template>
                <template slot="append">{{$t('mulriple')}}</template>
              </el-input>
            </el-form-item>
      </el-form-item>
      <!-- 最大派发笔数 -->
      <el-form-item  v-if="![7].includes(ruleForm.type)" :label="$t('activity.strokeCount')" prop="max_transaction" >
          <el-input v-model="ruleForm.max_transaction" @keyup.native="utils.onlyNumber(null,null,'float',$event)"></el-input>
      </el-form-item>
      <!-- 最大派发金额 -->
      <el-form-item  v-if="![7].includes(ruleForm.type)" :label="$t('activity.money')" prop="max_total_bonus" >
          <el-input v-model="ruleForm.max_total_bonus" @keyup.native="utils.onlyNumber(null,null,'float',$event)"></el-input>
      </el-form-item>
      <!-- 参加方式 -->
      <el-form-item  v-if="![7].includes(ruleForm.type)" :label="$t('activity.join')" prop="participate_type" class="no-mr-bottom" >
        <el-radio v-model="ruleForm.participate_type" :label="1">{{$t('activity.selfMotionJoinManner')}}</el-radio>
        <el-radio v-model="ruleForm.participate_type" :label="2">{{$t('activity.manualOperationJoinManner')}}</el-radio>
      </el-form-item>
      <!-- 领取方式 -->
      <el-form-item  v-if="![7].includes(ruleForm.type)" :label="$t('activity.draw')" prop="award_type" class="no-mr-bottom">
        <el-radio v-model="ruleForm.award_type" :label="2">{{$t('activity.getMannerByOneself')}}</el-radio>
        <el-radio v-model="ruleForm.award_type" :label="1">{{$t('activity.getMannerServiceGetManner')}}</el-radio>
      </el-form-item>
      <!-- 需要审核 -->
      <el-form-item  v-if="![7].includes(ruleForm.type)" :label="$t('activity.audit')" prop="need_audit" class="no-mr-bottom" >
        <el-checkbox v-model="ruleForm.need_audit" :true-label="1" :false-label="0"></el-checkbox>
        <!-- <el-radio v-model="ruleForm.need_audit" :label="1">{{$t('activity.needAuditYes')}}</el-radio>
        <el-radio v-model="ruleForm.need_audit" :label="0">{{$t('activity.needAuditNo')}}</el-radio> -->
      </el-form-item>
      <!-- 活动版本 -->
      <!-- <div> -->
        <el-form-item :label="$t('activity.versions')"  prop="version" class="no-mr-bottom">
          <el-col :span="4">
            <el-select v-model="ruleForm.version">
              <el-option v-for="(item,key) in versionList" :label="item" :value="Number(key)" :key="key"></el-option>
            </el-select>
          </el-col>
        </el-form-item>
      <!-- </div> -->
      <!-- 条件内容 -->
      <el-form-item  v-if="![7].includes(ruleForm.type)" :label="$t('activity.condition')" >
        <div class="condition condition-premise">
          <el-checkbox-group v-model="cities">
            <el-checkbox :label="103" >{{$t('activity.thatVeryDayRegister')}}</el-checkbox>
            <el-checkbox :label="104" >{{$t('activity.bindingBank')}}</el-checkbox>
            <el-checkbox :label="105" >{{$t('activity.noBlackBank')}}</el-checkbox>
            <el-checkbox :label="106" >{{$t('activity.identicalIpget')}}</el-checkbox>
            <el-checkbox :label="107" >{{$t('activity.thatVeryDayCharge')}}</el-checkbox>
            <el-checkbox :label="113" >{{$t('activity.thatVeryDayDrawMoney')}}</el-checkbox>
            <el-checkbox :label="102" >{{$t('activity.manDiscountsTop')}}
              <el-form-item prop="cities"
              :rules="[{ validator: validateCities, key:102, data:citiesList['102'].content.max_single_bonus, trigger: 'change' }]">
                <el-input class="money" v-model="citiesList['102'].content.max_single_bonus" @keyup.native="utils.onlyNumber(null,null,'float',$event)"></el-input>
              </el-form-item>
              {{$t('yuan')}}
             </el-checkbox>
            <el-checkbox :label="108" >{{$t('activity.pastCharge')}}
              <el-form-item
              :rules="[{ validator: validateCities, key:108, data:citiesList['108'].content.amount, trigger: 'change' }]">
                <el-input class="money" v-model="citiesList['108'].content.amount" @keyup.native="utils.onlyNumber(null,null,'float',$event)"></el-input>
              </el-form-item>
              {{$t('yuan')}}
            </el-checkbox>
            <el-checkbox :label="109" >{{$t('activity.pastCharge')}}
              <el-form-item
              :rules="[{ validator: validateCities, key:109, data:citiesList['109'].content.times, trigger: 'change' }]">
                <el-input class="timeday" v-model="citiesList['109'].content.times" @keyup.native="utils.onlyNumber(null,null,'float',$event)"></el-input>
              </el-form-item>
              {{$t('activity.number')}}
            </el-checkbox>
            <el-checkbox :label="110" >{{$t('activity.everydayDiscounts')}}
              <el-form-item
              :rules="[{ validator: validateCities, key:110, data:citiesList['110'].content.times, trigger: 'change' }]">
                <el-input class="timeday" v-model="citiesList['110'].content.times" @keyup.native="utils.onlyNumber(null,null,'float',$event)"></el-input>
              </el-form-item>
              {{$t('activity.frequency')}}
            </el-checkbox>
            <el-checkbox :label="111" >{{$t('activity.past')}}
              <el-form-item
              :rules="[{ validator: validateCities, key:111, data:citiesList['111'].content.days, trigger: 'change' }]">
                <el-input class="timeday" v-model="citiesList['111'].content.days" @keyup.native="utils.onlyNumber(null,null,'float',$event)"></el-input>
              </el-form-item>
              {{$t('activity.haveBottomPour')}}
            </el-checkbox>
            <el-checkbox :label="112" >{{$t('activity.past')}}
              <el-form-item
              :rules="[{ validator: validateCities, key:112, data:citiesList['112'].content.days, trigger: 'change' }]">
                <el-input class="timeday" v-model="citiesList['112'].content.days" @keyup.native="utils.onlyNumber(null,null,'float',$event)">
                </el-input>
              </el-form-item>
              {{$t('activity.daysScope')}}，
              {{$t('activity.addUpBottomPour')}}
                <el-form-item
                :rules="[{ validator: validateCities, key:112, data:citiesList['112'].content.times, trigger: 'change' }]">
                  <el-input class="timeday" v-model="citiesList['112'].content.times" @keyup.native="utils.onlyNumber(null,null,'float',$event)"></el-input>
                </el-form-item>
                {{$t('activity.order')}},
                {{$t('activity.grandTotal')}}
              <el-form-item
                :rules="[{ validator: validateCities, key:112, data:citiesList['112'].content.total, trigger: 'change' }]">
                <el-input class="timeday" v-model="citiesList['112'].content.total" @keyup.native="utils.onlyNumber(null,null,'float',$event)"></el-input>
              </el-form-item>
              {{$t('yuan')}}
            </el-checkbox>
            <el-checkbox :label="114" >{{$t('activity.pastAddUpGet')}}
              <el-form-item
              :rules="[{ validator: validateCities, key:114, data:citiesList['114'].content.amount, trigger: 'change' }]">
                <el-input class="money" v-model="citiesList['114'].content.amount" @keyup.native="utils.onlyNumber(null,null,'float',$event)"></el-input>
              </el-form-item>{{$t('yuan')}}
            </el-checkbox>
            <el-checkbox :label="115" >{{$t('activity.pastAddUpGet')}}
              <el-form-item
              :rules="[{ validator: validateCities, key:115, data:citiesList['115'].content.times, trigger: 'change' }]">
                <el-input class="timeday" v-model="citiesList['115'].content.times" @keyup.native="utils.onlyNumber(null,null,'float',$event)"></el-input>
              </el-form-item>{{$t('activity.number')}}
            </el-checkbox>
            <el-checkbox :label="116" >{{$t('activity.balance')}}
              <el-form-item
              :rules="[{ validator: validateCities, key:116, data:citiesList['116'].content.balance, trigger: 'change' }]">
                <el-input class="timeday" v-model="citiesList['116'].content.balance" @keyup.native="utils.onlyNumber(null,null,'float',$event)"></el-input>
              </el-form-item>
              {{$t('activity.aboveSum')}}
            </el-checkbox>
          </el-checkbox-group>
        </div>
      </el-form-item>
      <!-- 限制IP -->
      <el-form-item :label="$t('activity.astrictIP')" class="no-mr-bottom" >
        <el-input v-model="ipValue" type="textarea" autosize :placeholder="$t('activity.inpitBlackIP')" @change="blackIP"></el-input>
        <span class="tips">{{$t('activity.hintFormat')}}</span>
      </el-form-item>
      <!-- 会员等级 -->
      <el-form-item  v-if="![7].includes(ruleForm.type)" :label="$t('activity.vipClass')" prop="levels" class="no-mr-bottom">
         <!-- <el-button type="primary"  @click="centerDialogVisible=true">选择会员等级</el-button> -->
        <div class="condition">
          <el-checkbox-group v-model="ruleForm.levels">
           <el-checkbox  v-for="item in vipList" :label="item.id" :key="item.id">{{item.name}}</el-checkbox>
          </el-checkbox-group>
        </div>
      </el-form-item>
      <!-- 网页活动图 -->
      <el-form-item prop="web_img" :label="$t('activity.webImg')" class="no-mr-bottom">
          <el-upload name="image" drag :data="{format: 'file'}"
            v-loading.body="uploadLoading.web_img"  :headers="{ Authorization:`Bearer ${token}`}"
            accept="image/gif, image/png, image/jpg, image/jpeg, image/bmp"  class="upload-img" :action="uploadUrl" :show-file-list="false" :on-success="(res)=>{handleAvatarSuccess(res,'web_img')}" :on-progress="()=>{onProgress('web_img')}" :before-upload="beforeAvatarUpload" :on-error="()=>{upLoadError('web_img')}">
            <div class="addupload" >
              <div v-if="!ruleForm.web_img">
                <div class="el-upload__text">{{$t('activity.haul')}}<em>
                  <br/>
                  {{$t('activity.click')}}</em></div>
                <div class="el-upload__tip" slot="tip">{{$t('activity.uploadFormat')}}2MB</div>
              </div>
              <img v-else :src="utils.changeSourcesOrigin(ruleForm.web_img)" :alt="$t('activity.webImg')" style="width:100%">
            </div>
          </el-upload>
          <br/>
          <span class="text-danger">网页活动图建议上传尺寸在1200*170</span>
      </el-form-item>
      <!-- 手机活动图 -->
      <el-form-item :label="$t('activity.mobileImg')" class="no-mr-bottom">
          <el-upload name="image" drag :data="{format: 'file'}"
          v-loading.body="uploadLoading.mobile_img"  :headers="{ Authorization:`Bearer ${token}`}"
          accept="image/gif, image/png, image/jpg, image/jpeg, image/bmp"  class="upload-img upload-img-mobile" :action="uploadUrl" :show-file-list="false" :on-success="(res)=>{handleAvatarSuccess(res,'mobile_img')}" :on-progress="()=>{onProgress('mobile_img')}" :before-upload="beforeAvatarUpload"  :on-error="()=>{upLoadError('mobile_img')}">
            <div class="addupload" >
             <div v-if="!ruleForm.mobile_img">
                <!-- <i class="el-icon-upload"></i> -->
                <div class="el-upload__text">{{$t('activity.haul')}}<em>
                  <br/>
                  {{$t('activity.click')}}</em>
                  </div>
                <div class="el-upload__tip" slot="tip">{{$t('activity.uploadFormat')}}2MB</div>
              </div>
              <img v-else :src="utils.changeSourcesOrigin(ruleForm.mobile_img)" :alt="$t('activity.mobileImg')" style="width:100%">
            </div>
          </el-upload>
          <br/>
          <span class="text-danger">手机活动图建议上传尺寸 <strong>宽(3):高(1), 推荐宽度不小于360px</strong></span>
      </el-form-item>
      <!-- 活动规则备注 -->
      <el-form-item :label="$t('activity.remark')" class="no-mr-bottom">
        <tinymce :height="300"  v-model="ruleForm.remark"></tinymce>
        <!-- <el-col :span="5">
         <el-input v-model="ruleForm.remark" type="textarea" :autosize="{ minRows:4}" :placeholder="$t('activity.inputRemark')"></el-input>
        </el-col> -->
      </el-form-item>
      <!-- 过期条件 -->
      <el-form-item  v-if="![7].includes(ruleForm.type)" :label="$t('activity.pastDue')" class="expiredCondition" prop="expire_day">
          <el-radio-group v-model="ruleForm.be_expired">
            <el-radio  :label="0">{{$t('activity.noPeriod')}}</el-radio>
            <el-radio  :label="1">{{$t('activity.auditStatus')}}
              <el-input v-model="ruleForm.expire_day" :disabled="beExpired" class="expiredConditiontime" @keyup.native="utils.onlyNumber(null,null,'float',$event)"></el-input>
              {{$t('activity.days')}}
            </el-radio>
          </el-radio-group>
      </el-form-item>
      <!-- 保存 -->
      <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">{{$t('activity.preserve')}}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
import Tinymce from '@/components/Tinymce'
import { successMsg } from '@/utils/tools'
import { getLevelList } from '@/api/grade'
import { GAME_TYPE } from '@/utils/config'
import { typeList } from './config'

export default {
  name: 'editActivity',
  components: {
    Tinymce
  },
  data () {
    return {
      loading: false, // 页面的加载loading
      listid: '', // 等监控属性
      centerDialogVisible: false, // dialog的状态
      dialogStatus: null, // dialog内层显示的状态
      uploadUrl: `${this.$store.getters.app_base_api}backend/upload-img`, // 上传图片的url
      time: null,
      ipValue: '', // 黑名单的作用域
      uploadLoading: {
        web_img: false,
        mobile_img: false
      },
      vipList: null,
      options: [
        { value: 2, label: this.$t('activity.everyday') },
        { value: 3,
          label: this.$t('activity.weekly'),
          children: [
            { value: 0, label: this.$t('activity.sunday') },
            { value: 1, label: this.$t('activity.monday') },
            { value: 2, label: this.$t('activity.tuesday') },
            { value: 3, label: this.$t('activity.wednesday') },
            { value: 4, label: this.$t('activity.thursday') },
            { value: 5, label: this.$t('activity.friday') },
            { value: 6, label: this.$t('activity.saturday') }
          ]
        },
        { value: 4, label: this.$t('activity.monthly') }
      ],
      gameType: GAME_TYPE,
      typeList: typeList,
      versionList: {
        1: this.$t('activity.all'),
        2: this.$t('activity.web'),
        3: this.$t('activity.mobile')
      },
      cities: [], // 用来过滤值
      calculateTime: [2, 1], // 用来选择统计周期
      citiesList: { // 条件带参数
        102: {
          type: 102,
          content: {
            max_single_bonus: null
          }
        },
        108: {
          type: 108,
          content: {
            amount: null
          }
        },
        109: {
          type: 109,
          content: {
            times: null
          }
        },
        110: {
          type: 110,
          content: {
            times: null
          }
        },
        111: {
          type: 111,
          content: {
            days: null
          }
        },
        112: {
          type: 112,
          content: {
            days: null,
            times: null,
            total: null
          }
        },
        114: {
          type: 114,
          content: {
            amount: null
          }
        },
        115: {
          type: 115,
          content: {
            times: null
          }
        },
        116: {
          type: 116,
          content: {
            balance: null
          }
        }
      },
      ruleForm: {
        name: null,
        brief_introduction: null, // 简介
        status: 1, // 状态
        time_limit: 0, // 无限时间的开关
        type: 1, // 默认活动类型
        rewards: [{
          amount: null
        }], // 活动奖励 默认为注册活动
        version: 1,
        is_percent: 0, // 优惠类型
        max_transaction: 0, // 最大派发笔数
        max_total_bonus: 0, // 最大派发金额
        participate_type: 1, // 参加方式
        award_type: 2, // 领取方式
        need_audit: 1, // 需要审核
        conditions: [], // 条件内容
        levels: [], // 会员等级
        ip_black_list: [], // 限制IP
        web_img: null, // 网页活动图
        mobile_img: null, // 手机活动图
        remark: null, // 备注
        be_expired: 0, // 过期条件
        expire_day: null, // 过期时间
        activityRegulation: null, // 活动规则
        begin_date: null, // 开始日期
        end_date: null, // 结束日期
        total_need: 0, // 综合流水
        stat_freq: 2, // 统计周期 2每日3每周4每月
        freq_day: null, // stat_freq=3时为周几，0代表周日 0-6
        casino: 0,
        lottery: 0,
        sport: 0,
        slot_machine: 0,
        fish_hunting: 0,
        horse: 0,
        order: '9999'
      },
      width: null,
      height: null,
      rules: {
        name: [
          { required: true, message: this.$t('activity.inputName'), trigger: 'change' }
        ],
        brief_introduction: [
          { required: true, message: this.$t('required'), trigger: 'change' }
        ],
        max_transaction: [
          { required: true, message: this.$t('activity.inputTimes'), trigger: 'change' }
        ],
        max_total_bonus: [
          { required: true, message: this.$t('activity.inputMoney'), trigger: 'change' }
        ],
        time: [
          { validator: this.verifyDate, trigger: 'change' }
        ],
        expire_day: [
          { validator: this.verifyPastDue, trigger: 'change' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters(['token']),
    activityid () { // 编辑的活动id
      return this.$route.params.id || false
    },
    isAddType () {
      // 判断选完类型是否可以增加条件
      return ![1, 7].includes(this.ruleForm.type)
    },
    beExpired () { // 过期条件为不过期
      return this.ruleForm.be_expired === 0
    },
    units () { // 显示单位对应的值
      if (this.ruleForm.is_percent === 0) {
        return this.$t('yuan')
      } else {
        return '%'
      }
    },
    key () {
      // 奖励类型对应的key
      let result = 1
      if (this.ruleForm.type === 1) {
        result = 1
      } else if ([6].includes(this.ruleForm.type)) {
        result = 2
      } else if ([3, 4, 5].includes(this.ruleForm.type)) {
        result = 3
      } else if ([2, 8].includes(this.ruleForm.type)) {
        // 投注活动
        result = 4
      }
      return result
    }
  },
  // beforeRouteEnter (to, from, next) {
  //   let todo = [getLevelList()]
  //   if (to.params.id) {
  //     todo.push(activityInfo(to.params.id))
  //   } else {
  //     todo.push(null)
  //   }
  //   axios.all(todo).then(axios.spread((viplist, userData) => {
  //     next(vm => vm.setInitData(viplist, userData))
  //   }))
  // },
  methods: {
    blackIP (value) {
      // 换行为格式标准
      this.ruleForm.ip_black_list = value.split('\n')
    },
    // 条件的数组校验
    validateCities (rule, value, callback) {
      // 这样写可以不用el-form，省去重置and校验
      let data = rule.data
      let key = rule.key
      if (!data && this.cities.includes(key)) {
        // callback(new Error('必填项'))
        callback(new Error(this.$t('required')))
      } else {
        callback()
      }
    },
    setInitData (vipList, userData) {
      // 获取会员列表和处理编辑状态下的数据
      this.loading = true
      if (vipList && !vipList.err) {
        this.vipList = vipList.res
      }
      if (userData && !userData.err) {
        // 编辑状态
        this.ruleForm = Object.assign(this.ruleForm, userData.res, { rewards: JSON.parse(userData.res.rewards) || [] }, { levels: JSON.parse(userData.res.levels) || [] }, { ip_black_list: JSON.parse(userData.res.ip_black_list) || [] }, { conditions: JSON.parse(userData.res.conditions) || [] })
        // //  新加功能 兼容旧数据
        // this.ruleForm.end_date = this.ruleForm.time_limit === 0 ? null : this.ruleForm.end_date
        this.ipValue = this.ruleForm.ip_black_list.join('\n')
        this.calculateTime = [this.ruleForm.stat_freq, this.ruleForm.freq_day || null]
        this.showParams()
      }
      this.loading = false
    },
    resetRewards () {
      // 重置奖励条件
      let params
      if (this.key === 1) {
        params = [{
          amount: null
        }]
      } else if (this.key === 2) {
        params = [{
          days: null,
          amount: null,
          bet_min: null,
          bet_max: null
        }]
      } else if (this.key === 3) {
        params = [{
          amount: null,
          charge_min: null,
          charge_max: null
        }]
      } else if (this.key === 4) {
        params = {
          game_types: [],
          content: [
            {
              amount: null,
              bet_min: null,
              bet_max: null
            }
          ]
        }
        this.calculateTime = [2, 1] // 统计周期的默认值
      }
      this.ruleForm.rewards = params
    },
    addRewards (methods, index) {
      // 奖励条件的添加删除
      if (methods === 'add') {
        let params
        if (this.key === 2) {
          // 为了扩展 不用三元
          params = {
            days: null,
            amount: null, // 奖励
            bet_min: null,
            bet_max: null
          }
        } else if (this.key === 3) {
          params = {
            amount: null, // 奖励
            charge_min: null,
            charge_max: null
          }
        } else if (this.key === 4) {
          // 投注活动数据结构不一样
          this.ruleForm.rewards.content.push({
            amount: null, // 奖励
            bet_min: null,
            bet_max: null
          })
          return false
        }
        this.ruleForm.rewards.push(params)
      } else {
        if ([4].includes(this.key)) {
          // 因为投注活动的数据结构不一样，需要另外语句处理
          this.ruleForm.rewards.content.splice(index, 1)
        } else {
          this.ruleForm.rewards.splice(index, 1)
        }
      }
    },
    submitForm (formName) {
      // 提交
      [this.ruleForm.begin_date, this.ruleForm.end_date] = this.ruleForm.time_limit === 1 ? this.time || [null, null] : [null, null]
      if (![2].includes(this.ruleForm.type)) {
        // 类型不为投注活动的时候
        this.ruleForm.stat_freq = this.ruleForm.freq_day = null
      } else {
        // 如果stat_freq为3每周的时候，才传递第二个参数，否则都为1，另外calculateTime[1]的值不会随着[0]的变化销毁或更改，所以这里解构默认值不起作用
        this.ruleForm.stat_freq = this.calculateTime[0]
        this.ruleForm.freq_day = this.ruleForm.stat_freq === 3 ? this.calculateTime[1] : 1
      }
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.loading = true
          this.conditionParams()
          // 筛选非空的字符串
          this.ruleForm.ip_black_list = this.ruleForm.ip_black_list.filter(function (n) { return n })
          if (!this.activityid) {
            // 新增
            activityAdd(this.ruleForm).then(({ res, err }) => {
              if (!err) {
                successMsg()
                this.initialize()
                // 触发类型为默认为注册活动的数据类型，否则prop会查找默认不存在的值，导致错误
                this.ruleForm.type = 1
                this.resetRewards()
                this.calculateTime = [2]
                this.$nextTick(() => {
                  this.$refs['ruleForm'].resetFields()
                })
              }
              this.loading = false
            })
          } else {
            // 编辑
            activityEdit(this.ruleForm).then(({ res, err }) => {
              if (!err) {
                successMsg()
              }
              this.loading = false
            })
          }
        } else {
          this.$message.error(this.$t('activity.errorHint'))
        }
      })
    },
    conditionParams () {
      // 奖励条件的提交数据
      this.ruleForm.conditions = []
      this.cities.forEach((item, index) => {
        // 当有带其他参数的参数时，直接对象赋值
        if ([102, 108, 109, 110, 111, 112, 114, 115, 116].includes(item)) {
          this.ruleForm.conditions.push(this.citiesList[item])
        } else {
          // 否则只有传递类型值
          this.ruleForm.conditions.push({ type: item, content: [] })
        }
      })
    },
    showParams () {
      // 数组的情况下进行条件参数的逆操作
      // if (Array.isArray(this.ruleForm.condition)) {
      this.ruleForm.conditions.forEach((item) => {
        this.cities.push(item.type)
        if ([102, 108, 109, 110, 111, 112, 114, 115, 116].includes(item.type)) {
          this.citiesList[item.type] = item
        }
      })
      // }
    },
    verifyDate (rule, value, callback) {
      // 时间校验
      if (this.ruleForm.time_limit === 1 && this.time === null) {
        callback(new Error(this.$t('activity.selectTime')))
      } else {
        callback()
      }
      // if (this.ruleForm.time_limit && !value) {
      //   callback(new Error('请选择活动结束日期'))
      // } else {
      //   callback()
      // }
    },
    verifyPastDue (rule, value, callback) {
      // 过期天数校验
      if (this.ruleForm.be_expired === 1 && !this.ruleForm.expire_day) {
        callback(new Error(this.$t('activity.selectDate')))
      } else {
        callback()
      }
    },
    handleAvatarSuccess (res, data) {
      successMsg('上传成功')
      this.uploadLoading[data] = false
      this.ruleForm[data] = res.data.url
    },
    upLoadError (datakey) {
      this.$message.error('上传图片失败')
      this.uploadLoading[datakey] = false
    },
    beforeAvatarUpload (file) {
      // 最终用一个promise
      let verify = this.util(file)
      verify.then((res) => {
        if (res) {
          this.$message.info(res)
        }
      })
      verify.catch((err) => {
        if (err) {
          this.$message.error(err)
        }
      })
      return verify
    },
    util (file) {
      return new Promise((resolve, reject) => {
        const fileLimit = ['image/jpeg', 'image/png'].includes(file.type)
        const isLt = file.size / 1024 / 1024 < 2
        let typeres = reject
        // eslint报错，所以用局部变量保存
        if (!fileLimit) {
          typeres('上传的图片只能是JPG或png格式!')
        }
        if (!isLt) {
          typeres('上传的图片大小不能超过 2MB!')
        }
        resolve(true)
        // let reader = new FileReader()
        // reader.onload = function(e) {
        //   let data = e.target.result
        //   let img = new Image()
        //   img.src = data
        //   let res = resolve
        //   // let err = reject
        //   // 被作用域的坑了。。 用个临时变量储存引入作用域
        //   img.onload = function() {
        //     let {width, height} = img
        //     if ((width >= 670 && width <= 675) && (height >= 168 && height <= 172)) {
        //       res(false)
        //     } else {
        //       res(`活动图片建议上传1190*170的图片`)
        //     }
        //   }
        // }
        // reader.readAsDataURL(file)
      })
    },
    onProgress (data) {
      // 上传时的钩子
      this.uploadLoading[data] = true
    },
    initialize () {
      // 初始化条件
      this.citiesList = {
        102: { type: 102, content: { max_single_bonus: null } },
        108: { type: 108, content: { amount: null } },
        109: { type: 109, content: { times: null } },
        110: { type: 110, content: { times: null } },
        111: { type: 111, content: { days: null } },
        112: { type: 112, content: { days: null, times: null, total: null } },
        114: { type: 114, content: { amount: null } },
        115: { type: 115, content: { times: null } },
        116: { type: 115, content: { balance: null } }
      }
      this.ruleForm.rewards = {
        // 奖励数组拆分
        1: [{ amount: null }],
        2: [{ amount: null, bet_min: null, bet_max: null }],
        3: [{ amount: null, charge_min: null, charge_max: null }]
      }
      this.cities = []
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.m-activity-edit {
  padding: 30px 20px;
  background: #fff;
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .tips{
    height: 30px;
    line-height: 30px;
    font-size: 12px;
    color: #5a5e66;
  }
  .el-tag--mini{
  height: 25px;
  line-height:25px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
  .condition {
    .el-checkbox {
      display: block;
    }
    .money{
    width: 80px;
    margin: 3px;
    }
    .timeday{
      width: 60px;
      margin: 3px;
    }
    .el-form-item{
      vertical-align: middle;
      display: inline-block;
      margin-bottom: 0;
      .el-form-item__error{
        position:relative
      }
    }
  }
  .condition-premise{
      margin-bottom: 10px;
  }
  .upload-img-mobile{
    width: 267px !important;
    .el-upload-dragger{
      height: 160px !important;
    }
  }
  .upload-img{
    // 加个padding值
    width: 712px;
    height: auto;
    display: inline-block;
    .el-upload{
    width: 100%;
    height: 100%;
    .el-upload-dragger{
      width: 100%;
      height: auto;
      padding: 15px;
    }
  }
    // .addupload{
    //   width: 200px;
    //   height: 120px;
    //   margin: auto;
    // }
  }
  .gameaudit{
    margin: 5px 0px;
  }
  .viplist{
    max-height:300px;
    overflow-y: auto;
    .el-checkbox{
      display: block;
    }
    .el-checkbox+.el-checkbox{
      margin: auto
    }
  }
  .awardlist{
    .el-input{
      margin: 0px 5px;
    }
    .el-form-item{
      display: inline-block
    }
    .hint{
      margin-bottom: 15px;
    }
  }
  .area {
    color: #606266;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin-top: 5px;
    .el-input {
      width: 100px;
    }
    .area-title {
      margin: 0px 10px;
    }
    .area-register {
      display: flex;
      align-items: center;
      width: 100%;
    }
  }
  .confirm {
    .el-button {
      line-height: 16px;
      width: 340px;
      font-size: 16px;
    }
  }
  .timescope {
    float: left;
    margin-right:7px;
  }
  .expiredCondition {
    .expiredConditiontime {
      width: 50px;
    }
    label {
      display: block;
      float: left;
      width: 100%;
      margin: 7px 0px;
    }
  }
}
</style>
