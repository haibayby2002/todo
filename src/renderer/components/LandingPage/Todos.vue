<template>
  <div class="todos mb-3">
    <b-card no-body>
      <b-tabs
        card
        end
        active-nav-item-class="font-weight-bold text-uppercase text-warning"
        active-tab-class="font-weight-bold text-success"
      >
        <b-tab title="Đang làm" active>
          <h4 class="text-center mb-3 bg-light pt-2 pb-2">Công việc lên kế hoạch đang làm!</h4>
          <b-card-text>
            <ul class="box-todo">
              <li v-for="todoThing in todoThings" v-bind:key="todoThing.id">
                <todo-item
                  v-bind:title="todoThing.title"
                  v-bind:id="todoThing.id"
                  v-bind:state="todoThing.state"
                  v-if="todoThing.state == 0"
                  @removeTodoItem="removeItem($event)"
                ></todo-item>
              </li>
            </ul>
            <hr>
            <!-- Add -->
            <b-input-group class="mt-4">
              <b-form-input
                v-model="newWorkplan"
                placeholder="Nhập workplan mới vào đây"
                @keyup.enter="addWorkplan"
              ></b-form-input>
              <b-input-group-append>
                <b-button variant="primary" @click="addWorkplan">Tạo</b-button>
              </b-input-group-append>
            </b-input-group>
          </b-card-text>
        </b-tab>
        <b-tab title="Ôn lại">
          <b-card-text>
            <h4 class="text-center mb-3 bg-light pt-2 pb-2">Việc đã xong</h4>
            <ul class="box-todo">
              <li v-for="todoThing in todoThings" v-bind:key="todoThing.id">
                <todo-item
                  v-bind:title="todoThing.title"
                  v-bind:id="todoThing.id"
                  v-bind:state="todoThing.state"
                  v-if="todoThing.state == 1"
                  @removeTodoItem="removeItem($event)"
                ></todo-item>
              </li>
            </ul>
          </b-card-text>
        </b-tab>
        <b-tab title="Lịch sử">
          <b-card-text>
            <h4 class="text-center mb-3 bg-light pt-2 pb-2">Việc đã xóa</h4>
            <ul class="box-todo">
              <li v-for="todoThing in todoThings" v-bind:key="todoThing.id">
                <todo-item
                  v-bind:title="todoThing.title"
                  v-bind:id="todoThing.id"
                  v-bind:state="todoThing.state"
                  v-if="todoThing.state == 2"
                ></todo-item>
              </li>
            </ul>
          </b-card-text>
        </b-tab>
      </b-tabs>
    </b-card>
  </div>
</template>

<script>
import TodoItem from "./Todos/TodoItem";
export default {
  name: "todos",
  components: { TodoItem },
  props: {
    things: Array
  },
  data: function() {
    return {
      todoThings: [
        // { title: "Hello", id: 1, state: 0 },
        // { title: "Hi", id: 2, state: 0 },
        // { title: "How are you", id: 3, state: 0 },
        // { title: "Don know", id: 4, state: 1 },
        // { title: "Hahaha", id: 5, state: 1 },
        // { title: "Why oh why", id: 6, state: 1 },
        // { title: "olalal", id: 7, state: 2 },
        // { title: "wafaa", id: 8, state: 2 }
      ],
      tab: 0,
      newWorkplan: ""
    };
  },
  mounted: function() {
    const path = require("path");
    this.todoThings = this.things;
  },
  computed: {
    maxId: function() {
      if (this.todoThings.length == 0) {
        return;
      }
      return this.todoThings.reduce((a, b) =>
        Number(a.id) > Number(b.id) ? a : b
      ).id;
    }
  },
  methods: {
    removeItem: function(val) {
      //Delete in todo or reivew
      this.todoThings.splice(this.todoThings.findIndex(x => x.id == val.id), 1);
      //Add to removed tag
      this.todoThings.push({
        id: val.id,
        title: val.title,
        state: 2,
        description: val.description
      });
      //Update state in database
      var knex = require("knex")({
        client: "sqlite3",
        connection: {
          filename: "./base.sqlite"
        },
        useNullAsDefault: true
      });
      knex("tasks")
        .where({ id: val.id })
        .update({
          state: 2
        })
        .catch(err => {
          console.log(err);
          throw err;
        })
        .finally(() => {
          knex.destroy();
        });
    },
    addWorkplan: function() {
      //Insert to db
      var knex = require("knex")({
        client: "sqlite3",
        connection: {
          filename: "./base.sqlite"
        },
        useNullAsDefault: true
      });
      var res = knex("tasks")
        .insert({
          name: this.newWorkplan,
          state: 0
        })
        .catch(err => {
          console.log(err);
          throw err;
        })
        .finally(() => {
          knex.destroy();
        });
      console.log(res);
      //insert to view
      this.todoThings.push({
        id: this.maxId + 1,
        title: this.newWorkplan,
        state: 0,
      });
      this.newWorkplan = '';
    }
  }
};
</script>

<style scoped>
.todos ul {
  list-style-type: none;
}
.box-todo {
  margin-top: 2rem;
  padding-right: 2rem;
  height: 300px; 
  overflow-y: scroll;
}
</style>