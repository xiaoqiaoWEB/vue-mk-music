<template>
  <div  class="song-list">
    <ul>
      <li class="item" v-for="(item, index) in songs" :key="index">
        <div class="content">
          <h2 class="name">{{item.name}}</h2>
          <p class="desc">{{getDesc(item)}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  props: {
    songs: {
      type: Array
      // default: []
    }
  },
  methods: {
    getDesc(item) {
      return `${item.singer}·${item.album}`
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '~common/stylus/variable';
@import '~common/stylus/mixin';
</style>
