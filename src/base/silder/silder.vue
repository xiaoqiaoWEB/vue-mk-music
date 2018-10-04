<template>
    <div class="silder" ref="silder">
        <div class="slider-group" ref="sliderGroup">
            <slot>
            </slot>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import {addClass} from 'common/js/dom'
import BScroll from 'better-scroll'
export default {
    props: {
        loop: {
            type: Boolean,
            default: true
        },
        autoplay: {
            type: Boolean,
            default: true
        },
        interval: {
            type: Number,
            default: 4000
        }
    },
    mounted() {
        setTimeout(() => {
            this._setSilderWidth() 
            this._initSilder()
        }, 20)
    },
    methods: {
        _setSilderWidth() {
            this.children = this.$refs.sliderGroup.children
            let width = 0
            let silderWidth = this.$refs.silder.clientWidth
            for (let i = 0; i < this.children.length; i++) {
                const element = this.children[i]
                addClass(element, 'slider-item')

                element.style.width = silderWidth + 'px'
                width += silderWidth
            }
            this.$refs.sliderGroup.style.width = width + 'px'
        },
        _initSilder() {
            this.silder = new BScroll(this.$refs.silder, {
                scrollX: true,
                scrollY: false,
                momentum: false,
                snap: {
                    loop: this.loop,
                    threshold: 0.3,
                    speed: 400
                }
            })
        }
    }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .slider
    min-height: 1px
    .slider-group
      position: relative
      overflow: hidden
      white-space: nowrap
      .slider-item
        float: left
        box-sizing: border-box
        overflow: hidden
        text-align: center
        a
          display: block
          width: 100%
          overflow: hidden
          text-decoration: none
        img
          display: block
          width: 100%
    .dots
      position: absolute
      right: 0
      left: 0
      bottom: 12px
      transform: translateZ(1px)
      text-align: center
      font-size: 0
      .dot
        display: inline-block
        margin: 0 4px
        width: 8px
        height: 8px
        border-radius: 50%
        background: $color-text-l
        &.active
          width: 20px
          border-radius: 5px
          background: $color-text-ll
</style>
