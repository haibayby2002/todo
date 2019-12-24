<template>
  <div>
    <div class="input-group">
      <div class="timeSetting">
        <form action class="form-inline edit-form">
          <input type="checkbox" v-model="status" class="form-control mr-2" title="Bật/tắt lời nhắc">
          <input type="number" :title="this.hour + ' Giờ'" v-model="hour" class="form-control hour"  max="23" min="0" /><strong class="ml-1 mr-1">:</strong>
          <input type="number" :title="this.min + ' Phút'" v-model="min" class="form-control min"  max="59" min="0" />
        </form>
      </div>

      <!-- <div class="input-group-append bg-success ml-1"> -->
        <button class="input-group-text btn btn-success mr-2 ml-1" @click="save">Lưu</button>
      <!-- </div> -->
      
        <button class="input-group-text btn btn-danger" @click="remove">Xóa</button>
      
    </div>
  </div>
</template>

<script>
export default {
  name: "notify-item",
  props: {
    id: Number,
    time: Number,
    state: Number
  },
  data: function() {
    return {
      hour: 0,
      min: 0,
      //   second: 0,
      status: false,
      edditing: false
    };
  },
  mounted: function() {
    this.hour = Math.floor(this.time / 60);
    this.min = Math.floor(this.time % 60);
    this.status = this.state == 1;
    // this.second = this.time % 60;
  },
  methods: {
    save: function(){
      //Update state in database
      var knex = require("knex")({
        client: "sqlite3",
        connection: {
          filename: "./base.sqlite"
        },
        useNullAsDefault: true
      });
      knex("Notifies")
        .where({ id: this.id })
        .update({
          time: this.hour * 60 + this.min,
        })
        .catch(err => {
          console.log(err);
          throw err;
        })
        .finally(() => {
          knex.destroy();
        });
    },
    remove: function(){
      //Remove in db
      var knex = require("knex")({
        client: "sqlite3",
        connection: {
          filename: "./base.sqlite"
        },
        useNullAsDefault: true
      });
      knex("Notifies")
        .where({ id: this.id })
        .delete()
        .catch(err => {
          console.log(err);
          throw err;
        })
        .finally(() => {
          knex.destroy();
        });

        //Remove in arr
        this.$emit('delNotify', this.id);
    },
  },
  watch: {
    status: function(val){
      var knex = require("knex")({
        client: "sqlite3",
        connection: {
          filename: "./base.sqlite"
        },
        useNullAsDefault: true
      });
      knex("Notifies")
        .where({ id: this.id })
        .update({
          state: this.status,
        })
        .catch(err => {
          console.log(err);
          throw err;
        })
        .finally(() => {
          knex.destroy();
        });
    }
  }
};
</script>

<style scoped>
.edit-form{
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