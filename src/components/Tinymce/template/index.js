// Here is a list of the templates
// Detail list see https://www.tiny.cloud/docs/plugins/template/

const templates = [{
  'title': '主体',
  'description': '',
  'content': `
  <div style="width:100%; height:auto;">
  <p style="font-size:20px;color:rgba(222,200,136,1); line-height:24px;padding: 5px;">
    优惠内容:</p>
    <div style="color:#ffffff">
    </div>
      <p style="margin-top: 20px; font-size:20px; color:rgba(222,200,136,1); line-height:24px;padding: 5px;">活动规则:</p>
      <div  style="color: #FFFFFF;line-height: 30px;font-size:16px;">
        <ol style="margin-left:16px;">
          <li></li>
        </ol>
      </div>
  </div>
  `
},
{
  'title': '表格',
  'description': '如需增删列需要手动设置宽度',
  'content': `
  <table style="border-collapse: collapse; width: 100%;" border="1">
    <tbody>
      <tr style="background: rgba(66,66,66,1); font-size: 20px; height: 40px; color: #ffffff; text-align: center;">
        <td style="width: 25%;">存款方式</td>
        <td style="width: 25%;">返还比例</td>
        <td style="width: 25%;">单笔最高优惠</td>
        <td style="width: 25%;">单日最高金额</td>
      </tr>
      <tr style="background: rgba(255,255,255,1); height: 40px; color: #333333; text-align: center;">
        <td style="width: 25%;">快捷支付&ge;100</td>
        <td style="width: 25%;">0.5%</td>
        <td style="width: 25%;">188</td>
        <td style="width: 25%;">1888</td>
      </tr>
    </tbody>
  </table>`
}, {
  'title': '文字列表',
  'description': '插入需输入文字才有效',
  'content': `
    <ol style="margin-left:16px;">
       <li></li>
     </ol>
    `
}
]
export default templates
