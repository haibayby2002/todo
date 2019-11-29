<template>
  <div>
    <!-- <b-form-checkbox
      v-model="status"
      v-bind:id="workId"
      v-if="state == 0"   
    >
    
    </b-form-checkbox>
    <input type="checkbox" name="" id="">
    <label for="workId">{{title}} </label>-->
    <div class="input-group mb-3">
      <div class="input-group-prepend">
        <div class="input-group-text">
          <input type="checkbox" aria-label="Checkbox for following text input" />
        </div>
      </div>
      
      <!--  -->
      
      <label v-if="!editting" class="form-control" @dblclick="edit">{{title}}</label>
      <input v-else type="text" class="form-control" aria-label="Text input with checkbox" :value="editTemp"/>
    </div>
  </div>
</template>

<script>
// var sqlite3 = require('sqlite3').verbose();
export default {
  name: "todo-item",
  props: {
    id: Number,
    title: String,
    description: String,
    state: Number
  },
  data: function() {
    return {
      done: false, //check or uncheck
      editting: false, //check if editting
      editTemp: "",
      status: false
    };
  },
  methods: {
    edit: function(){
      this.editTemp = this.title;
      this.editting = true;
    }
  },
  computed: {
    workId: function() {
      return "work_" + this.id;
    }
  },
  watch: {}
};
</script>

<style scoped>
</style>