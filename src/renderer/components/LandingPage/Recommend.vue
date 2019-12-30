<template>
  <div class="recommend">
    <!-- <recommend-item img_src="https://i.ytimg.com/vi/t75mcZBghzU/maxresdefault.jpg" :description="'lorem oda as dsa das das d asd as das d asd asd as dsa d as'"></recommend-item> -->
    <!-- <recommend-item v-for="video in videos" v-bind:key="video.id" 
      :img_src="video.img_src" 
      :id="video.id"
      :title="video.title"
      :description="video.description"  
    ></recommend-item>-->
    <div>
      <button type="submit" @click="shuffle"><span class="glyphicon">&#xe031;</span>Làm mới</button>
    </div>

    <recommend-item
      v-for="video in listVideo"
      v-bind:key="video.id"
      :img_src="video.img_src"
      :id="video.id"
      :title="video.title"
      :description="video.description"
    ></recommend-item>
  </div>
</template>

<script>
import RecommendItem from "./Recommend/RecommendItem";
const axios = require("axios");
let globalRec = [];
export default {
  name: "recommend",
  components: { RecommendItem },
  props: {
    // listTodo: Array
  },
  data: function() {
    return {
      listVideo: [],
      listTodo: []
    };
  },
  beforeCreate: function() {
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
      .where({
        state: 0
      })
      .then(rows => {
        rows.forEach(row => {
          // console.log(`${row["id"]} ${row["name"]} `);
          // console.log(row["name"]);
          this.getListVideo(row["name"]);
          this.listTodo.push(row["name"]);
        });
      })
      .catch(err => {
        console.log(err);
        throw err;
      })
      .finally(() => {
        knex.destroy();
      });
    console.log(globalRec);
  },

  mounted: function() {
    this.shuffle();
  },
  methods: {
    filterItems: function() {
      return this.listTodo.filter(function(item) {
        return true;
      });
    },
    shuffle: function() {
      this.listVideo.splice(0);
      for (let i = 0; i < globalRec.length; i++) {
        let j = Math.floor(Math.random() * globalRec.length);
        let temp = globalRec[i];
        globalRec[i] = globalRec[j];
        globalRec[j] = temp;
      }
      for (let i = 0; i < globalRec.length && i < 20; i++) {
        this.listVideo.push(globalRec[i]);
      }
    },
    getListVideo: async function(q) {
      try {
        const response = await axios.get(
          "https://www.googleapis.com/youtube/v3/search",
          {
            params: {
              part: "snippet",
              maxResults: 10,
              q: encodeURI(q),
              key: "AIzaSyCGrBYHJFLkqAGW9rEbDUvG0YgdAYjR35k"
            }
          }
        );
        response.data.items.forEach(val => {
          globalRec.push({
            id: val.id.videoId || val.id.playlistId,
            title: val.snippet.title,
            description: val.snippet.description,
            img_src: val.snippet.thumbnails.medium.url
          });
        });
      } catch (error) {
        console.error(error);
      }
    }
  }
};
</script>

<style scoped>
.recommend {
  flex-wrap: wrap;
}
</style>