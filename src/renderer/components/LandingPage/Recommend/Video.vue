<template>
  <div class="videoWrapper"> 
    <iframe 
        width="560" 
        height="349"
        :src="'https://www.youtube.com/embed/' + id"
        autoplay
        controls=1
        ></iframe>
  </div>
</template>

<script>
export default {
  name: "video",
  props: ['id'],
  mounted: function() {
    
  }
};
</script>

<style scoped>
.videoWrapper {
    position: relative;
    padding-bottom: 56.25%; /* 16:9 */
    padding-top: 25px;
    height: 0;
}
.videoWrapper iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
</style>