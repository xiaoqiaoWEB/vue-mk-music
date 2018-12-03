<template>
    <scroll :data="data" class="listview" ref="listview">
        <ul>
            <li v-for="(group,index) in data" :key="index" class="list-group" ref="listGroup">
                <h2 class="list-group-title">{{group.title}}</h2>
                <ul>
                    <li class="list-group-item" v-for="(item,index) in group.items" :key="index">
                        <img class="avatar" v-lazy="item.avatar">
                        <span class="name">{{item.name}}</span>
                    </li>
                </ul>
            </li>
        </ul>
        <div 
            class="list-shortcut"
            @touchstart="onShortcutTouchStart"
        >
            <ul>
                <li class="item" v-for="(item, index) in shortcutList" :key="index" :data-index="index">
                    {{item}}
                </li>
            </ul>
        </div>
    </scroll>
</template>
<script type="text/ecmascript-6">
import Scroll from 'base/scroll/scroll.vue'
import {getDate} from 'common/js/dom.js'
export default {
    props: {
        data: {
            type: Array
            /* default: [] */
        }
    },
    computed: {
        shortcutList() {
            return this.data.map((item) => {
                return item.title.substr(0, 1)
            })
        }
    },
    methods: {
        onShortcutTouchStart(e) {
            let anchorIndex = getDate(e.target, 'index')
            console.log(anchorIndex)
            this.$refs.listview.scrollToElement(this.$refs.listGroup[anchorIndex], 0)
        }
    },
    components: {
        Scroll
    }
}
</script>
<style lang="stylus" scoped>
@import "~common/stylus/variable"
.listview
    position relative
    width 100%
    height 100%
    overflow hidden
    background: $color-background
    .list-group
        padding-bottom 30px
        .list-group-title
            heihgt 30px
            line-height 30px
            padding-left 20px
            font-size $font-size-small
            color $color-text-l
            background $color-highlight-background
        .list-group-item
            display flex
            align-items center
            padding 20px 0 0 30px
            .avatar
                width 50px;
                height 50px;
                border-radius 50%
            .name
                margin-left 20px
                color $color-text-l
                font-size $font-size-medium   
    .list-shortcut
        position absolute
        z-index 30
        right 0
        top 50%
        transform translateY(-50%)
        width 20px
        padding 20px 0
        border-radius 10px
        text-align center
        background: $color-background-d
        font-family: Helvetica  
        .item
            padding 3px
            line-height 1
            color: $color-text-l
            font-size: $font-size-small     
            &.current
                color $color-theme   
</style>
