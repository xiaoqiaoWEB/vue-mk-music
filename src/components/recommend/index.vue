<template>
  <div class="recommend">
    <!--
    <silder>
      <div v-for="item in recommend" :key="item.url">
        <a href="">
          <img :src="item.url">
        </a>
      </div>
    </silder>
    -->
  </div>
</template>

<script type="text/ecmascript-6">
import {getRecommend, getDiscList} from 'api/recommend'
import Silder from 'base/silder'
import {ERR_OK} from 'api/config'

export default {
  data() {
    return {
      recommend: [
        {url: 'http://www.sswpx.cn/data/upload/shop/avatar/06213764046979980.jpg'},
        {url: 'http://www.sswpx.cn/data/upload/shop/avatar/06209090613318384.png'}
      ]
    }
  },
  created() {
    // this._getRecommend()
    this._getDiscList()
  },
  methods: {
    _getRecommend() {
      getRecommend().then(res => {
        if (res.code === ERR_OK) {
          this.recommend = res.data.slider
        }
      })
    },
    _getDiscList() {
      getDiscList().then(res => {
        console.log(res.data)
      })
    }
  },
  components: {
    Silder
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/variable"
.recommend
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .recommend-content
      height: 100%
      overflow: hidden
      .slider-wrapper
        position: relative
        width: 100%
        overflow: hidden
      .recommend-list
        .list-title
          height: 65px
          line-height: 65px
          text-align: center
          font-size: $font-size-medium
          color: $color-theme
        .item
          display: flex
          box-sizing: border-box
          align-items: center
          padding: 0 20px 20px 20px
          .icon
            flex: 0 0 60px
            width: 60px
            padding-right: 20px
          .text
            display: flex
            flex-direction: column
            justify-content: center
            flex: 1
            line-height: 20px
            overflow: hidden
            font-size: $font-size-medium
            .name
              margin-bottom: 10px
              color: $color-text
            .desc
              color: $color-text-d
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>