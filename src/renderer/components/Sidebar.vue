<template lang="pug">
  md-drawer.md-left(ref="sidebar", id="sideNav", :md-active.sync="showNavigation")
    md-button(v-on:click="save()") Save
    md-button(v-on:click="load()") Load
    md-list
      md-list-item(v-on:click="recompute" md-expand)
        strong Tree
        md-list(slot='md-expand')
          md-list-item(v-for="group in getGroups()", :key="group.id" v-on:click="selectGroup(group)") {{group.name}}
      md-list-item(v-on:click="selectFile")
        md-icon file_upload
        span Load model
        input(type="file",ref="upload",v-on:change="uploadFile").Hidden
        md-divider
      md-list-item(md-expand)
        strong Selection
        md-list(slot="md-expand")
          md-list-item(v-on:click="setSelectionMode(2)") Node
          md-list-item(v-on:click="setSelectionMode(1)") Element
          md-list-item(v-on:click="setSelectionMode(0)") Face
          md-list-item(v-on:click="setSelectionMode(3)") Object
      md-divider
      md-list-item
        span Gravity
        md-switch(v-model="gravity")
      md-list-item
        span Collision detection
        md-switch(disabled, v-model="collision")
      md-list-item
        span Perspective projection
        md-switch(disabled, v-model="perspective")
</template>

<script>

import { EventBus } from '../GlobalEventBus';
const { dialog } = require('electron').remote

export default {
  name: 'Sidebar',
  
  mounted() {
    EventBus.$on('groups-changed', (function() {
      this.recompute();
    }).bind(this));
  },

  methods: {

    toggle () {
      this.showNavigation = !this.showNavigation;
    },

    selectFile () {
      this.$refs.upload.click()
    },

    setSelectionMode (mode) {
      world.setSelectionMode(mode);
    },

    selectGroup(group) {
      world.selectObject(group.obj, false);
    },

    load() {
      dialog.showOpenDialog({properties: ['openFile']}, (paths)=>{
        if(paths && paths.length) {

          try {

              world.saveLoad.load(world, paths[0]);

          } catch (err) {

              if(paths[0].includes('gltf')) {

                dialog.showErrorBox("Error: Unable to load file", "GLTF files are partial data, open the root save file");

              } else {

                dialog.showErrorBox("Error", "Unable to load file");
                
              }
              
              logErr(err);

          }

        }
      });
    },

    save() {
      dialog.showSaveDialog({}, (fileName) => {

        if(fileName) {

          try {

            world.saveLoad.save(world, fileName);

          } catch (err) {

              logErr(err);
              dialog.showErrorBox("Error", "Unable to save file");
              
          }

        }

      })
    },

    getChildren(group) {
      const children =  group.children();
      // A single item is represented as a group of size 1 so pretend the group has no children.
      if( children.length === 1) return [];
      else return children;
    },

    uploadFile (event) {
      if (!this.$refs.upload.files) return
      let reader = new FileReader()
      reader.onload = event => world.add(event.target.result)
      reader.readAsText(this.$refs.upload.files[0])
      event.currentTarget.value = '';
    },

    getGroups() {
      return world.getGroups();
    },

    recompute() {
      this.$forceUpdate();
    }

  },

  data: ()=> { 
    return {
      showNavigation: true,
      gravity: true
    };
  },

  computed: {

    // gravity: {
    //   get () {
    //     return true;
    //   },
    //   set (v) {
    //   }
    // },

    collision: {
      get () {
        return false
      },
      set (v) {

      }
    },

    perspective: {
      get () {
        return true
      },
      set (v) {

      }
    }
  }
}

</script>
<style>
/* .md-drawer {
  background-color: white;
} */
</style>
<style  scoped>
.Hidden{
  display: none;
  visibility: hidden;
}
.smallList {
  max-height: 30;
}
ul[dnd-list], ul[dnd-list] > li {
    position: relative;
}
</style>
