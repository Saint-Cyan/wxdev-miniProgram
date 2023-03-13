// custom-tab-bar/index.js
Component({
  data: {
    selected: null,
    color: "#7A7E83",
    selectedColor: "#3cc51f",
    list: [{
      pagePath: "/pages/userIndex/index",
      iconPath: "/static/images/index-icon.png",
      selectedIconPath: "/static/images/index-icon-selected.png",
      text: "主页"
    }, {
      pagePath: "/pages/study/study",
      iconPath: "/static/images/study.png",
      selectedIconPath: "/static/images/study-selected.png",
      text: "学习"
    }, {
      pagePath: "/pages/exercise/exercise",
      iconPath: "/static/images/exercise.png",
      selectedIconPath: "/static/images/exercise-selected.png",
      text: "锻炼"
    }, {
      pagePath: "/pages/mine/mine",
      iconPath: "/static/images/mine.png",
      selectedIconPath: "/static/images/mine-selected.png",
      text: "我的"
    }]
  },
  attached() {
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset;
      const url = data.path;
      wx.switchTab({url})
      this.setData({
        selected: data.index
      })
    }
  }
})