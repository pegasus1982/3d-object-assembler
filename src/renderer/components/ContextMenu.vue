<template>
<div>
    <div @contextmenu.prevent="$refs.ctxMenu.open">
    
    </div>

    <context-menu id="context-menu" ref="ctxMenu" class="myCtx">
        <div @click="item.execute()" class="contextItem" v-for="item in sortedItems" v-bind:key="item.id">
            <md-icon>{{item.icon}}</md-icon>
            <li>{{ item.name.replaceAll('_',' ') }}</li>
        </div>    
    </context-menu>

</div>
</template>

<script>

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};


import store from '@/store'
import World from '@/gl/World'
import contextMenu from 'vue-context-menu';

export default {
  name: 'ContextMenu',
  components: { contextMenu },

  data: ()=> {
      return {
          items: []
      };
  },

  methods: {

      open(event, desiredContext) {
        
        if(!desiredContext) return;

        let i = 0;
        let newContext = [];

        Object.keys(desiredContext).forEach(k => {
            
            let nameIcon = k.split('>');

            let sort = 0;
            if(nameIcon[2]) {
                sort = parseInt(nameIcon[2]);
            }

            newContext.push({
                id: i,
                sort: sort,
                name: nameIcon[0],
                icon: nameIcon[1],
                execute: desiredContext[k]
            });

            i++;

        });
        
        this.items = newContext;
        this.$forceUpdate();

        this.$refs.ctxMenu.open(event);

      },

      close() {

          this.$refs.ctxMenu.close();

      }

  },

  computed: {
    sortedItems: function() {
        
        if(this.items.length == 0) return [];

        function compare(a, b) {
            return a.sort - b.sort;
        }

        return this.items.sort(compare);
  }
}

}

</script>

<style>
.myCtx .ctx-menu {
    background-color: transparent;
    padding-top: 1px; 
    padding-bottom: 1px;
    min-width: 10px;
}
</style>

<style scoped>

div.contextItem {
    background-color: rgba(0, 0, 0, 0.4);
    cursor: pointer;
    user-select: none;
    color: white;
    border-bottom: 2px solid rgba(80%, 80%, 80%, 0.48);
    display: flex;
    padding-right: 5px;
    flex-direction: row;
    justify-content: flex-start;
}

div.contextItem > .md-icon {
    color: white;
    margin-right: 5px;
    margin-left: 0px;
    padding-left: 5px;

}

div.contextItem > li {
    white-space: nowrap;
    overflow: hidden;
}

div.contextItem:hover {
    background-color: rgba(78.8%, 78.8%, 78.8%, 0.8)
}

</style>
