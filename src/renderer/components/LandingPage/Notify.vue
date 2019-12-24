<template>
  <div class="jumbotron">
    <h4 class="text-center mb-3 mt-3 text-warning">Thiết lập giờ nhắc nhở</h4>
    <ul class="list-group">
      <li class="list-group-item" v-for="thing in listThings" :key="thing.id">
        <notify-item
          @delNotify="delNotify($event)"
          :id="thing.id"
          :time="thing.time"
          :state="thing.state"
        ></notify-item>
      </li>
    </ul>
    <hr />
    <!-- Add -->
    <form action class="form-inline edit-form text-center ml-3">
      <input
        type="number"
        :title="newHour + ' Giờ'"
        v-model="newHour"
        class="form-control hour"
        max="23"
        min="0"
      />
      <strong class="ml-1 mr-1">:</strong>
      <input
        type="number"
        :title="newMin + ' Phút'"
        v-model="newMin"
        class="form-control min"
        max="59"
        min="0"
      />
      <button class="btn btn-primary form-control ml-3" @click="addNotify">Thêm lời nhắc</button>
    </form>
  </div>
</template>

<script>
import NotifyItem from "./Notify/NotifyItem";
export default {
  name: "notify",
  components: { NotifyItem },
  props: {
    listNotifies: Array
  },
  data: function() {
    return {
      listThings: [
        { id: 1, time: 222, state: 1 },
        { id: 2, time: 342, state: 0 },
        { id: 3, time: 1350, state: 1 }
      ],
      newHour: 0,
      newMin: 0
    };
  },
  mounted: function() {
    var d = new Date();
    this.newHour = d.getHours();
    this.newMin = d.getMinutes();

    this.listThings = this.listNotifies;
  },
  computed: {
    maxId: function() {
      if (this.listThings.length == 0) {
        return 0;
      }
      return this.listThings.reduce((a, b) =>
        Number(a.id) > Number(b.id) ? a : b
      ).id;
    }
  },
  methods: {
    delNotify: function(val) {
      this.listThings.splice(this.listThings.findIndex(x => x.id == val), 1);
    },
    addNotify: function() {
      //Add to array
      
      // Add to db
      var knex = require("knex")({
        client: "sqlite3",
        connection: {
          filename: "./base.sqlite"
        },
        useNullAsDefault: true
      });
      var res = knex("Notifies")
        .insert({
          time: this.newHour * 60 + this.newMin,
          state: 1
        })
        .catch(err => {
          console.log(err);
          throw err;
        })
        .finally(() => {
          knex.destroy();
        });
        
      this.listThings.push({
        id: this.maxId + 1,
        time: this.newHour * 60 + this.newMin,
        state: 1
      });
    }
  }
};
</script>

<style scoped>
.edit-form {
  vertical-align: middle;
}
.hour {
  width: 2.2rem !important;
  padding: 0 !important;
  text-align: center;
}
.min {
  width: 2.2rem !important;
  padding: 0 !important;
  text-align: center;
}
</style>