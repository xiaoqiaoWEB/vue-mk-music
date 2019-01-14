<template>
  <div class="music-list">
    <div class="back">
      <i class="icon-back"></i>
    </div>
    <h1 class="title" v-html="title"></h1>
    <div class="bg-imgage" :style="bgstyle" ref="bgImage">
      <div class="filter"></div>
    </div>
    <scroll :data="songs" class="list" ref="list">
      <div class="song-list-wrapper">
        <song-list :songs="songs"></song-list>
      </div>
    </scroll>
  </div>   
</template>
<script type="text/ecmascript-6">
import Scroll from 'base/scroll/scroll'
import SongList from 'base/song-list/song-list' 
export default {
  props: {
    bgImage: {
      type: String,
      default: ''
    },
    songs: {
      type: Array
      // default: []
    },
    title: {
      type: String,
      default: ''
    }
  },
  computed: {
    bgstyle() {
      return `background-image:url(${this.bgImage})`
    }
  },
  mounted() {
    this.$refs.list.$el.style.top = this.$refs.bgImage.clientHeight + 'px'
  },
  components: {
    Scroll,
    SongList
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import './music-list.styl'
</style>

