<template>
  <div class="recommend">
    <scroll class="recommend-content" ref="scroll" :data="discList">
      <div>
        <div class="slider-wrapper" v-if="recommends.length">
          <div class="slider-content">
            <silder ref="silder">
              <div v-for="(item,index) in recommends" :key="index">
                <a :href="item.linkUrl">
                  <img :src="item.picUrl" class="needclick">
                </a>
              </div>
            </silder>
          </div>
        </div>
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
            <li class="item" v-for="(item,index) in discList" :key="index">
              <div class="icon">
                <img
                  v-lazy="item.imgurl"
                  :alt="item.creator.name"
                  width="60"
                  height="60"
                  @load="imgLoad"
                >
              </div>
              <div class="text">
                <h2 class="name">{{item.creator.name}}</h2>
                <p class="desc">{{item.dissname}}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="loading-container" v-show="!discList.length">
        <loading></loading>
      </div>
    </scroll>
  </div>
</template>

<script type="text/ecmascript-6">
import Scroll from 'base/scroll/scroll'
import Silder from 'base/silder/silder'
import Loading from 'base/loading/loading'

import { getRecommend, getDiscList } from 'api/recommend'
import { ERR_OK } from 'api/config'

export default {
  data() {
    return {
      recommends: [],
      discList: []
    }
  },
  created() {
    this._getRecommend()
    setTimeout(() => {
      this._getDiscList()
    }, 1000)
  },
  methods: {
    _getRecommend() {
      getRecommend().then(res => {
        if (res.code === ERR_OK) {
          this.recommends = res.data.slider
        }
      })
    },
    _getDiscList() {
      getDiscList().then(res => {
        if (res.code === ERR_OK) {
          this.discList = res.data.list
        }
      })
    },
    imgLoad() {
      if (!this.imgChecked) {
        this.imgChecked = true
        // 图片加载完成 重新计算 scroll 高度
        this.$refs.scroll.refresh()
      }
    }
  },
  components: {
    Scroll,
    Silder,
    Loading
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import './recommend'
</style>

