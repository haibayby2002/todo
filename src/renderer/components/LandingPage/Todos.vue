<template>
  <div class="todos">
    <b-card no-body>
      <b-tabs
        card
        end
        active-nav-item-class="font-weight-bold text-uppercase text-warning"
        active-tab-class="font-weight-bold text-success"
      >
        <b-tab title="Đang làm" class="box-todo" active>
          <h4 class="text-center mb-3 bg-light pt-2 pb-2">Công việc lên kế hoạch đang làm!</h4>
          <b-card-text>
            <ul>
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
          </b-card-text>
        </b-tab>
        <b-tab title="Ôn lại" class="box-todo">
          <b-card-text>
            <h4 class="text-center mb-3 bg-light pt-2 pb-2">Việc đã xong</h4>
            <ul>
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
        <b-tab title="Lịch sử" class="box-todo">
          <b-card-text>
            <h4 class="text-center mb-3 bg-light pt-2 pb-2">Việc đã xóa</h4>
            <ul>
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
    things: Array,
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
      tab: 0
    };
  },
  mounted: function() {
    const path = require("path");
    this.todoThings = this.things;
    // var knex = require("knex")({
    //   client: "sqlite3",
    //   connection: {
    //     filename: "./base.sqlite"
    //   },
    //   useNullAsDefault: true
    // });
    
    // var res = knex
    //   .select("*")
    //   .from("tasks")
    //   .then(rows => {
    //     rows.forEach(row => {
    //       // console.log(`${row["id"]} ${row["name"]} `);
    //       this.todoThings.push({
    //           "id" : row["id"], 
    //           "title": row["name"],
    //           "state": row["state"],
    //           "description": row["description"]
    //       });
    //       // console.log(row);
    //     });
    //   })
    //   .catch(err => {
    //     console.log(err);
    //     throw err;
    //   })
    //   .finally(() => {
    //     knex.destroy();
    //   });
    
  },
  methods: {
    removeItem: function(id) {
      console.log("remove id " + id);
      this.todoThings.splice(this.todoThings.findIndex(x => x.id == id), 1);
      //Remove id in database by using update
    }
  }
};
</script>

<style scoped>
.todos ul {
  list-style-type: none;
}
.box-todo {
  max-height: 400px;
  overflow-y: scroll;
}
</style>