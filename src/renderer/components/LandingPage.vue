<template>
  <div id="wrapper">
    <!-- <img id="logo" src="~@/assets/logo.png" alt="electron-vue" /> -->
    <main>
      <!-- <div class="left-side">
        <span class="title">Welcome to your new project!</span>
        <div>
          <todos />
        </div>
      </div>

      <div class="right-side">
        <div class="doc">
          <div class="title">Getting Started</div>
          <p>
            electron-vue comes packed with detailed documentation that covers everything from
            internal configurations, using the project structure, building your application,
            and so much more.
          </p>
          <button
            @click="open('https://simulatedgreg.gitbooks.io/electron-vue/content/')"
          >Read the Docs</button>
          <br />
          <br />
        </div>
        <div class="doc">
          <div class="title alt">Other Documentation</div>
          <button class="alt" @click="open('https://electron.atom.io/docs/')">Electron</button>
          <button class="alt" @click="open('https://vuejs.org/v2/guide/')">Vue.js</button>
        </div>
      </div>-->
      <div class="row">
        <div class="col-12 col-lg-6">
          <todos :things="todos"/>
        </div>
        <div class="col-12 col-lg-5">
          <notify :listNotifies="notifies"/>
        </div>
      </div>
      <hr class="bg-success text-success">
      <h3 class="text-center text-primary mb-2 mt-1">Đề xuất cho bạn</h3>
      <div class="row">
        <recommend :listTodo="todos"/>
      </div>
    </main>
    <!-- Test -->
    <!-- <ul>
      <li v-for="(test, idx) in tests" v-bind:key="idx">{{test}}</li>
    </ul> -->
  </div>
</template>

<script>
import Todos from "./LandingPage/Todos";
import Recommend from "./LandingPage/Recommend";
import Notify from "./LandingPage/Notify";
var globalTodo = [];
var globalTime = [];
export default {
  name: "landing-page",
  components: { Todos, Recommend, Notify },
  data: function(){
    return {
      todos: [],
      notifies: [],
      tests: [],
    }
  },
  mounted: function() {
    var knex = require("knex")({
      client: "sqlite3",
      connection: {
        filename: "./base.sqlite"
      },
      useNullAsDefault: true
    });
    
    var res = knex
      .select("*")
      .from("tasks")
      .then(rows => {
        rows.forEach(row => {
          // console.log(`${row["id"]} ${row["name"]} `);
          (this.todos).push({
              "id" : row["id"], 
              "title": row["name"],
              "state": row["state"],
              "description": row["description"]
          });
          
          // this.tests.push(row["name"]);
          // console.log(row);
        });
      })
      .catch(err => {
        console.log(err);
        throw err;
      })
      .finally(() => {
        knex.destroy();
      });

      var not = knex
      .select("*")
      .from("Notifies")
      .then(rows => {
        rows.forEach(row => {
          (this.notifies).push({
              "id" : row["id"], 
              "time": row["time"],
              "state": row["state"],
          });
          // console.log(row);
        });
      })
      .catch(err => {
        console.log(err);
        throw err;
      })
      .finally(() => {
        knex.destroy();
      });
      

  },
  methods: {
    open(link) {
      this.$electron.shell.openExternal(link);
    }
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Source+Sans+Pro");

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: "Source Sans Pro", sans-serif;
}

#wrapper {
  background: radial-gradient(
    ellipse at top left,
    rgba(255, 255, 255, 1) 40%,
    rgba(229, 229, 229, 0.9) 100%
  );
  /* height: 100vh; */
  padding: 60px 80px;
  width: 100vw;
}

#logo {
  height: auto;
  margin-bottom: 20px;
  width: 420px;
}

main {
  display: flex;
  justify-content: space-between;
}

main > div {
  flex-basis: 50%;
}

.left-side {
  display: flex;
  flex-direction: column;
}

.welcome {
  color: #555;
  font-size: 23px;
  margin-bottom: 10px;
}

.title {
  color: #2c3e50;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 6px;
}

.title.alt {
  font-size: 18px;
  margin-bottom: 10px;
}

.doc p {
  color: black;
  margin-bottom: 10px;
}

.doc button {
  font-size: 0.8em;
  cursor: pointer;
  outline: none;
  padding: 0.75em 2em;
  border-radius: 2em;
  display: inline-block;
  color: #fff;
  background-color: #4fc08d;
  transition: all 0.15s ease;
  box-sizing: border-box;
  border: 1px solid #4fc08d;
}

.doc button.alt {
  color: #42b983;
  background-color: transparent;
}
</style>
