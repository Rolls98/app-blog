<template>
  <div>
    <!-- video element -->
    <vue-plyr :options="options">
      <video controls playsinline data-poster="poster.jpg">
        <source :src="test" type="video/mp4" />
      </video>
      <!-- <iframe :src="test" frameborder="0"></iframe> -->
    </vue-plyr>
  </div>
</template>

<script>
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      test: "",
      renderComponent: true,
    };
  },
  props: {
    source: {
      type: String,
      required: true,
    },
  },
  methods: {
    forceRerender() {
      console.log(this.source, "ringo ringo");
      this.test = this.source;
      // Remove my-component from the DOM
      this.renderComponent = false;

      // If you like promises better you can
      // also use nextTick this way
      // this.test = this.source[0].src;
      console.log(this.source, "test test");
      this.$nextTick().then(() => {
        // Add the component back in

        // ("https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm");
        // "https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm";

        this.renderComponent = true;
      });
    },
  },
  mounted() {
    this.$refs.plyr.player.on("event", () => console.log("event fired"));
    this.test = this.source;
  },
  beforeMount() {
    // this.test = this.source.src;
    // this.test = "https://127.0.0.1:8000/uploads/Naruto-Ending-4-Alive.mp4";
    this.forceRerender();
  },
});
</script>

<style>
</style>