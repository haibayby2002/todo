<template>
  <div class="w-33 mt-2 pl-1 pr-1">
    <div class="card">
      <img :src="img_src" class="card-img-top" alt="Image" />
      <div class="card-body">
        <h5 class="card-title">Card title</h5>
        <p class="card-text my-card-text">{{description}} hello</p>
        <p class="card-text">
          <small class="text-muted">Last updated 3 mins ago</small>
        </p>
        <b-button block class="text-center" href="#" variant="danger" @click="openLesson">Go</b-button>
      </div>
    </div>

    <!-- <b-card
        title="Card Title"
        img-src="https://picsum.photos/600/300/?image=25"
        img-alt="Image"
        img-top
        tag="article"
        style=""
        class="mb-2 zoom">

    <b-card-text class="my-card-text">{{description}}</b-card-text>

    <b-button block class="text-center" href="#" variant="danger" @click="openLesson">Go</b-button>
    </b-card>-->

    <!-- <div class="card mb-3">
    <img src="..." class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">Card title</h5>
      <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
      <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
    </div>
    </div>-->
  </div>
</template>

<script>
export default {
  name: "recommend-item",
  props: {
    id: String,
    title: String,
    description: String,
    img_src: String,
    channel_title: String
  },
  data: function() {
    return {
    };
  },
  mounted: function() {
  },
  methods: {
    openLesson: function() {}
  }
};
</script>

<style scoped>
.card-group {
  display: inline;
}
.w-33 {
  -webkit-box-flex: 0;
  -ms-flex: 0 0 20% !important;
  flex: 0 0 20% !important;
  max-width: 25%;
  
  float: left;
}
.my-card-text {
  height: 4rem;
  max-height: 4rem;
  overflow-y: hidden;
}
.zoom {
}
.zoom:hover {
  transform: scale(1.5);
}
</style>