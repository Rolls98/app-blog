<template>
  <div>
    <!-- video element -->
    <vue-plyr :options="options">
      <video controls playsinline data-poster="poster.jpg">
        <source
          src="https://127.0.0.1:8000/uploads/Naruto-Ending-4-Alive.mp4"
          type="video/mp4"
        />
        <!-- <source
      size="1080"
      src="/path/to/video-1080p.mp4"
      type="video/mp4"
    />
    <track
      default
      kind="captions"
      label="English captions"
      src="/path/to/english.vtt"
      srclang="en"
    /> -->
      </video>
    </vue-plyr>
  </div>
</template>

<script>
import Vue from "vue";
export default Vue.extend({
  mounted() {
    this.$refs.plyr.player.on("event", () => console.log("event fired"));
  },
});
</script>

<style>
</style>