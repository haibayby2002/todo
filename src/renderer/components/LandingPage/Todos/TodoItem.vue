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
          <input
            v-model="done"
            v-if="state == 0"
            type="checkbox"
            aria-label="Checkbox for following text input"
          />
          <span v-else-if="state == 1" class="glyphicon text-success">&#xe013;</span>
          <span v-else class="glyphicon text-danger">&#xe020;</span>
        </div>
      </div>

      <!--  -->

      <label
        v-if="!editting"
        v-bind:class="{ 'text-line': done }"
        class="form-control todo-label"
        @dblclick="edit"
      >{{title_data}}</label>
      <input
        v-else
        ref="input"
        type="text"
        class="form-control"
        aria-label="Text input with checkbox"
        v-model="editTemp"
        @keyup.esc="cancel_edit"
        @blur="cancel_edit"
        @keyup.enter="done_edit"
      />

      <!-- <div class="input-group-append">
        <a href="#" class="btn btn-danger form-control">&times;</a>
      </div>-->
      <button v-if="state < 2" type="button" class="close" aria-label="Close" @click="removeTodo">
        <span aria-hidden="true" style="color: red;">&times;</span>
      </button>
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
      title_data: "",
      done: false, //check or uncheck
      editting: false, //check if editting
      editTemp: "",
      status: false
    };
  },
  mounted: function() {
    this.title_data = this.title;
    // console.log(this.id);
    // var knex = require("knex")({
    //   client: "sqlite3",
    //   connection: {
    //     filename: "./base.db"
    //   }
    // });
  },
  methods: {
    edit: function() {
      if (this.state > 0) {
        return;
      }
      this.editTemp = this.title_data;
      this.editting = true;
      //console.log(this.$refs);

      this.$nextTick(function() {
        this.$refs.input.focus();
      });
    },
    cancel_edit: function() {
      this.editting = false;
    },
    done_edit: function() {
      this.title_data = this.editTemp;
      this.editting = false;
    },
    removeTodo: function() {
      const { dialog } = require("electron").remote;
      // dialog.showCertificateTrustDialog()
      const options = {
        type: "question",
        buttons: ["Có", "Không"],
        defaultId: 2,
        title: "Question",
        message: "Xác nhận xóa",
        detail: "Bạn có chắc chắn muốn xóa lời nhắc " + this.title
      };
      // dialog.showMessageBox(remote.getCurrentWindow(), options, (response) =>{
      //   console.log(response);
      // });
      dialog.showMessageBox(null, options, response => {
        if (response == 0) {
          // console.log('OK');
          this.$emit("removeTodoItem", this.id);
        }
      });
    }
  },
  computed: {
    // workId: function() {
    //   return "work_" + this.id;
    // }
  },
  watch: {
    // done: function(val){
    //   console.log(val);
    // }
  }
};
</script>
  
<style scoped>
.todo-label {
  background-color: rgba(255, 255, 255, 0.747);
  color: rgb(22, 20, 20);
}
.text-line {
  text-decoration: line-through;
}
</style>