<template>
    <div class="silder" ref="silder">
        <div class="slider-group" ref="sliderGroup">
            <slot>
            </slot>
        </div>
        <div class="dots">
            <span class="dot" v-for="(item,index) in dots" :key="index" :class="{active:  currentPageIndex === index}"></span>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import {addClass} from 'common/js/dom'
import BScroll from 'better-scroll'
export default {
    data() {
        return {
            dots: [],
            currentPageIndex: 0
        }
    },
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
            this._initDots()
            this._initSilder()
           
            if (this.autoplay) {
                this._play()        
            }
        }, 20)

        window.addEventListener('resize', () => {
            if (!this.silder || !this.silder.enabled) {
                return
            }
            clearTimeout(this.resizetimer)
            this.resizetimer = setTimeout(() => {
                 if (this.slider.isInTransition) {
                    this._onScrollEnd()
                } else {
                    if (this.autoPlay) {
                    this._play()
                    }
                }
                this.refresh()        
            }, 60)
        })
    },
    activated() {
      this.silder.enable()
      let pageIndex = this.silder.getCurrentPage().pageX
      this.silder.goToPage(pageIndex, 0, 0)
      this.currentPageIndex = pageIndex
      if (this.autoPlay) {
        this._play()
      }
    },
    deactivated() {
      this.silder.disable()
      clearTimeout(this.timer)
    },
    beforeDestroy() {
      this.silder.disable()
      clearTimeout(this.timer)
    },
    methods: {
        refresh() {
            if (this.silder) {
                this._setSilderWidth() 
                this.silder.refresh()
            }
        },
        _setSilderWidth(isResize) {
            this.children = this.$refs.sliderGroup.children
            let width = 0
            let silderWidth = this.$refs.silder.clientWidth
            for (let i = 0; i < this.children.length; i++) {
                const element = this.children[i]
                addClass(element, 'slider-item')

                element.style.width = silderWidth + 'px'
                width += silderWidth
            }
            if (this.loop && !isResize) {
                width += 2 * silderWidth
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

            this.silder.on('scrollEnd', this._onScrollEnd)
            this.silder.on('touchend', () => {
                if (this.autoplay) {
                    this._play()        
                }
            })
            this.silder.on('beforeScrollStart', () => {
                if (this.autoPlay) {
                    clearTimeout(this.timer)
                }
            })
        },
        _initDots() {
            this.dots = new Array(this.children.length)
        },
        _play() {
            clearTimeout(this.timer)
            this.timer = setTimeout(() => {
                this.silder.next()
            }, this.interval)
        },
        _onScrollEnd() {
            this.currentPageIndex = this.silder.getCurrentPage().pageX
            if (this.autoplay) {
                this._play()        
            }
        }
    }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .silder
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
        background: #dedede
        &.active
          width: 20px
          border-radius: 5px
          background: #000
</style>
