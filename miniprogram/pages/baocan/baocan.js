// pages/baocan/baocan.js
Page({
  onLoad: function (options) {
   var timestamp = Date.parse(new Date());
   var date = new Date(timestamp);
   //获取年份  
   var Y =date.getFullYear();
   //获取月份  
   var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
   //获取当日日期 
   var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate(); 
   //console.log("当前时间：" + Y + '年'  + M+ '月' + D+ '日' ); 
   this.data.year = Y;
   this.data.month = M;
   this.data.day = D;
  },
  data: {
      select : false,
      department : '',
      gender : '',
      name : '',
      year : '',
      month : '',
      day : ''
  },
  handleChange(e){
    let gen = e.detail.value;
    this.setData({
       gender : gen
    })
  },
bindShowMsg() {
     this.setData({
         select:!this.data.select
     })
    
     
},

setName(e){
  console.log(e.detail.value)
  this.setData({
    name : e.detail.value

})
},

mySelect(e) {
    var name = e.currentTarget.dataset.name
    this.setData({
        department : name,
        select : false
    })
},
    submit(e) {
   //   console.log("全局变量"+this.data.gender)
      console.log('当前时间：' + this.data.year + this.data.month + this.data.day)
   //   console.log('进入提交流程')
      console.log('姓名：' + this.data.name)
      console.log('部门：' + this.data.department)
      console.log('餐种：' + this.data.gender)
      if(this.data.name == '' || this.data.department == '' || this.data.gender == ''){
         if(this.data.department == ''){
          var con = '请选择部门'
         }
         if(this.data.name == ''){
          var con = '请输入姓名'
         }
         if(this.data.gender == ''){
          var con = '请选择餐种'
         }    
        wx.showModal({
          title: '提示',
          content: con,
          success: function (res) {
            if (res.confirm) {//这里是点击了确定以后
            //  console.log('用户点击确定'); 
            return;         
            } else {//这里是点击了取消以后
            //  console.log('用户点击取消')  
            return;
            }  
          }
        })       
      }else{
        const db = wx.cloud.database();
        db.collection('shitang').add({
            data:{
              name : this.data.name,
              department : this.data.department,
              gender : this.data.gender,
              year : this.data.year,
              month : this.data.month,
              day :  this.data.day
            }
        }).then(res=>{
         //   console.log(res)
            wx.showModal({
              title: '提示',
              content: '提交成功',
              success: function (res) {
                if (res.confirm) {//这里是点击了确定以后
                //  console.log('用户点击确定'); 
              //  this.onReady();
                return;         
                } else {//这里是点击了取消以后
                //  console.log('用户点击取消')  
              //  this.onReady();
                return;
                }  
              }
            }) 
        })
        this.onReady();
      }
     
    
 }
})

