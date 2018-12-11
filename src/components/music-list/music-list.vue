<template>
  <div class="music-list">
    <div class="back">
      <i class="icon-back"></i>
    </div>
    <h1 class="title">rrrrr</h1>
    <div class="bg-imgage">
      <div class="filter"></div>
    </div>
  </div>   
</template>
<script type="text/ecmascript-6">
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
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "~common/stylus/variable"
@import "~common/stylus/mixin"

.music-list
  position fixed
  z-index 100
  top 0
  left 0
  right 0
  bottom 0
  background: $color-background
  .back
    position absolute
    top 0
    left 6px
    z-index 50
    .icon-back
      display block
      padding 10px
      font-size: $font-size-large-x
      color: $color-theme
  .title
    position absolute
    top 0
    left 10%
    z-index 40
    width 80%    
    no-wrap()
    text-align center
    line-height 40px
    font-size: $font-size-large
    color: $color-text
  .bg-imgage
    position relative
    width 100%
    heihgt 0
    padding-top 70%
    transform-origin top
    background-size cover
    .filter
      position absolute
      top 0
      left 0
      width 100%
      heihgt 100%
      background: rgba(7, 17, 27, 0.4)
</style>

