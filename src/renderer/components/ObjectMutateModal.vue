<template>
<md-dialog :md-active.sync="showDialog" @md-closed="closed()">
  <md-dialog-title>{{name}}</md-dialog-title>
  <md-list>
    <md-list-item v-for="stringProp in stringProps" v-bind:key="stringProp.id">
        <md-field :name="stringProp.name">
          <label>{{stringProp.displayName}}</label>
          <md-input v-model="stringProp.value"/>
        </md-field>      
    </md-list-item>
  </md-list>

  <md-list>
    <md-list-item v-for="multiSelect in multiSelectProps" v-bind:key="multiSelect.id">
      <!-- <md-field>
        <label :for="String(multiSelect.id)">{{multiSelect.displayName}}</label>
        <md-select v-model="multiSelect.selected" :name="multiSelect.name" :id="String(multiSelect.id)" multiple>
          <md-option v-for="option in multiSelect.options" v-bind:key="option.value" :value="option.value">
            {{option.displayName}}
          </md-option>
        </md-select>
      </md-field> -->

      <md-field :name="multiSelect.name">
          <label>{{multiSelect.displayName}}</label>
          <md-input v-model="multiSelect.selectedString"/>
      </md-field>
    </md-list-item>
  </md-list>
  <md-dialog-actions>  
    <md-button @click="close(true)" class="md-primary">Save</md-button>
    <md-button @click="close(false)" class="md-accent">Cancel</md-button>
  </md-dialog-actions>
</md-dialog>
</template>

<script>
import store from '../store'
import World from '../gl/World'

export default {
  name: 'ObjectMutateModal',
  components: { },

  data: ()=> {
    return {
      writeChanges:false,
      showDialog:false,
      name: "Empty",
      stringProps: [],
      multiSelectProps: []
    }
  },

  created () {
    this._callback = ()=>{};
  },

  methods: {

      open(object, callback) {

        let idCount = 0;
        let multiId = 0;

        this.name = object.name;
        this._callback = callback;
        this.stringProps = [];
        this.multiSelectProps = [];
        this.writeChanges = false;

        object.props.forEach(prop => {
            switch(prop.type) {
              case("string"):
                this.stringProps.push({
                  name: prop.name,
                  displayName: prop.displayName,
                  value: prop.value,
                  id: idCount++
                });
              break;
              case("multi-select"):
                this.multiSelectProps.push({
                  name: prop.name,
                  displayName: prop.displayName,
                  selected: prop.selected,
                  selectedString: prop.selected.join(','),
                  options: prop.options,
                  id: multiId++
                });
              break;
            }
        });
        
        this.$forceUpdate();
        this.showDialog = true;

      },

      close(save) {
        this.writeChanges = save;
        this.showDialog = false;
      },

      closed() {

        if(this.writeChanges) {
          
          let result = {};

          this.stringProps.forEach(sp => {
            result[sp.name] = sp.value;
          });

          this.multiSelectProps.forEach(mp => {
            result[mp.name] = mp.selectedString.split(',').map(x => x.trim())
          });

          this._callback(result);

        }

      }

  },

}

</script>

<style scoped>

</style>
