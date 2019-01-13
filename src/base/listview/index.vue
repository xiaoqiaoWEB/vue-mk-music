<template>
  <scroll
    @scroll="scroll"
    :data="data"
    class="listview"
    ref="listview"
    :probeType="probeType"
    :listenScroll="listenScroll"
  >
    <ul>
      <li v-for="(group,index) in data" :key="index" class="list-group" ref="listGroup">
        <h2 class="list-group-title">{{group.title}}</h2>
        <ul>
          <li
            class="list-group-item"
            v-for="(item,index) in group.items"
            @click="selectItem(item)"
            :key="index"
          >
            <img class="avatar" v-lazy="item.avatar">
            <span class="name">{{item.name}}</span>
          </li>
        </ul>
      </li>
    </ul>
    <div
      class="list-shortcut"
      @touchstart="onShortcutTouchStart"
      @touchmove.stop.prevent="onShortcutTouchMove"
    >
      <ul>
        <li
          class="item"
          :class="{'current': currentIndex === index}"
          v-for="(item, index) in shortcutList"
          :key="index"
          :data-index="index"
        >{{item}}</li>
      </ul>
    </div>
    <div class="list-fixed" v-show="fixedTitle" ref="fixed">
      <div class="fixed-title">{{fixedTitle}}</div>
    </div>
    <div class="loading-container" v-show="!data.length">
      <loading></loading>
    </div>
  </scroll>
</template>
<script type="text/ecmascript-6">
import Scroll from 'base/scroll/scroll.vue'
import Loading from 'base/loading/loading.vue'
import { getDate } from 'common/js/dom.js'

const ANCHOR_HEIGHT = 18
const TITLE_HEIGHT = 30

export default {
  created() {
    this.touch = {}
    this.lateHeight = []
    this.listenScroll = true
    this.probeType = 3
  },
  data() {
    return {
      scrollY: -1,
      currentIndex: 0,
      diff: -1
    }
  },
  props: {
    data: {
      type: Array
      /* default: [] */
    }
  },
  computed: {
    shortcutList() {
      return this.data.map(item => {
        return item.title.substr(0, 1)
      })
    },
    fixedTitle() {
      if (this.scrollY > 0) {
        return false
      }
      return this.data[this.currentIndex]
        ? this.data[this.currentIndex].title
        : ''
    }
  },
  methods: {
    selectItem(item) {
      this.$emit('select', item)
    },
    onShortcutTouchStart(e) {
      let anchorIndex = getDate(e.target, 'index')
      // console.log(anchorIndex)
      // 点击 右侧 到指定位置
      this.touch.y1 = e.touches[0].pageY
      this.touch.anchorIndex = anchorIndex
      this._scrollTo(anchorIndex)
    },
    onShortcutTouchMove(e) {
      this.touch.y2 = e.touches[0].pageY
      // 向下取整
      let delta = ((this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT) | 0
      let anchorIndex = parseInt(this.touch.anchorIndex) + delta
      this._scrollTo(anchorIndex)
    },
    scroll(pos) {
      // scrollY 是一个负值
      this.scrollY = pos.y
      // console.info(pos.y)
    },
    _scrollTo(index) {
      // 点击到 不是li 得时候
      if (!index && index !== 0) {
        return
      }
      if (index < 0) {
        index = 0
      } else if (index > this.lateHeight.length - 2) {
        index = this.lateHeight.length - 2
      }
      // 点击重置 scrollY
      this.scrollY = -this.lateHeight[index]
      // scrollToElement 第二个参数是 运动时间
      this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0)
    },
    _getLateHeight() {
      this.lateHeight = []
      const list = this.$refs.listGroup
      let height = 0
      this.lateHeight.push(height)
      for (let i = 0; i < list.length; i++) {
        let item = list[i]
        height += item.clientHeight
        this.lateHeight.push(height)
      }
      // console.log(this.lateHeight)
    }
  },
  watch: {
    data() {
      setTimeout(() => {
        this._getLateHeight()
      }, 20)
    },
    scrollY(newY) {
      const lateHeight = this.lateHeight
      // 当滚动到顶部，newY>0
      if (newY > 0) {
        this.currentIndex = 0
        return
      }
      // 在中间部分
      for (let i = 0; i < lateHeight.length - 1; i++) {
        let height01 = lateHeight[i]
        let height02 = lateHeight[i + 1]
        if (-newY >= height01 && -newY < height02) {
          this.currentIndex = i
          this.diff = height02 + newY
          // console.log(this.currentIndex)
          return
        }
      }
      // 当滚动到底部，且-newY大于最后一个元素的上限
      this.currentIndex = lateHeight.length - 2
    },
    diff(newVal) {
      let fixedTop =
        newVal > 0 && newVal < TITLE_HEIGHT ? newVal - TITLE_HEIGHT : 0
      if (this.fixedTop === fixedTop) {
        return
      }
      this.fixedTop = fixedTop
      this.$refs.fixed.style.transform = `translate3d(0,${fixedTop}px,0)`
    }
  },
  components: {
    Scroll,
    Loading
  }
}
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
@import './listview'
</style>
