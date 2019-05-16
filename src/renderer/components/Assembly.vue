npm<template lang="pug">

  .Assembly

    md-button.md-icon-button.Sidebar(@click="toggleSidebar")
      md-icon menu
      //| Menu
      
    Sidebar(ref="sidebar")

    ContextMenu(ref='ContextMenu')

    ObjectMutateModal(ref='MutateModal')


    canvas(@mousedown="onMouseDown", @mouseup="onMouseUp", @mousemove="onMouseMove" id="mainCanvas")

    //md-button.Pause(@click="togglePause")
      //md-icon pause
      //| Pause

</template>

<script>
import store from '../store';
import Sidebar from './Sidebar';
import ContextMenu from './ContextMenu';
import ObjectMutateModal from './ObjectMutateModal';
import World from '../gl/World';
import { EventBus } from '../GlobalEventBus';

export default {
  name: 'Assembly',
  components: { Sidebar, ContextMenu, ObjectMutateModal },
  mounted () {
    const canvas = this.$el.querySelector('canvas')
    world.viewport(canvas, true);
    world.tick()

    EventBus.$on('open-context-menu', (function(event) {
      this.$refs.ContextMenu.open(event.event, event.context);
    }).bind(this));
    
    EventBus.$on('close-context-menu', (function(event) {
      this.$refs.ContextMenu.close();
    }).bind(this));

    EventBus.$on('open-mutate-object', (function(event) {
      this.$refs.MutateModal.open(event.config, event.callback);
    }).bind(this));
    
  },
  methods: {
    
    toggleSidebar () {
      this.$refs.sidebar.toggle();
    },

    togglePause () {
    },

    onMouseDown(event) {
      event.preventDefault();
      world.handleMouseDown(event);
    },

    onMouseUp(event) {
      event.preventDefault();
      world.handleMouseUp(event);
    },

    onMouseMove(event) {
      event.preventDefault();
      world.handleMouseMove(event);
    }
  }
}

</script>

<style lang="stylus" scoped>

html, body, .Assembly
  min-height 100%

body
  font-family Helvetica, Arial, sans-serif
  font-size 12px
  background-color #359 !important
  margin 0px
  overflow hidden

canvas
  background #000
  position absolute
  top 0
  bottom 0
  left 0
  right 0
  width 100%
  height 100%
  z-index 0
  margin auto

#edit
  position absolute
  bottom 20px
  right 20px
  padding 8px
  text-decoration none
  background-color #fff
  color #555
  opacity 0.5

  &:hover
    opacity 1

.md-button
  z-index 2
  &, i
    color #eee !important
  &.Sidebar
    position absolute
    top 1em
    left 1em
  &.Pause
    position absolute
    bottom 1em
    right 1em

</style>
