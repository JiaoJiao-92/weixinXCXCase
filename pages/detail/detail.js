Page({

  /**
   * 页面的初始数据
   */
  data: {
    contentData:{},
    menuPos:0,
    subMenuPos:0,
    listPos:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.subPos != undefined) {//有子栏目的
      this.setData({
        menuPos:parseInt(options.pos),
        subMenuPos:parseInt(options.subPos),
        listPos: parseInt(options.conPos)
      });
    }else{
      this.setData({
        menuPos: parseInt(options.pos),
        listPos: parseInt(options.conPos)
      });
    }
    var that = this;
    wx.request({
      url: 'http://192.168.29.38/weixinCase/data/data.js',
      success: function (_res) {
        console.log(_res.data);
        var dataPage = _res.data;
        var detailObj;
        if (options.subPos != undefined) {//有子栏目的
          detailObj = dataPage[that.data.menuPos].list[that.data.subMenuPos].contentList[that.data.listPos]
        } else {
          detailObj = dataPage[that.data.menuPos].contentList[that.data.listPos]
        }
        that.getDetail(detailObj.id, detailObj.title, dataPage);
      },
    })
  },
  getDetail: function (_id,_title,dataPage){
    var that = this;
    wx.request({
      url: 'http://192.168.29.38/weixinCase/data/detail.js',
      success: function (_res) {
        console.log(_res);
        var detailContent = _res.data[0];
        console.log("detailContent:"+detailContent);
        detailContent.id = _id;
        detailContent.title = _title;
        that.setData({
          contentData: detailContent
        })
        console.log(that.data.contentData);
      },
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})