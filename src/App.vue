<template>
  <div id="app">
    <MHeader/>
    <tab/>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">

import MHeader from 'components/m-header/index.vue'
import Tab from 'components/tab/index.vue'

export default {
  components: {
    MHeader,
    Tab
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
