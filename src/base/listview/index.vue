<template>
    <scroll 
    @scroll="scroll" 
    :data="data" 
    class="listview" 
    ref="listview" 
    :probeType= "probeType"
    :listenScroll="listenScroll">
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
            @touchmove.stop.prevent="onShortcutTouchMove"
        >
            <ul>
                <li 
                class="item" 
                :class="{'current': currentIndex === index}"
                v-for="(item, index) in shortcutList" 
                :key="index" 
                :data-index="index">
                    {{item}}
                </li>
            </ul>
        </div>
    </scroll>
</template>
<script type="text/ecmascript-6">
import Scroll from 'base/scroll/scroll.vue'
import {getDate} from 'common/js/dom.js'

const ANCHOR_HEIGHT = 18

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
            currentIndex: 0
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
            return this.data.map((item) => {
                return item.title.substr(0, 1)
            })
        }
    },
    methods: {
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
           let delta = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0
           let anchorIndex = parseInt(this.touch.anchorIndex) + delta
           this._scrollTo(anchorIndex)
        },
        scroll(pos) {
            // scrollY 是一个负值
            this.scrollY = pos.y
            // console.info(pos.y)
        },
        _scrollTo(index) {
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
                    console.log(this.currentIndex)
                    return
                }
            }
            // 当滚动到底部，且-newY大于最后一个元素的上限
            this.currentIndex = lateHeight.length - 2
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
