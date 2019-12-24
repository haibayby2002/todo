<template>
  <div class="recommend">
    <recommend-item img_src="https://i.ytimg.com/vi/t75mcZBghzU/maxresdefault.jpg" :description="'lorem oda as dsa das das d asd as das d asd asd as dsa d as'"></recommend-item>
    <recommend-item img_src="https://i.ytimg.com/vi/t75mcZBghzU/maxresdefault.jpg" :description="'asdasadsasdasads dads sda sda ads sda sda s ad ads ads asd sadsadads asads a sd asd sda sda das sd asd asd as das d asd as das das d sad as dsa d asd as dasd as dsa d asd asd as akgnka va v avakv akv ava'"></recommend-item>
    <recommend-item img_src="https://i.ytimg.com/vi/t75mcZBghzU/maxresdefault.jpg" :description="'lorem oda as dsa das das d asd as das d asd asd as dsa d as'"></recommend-item>
    <recommend-item img_src="https://i.ytimg.com/vi/t75mcZBghzU/maxresdefault.jpg" :description="'lorem oda as dsa das das d asd as das d asd asd as dsa d as'"></recommend-item>
    <recommend-item img_src="https://i.ytimg.com/vi/t75mcZBghzU/maxresdefault.jpg" :description="'lorem oda as dsa das das d asd as das d asd asd as dsa d as'"></recommend-item>
    <recommend-item img_src="https://i.ytimg.com/vi/t75mcZBghzU/maxresdefault.jpg" :description="'lorem oda as dsa das das d asd as das d asd asd as dsa d as'"></recommend-item>
    <recommend-item img_src="https://i.ytimg.com/vi/t75mcZBghzU/maxresdefault.jpg" :description="'lorem oda as dsa das das d asd as das d asd asd as dsa d as'"></recommend-item>
    <recommend-item img_src="https://i.ytimg.com/vi/t75mcZBghzU/maxresdefault.jpg" :description="'lorem oda as dsa das das d asd as das d asd asd as dsa d as'"></recommend-item>

    <!-- <h1>{{listTodo.length}}</h1>
    <h2>{{aaa}} haha</h2> -->
  </div>
</template>

<script>
import RecommendItem from "./Recommend/RecommendItem";
export default {
  name: "recommend",
  components: { RecommendItem },
  props: {
    listTodo: Array
  },
  data: function() {
    return {
      listVideo: [],
      aaa: '',
    };
  },
  mounted: function() {
    console.log(this.listTodo);
    
  
  },
  methods: {}
};
</script>

<style scoped>
.recommend {
  flex-wrap: wrap;
}
</style>