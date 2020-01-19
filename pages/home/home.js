var pageData = [];//声明一下页面数据
Page({
  data: {
    myAddress: ['广东省', '广州市', '海珠区'],
    choosePos:1,//选中的栏目的分类下标
    chooseSubPos:0,//默认选择的子分类,//有的栏目有  有的没有
    data: [],
  },
  onLoad: function () {
    console.log("获取地址--");
    var that = this;
    wx.request({
      url: 'http://192.168.29.38/weixinCase/data/data.js',
      success:function (_res){
        pageData = _res.data;
        console.log(_res.data);
        that.setData({
          data: pageData,
        })
      },
    })
    
  },
  // 一级栏目上的选中
  chooseList:function (e){
    var id = e.currentTarget.dataset.id;
    this.setData({
      choosePos:id,
    })
    console.log(this.data.choosePos);
  },
  // 子栏目上的选中
  chooseSubList:function (e){
    var id = e.currentTarget.dataset.id;
    console.log(id);
    this.setData({
      chooseSubPos: id,
    })
    console.log(this.data.chooseSubPos);
  },
  // 带子栏目的新闻绑定事件
  detailPage1:function(e){
    var pos = e.currentTarget.dataset.param;
    var detailObj = this.data.data[this.data.choosePos].list[this.data.chooseSubPos].contentList[pos]
    if (detailObj.isVideo){
      wx.navigateTo({
        url: "../video/videoDetai?pos=" + this.data.choosePos + "&subPos=" + this.data.chooseSubPos + "&conPos=" + pos,
      })
    }else{
      wx.navigateTo({
        url: "../detail/detail?pos=" + this.data.choosePos + "&subPos=" + this.data.chooseSubPos + "&conPos=" + pos,
      })
    }
  },
  // 不带子栏目的新闻绑定事件
  detailPage2: function (e) {
    var pos = e.currentTarget.dataset.param;
    console.log("pos====" + pos);
    var detailObj = this.data.data[this.data.choosePos].contentList[pos]
    if (detailObj.isVideo) {
      wx.navigateTo({
        url: "../video/videoDetai?pos=" + this.data.choosePos + "&conPos=" + pos,
      })
    } else {
      wx.navigateTo({
        url: "../detail/detail?pos="+this.data.choosePos+"&conPos=" + pos,
      })
    }
  },
  // swiper上面绑定的事件
  linkPic:function (e){
    var pos = e.currentTarget.dataset.param;
    var pic = this.data.data[this.data.choosePos].swiperList[pos].pic;
    console.log(pic);
  },
  // 切换地区之后-数据需要重新请求
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      myAddress: e.detail.value
    });
    //此处需要重新拿数据再设置下去 就能刷新页面 -以下是测试写法
    this.setData({
      choosePos:0,
      chooseSubPos:0,
      data: pageData
    })
  }
})