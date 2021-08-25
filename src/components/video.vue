<template>
  <div>
    <!-- vjs-big-play-centered -->
    <video-player
      v-if="isPlayable"
      class="video-js vjs-default-skin vjs-big-play-centered"
      controls
      width="100%"
      height="100%"
      ref="videoPlayer"
      :options="playerOptions"
      :playsinline="true"
      customEventName="customstatechangedeventname"
      @play="onPlayerPlay($event)"
      @pause="onPlayerPause($event)"
      @ended="onPlayerEnded($event)"
      @waiting="onPlayerWaiting($event)"
      @playing="onPlayerPlaying($event)"
      @loadeddata="onPlayerLoadeddata($event)"
      @timeupdate="onPlayerTimeupdate($event)"
      @canplay="onPlayerCanplay($event)"
      @canplaythrough="onPlayerCanplaythrough($event)"
      @statechanged="playerStateChanged($event)"
      @ready="playerReadied"
      :responsive="true"
    >
    </video-player>
  </div>
</template>
 
<script lang="ts">
// Similarly, you can also introduce the plugin resource pack you want to use within the component
// import 'some-videojs-plugin'
import Vue from "vue";
export default Vue.extend({
  props: {
    sources: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      isPlayable: true,
      playerOptions: {
        // videojs options
        // aspectRatio: "vjs-4-3",
        aspectRatio: "16:9",
        fluid: true,
        muted: true,
        language: "en",
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        sources: [
          {
            type: "video/mp4",
            // src: "https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm",
            src: "https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm",
          },
        ],
        poster: "/static/images/author.jpg",
      },
    };
  },
  beforeMount() {
    this.forceRerender();
    // console.log(this.sources);

    // console.log();

    // this.$refs.videoPlayer.options = {
    //   // videojs options
    //   // aspectRatio: "vjs-4-3",
    //   aspectRatio: "16:9",
    //   fluid: true,

    //   muted: true,
    //   language: "en",
    //   playbackRates: [0.7, 1.0, 1.5, 2.0],
    //   sources: [
    //     {
    //       type: "video/mp4",
    //       src: "http://vjs.zencdn.net/v/oceans.mp4",
    //     },
    //   ],
    //   poster: "/static/images/author.jpg",
    // };
    console.log("this is current player instance object", this.player);
    // this.playerOptions = this.yanOptions;
  },
  computed: {
    player() {
      return this.$refs.videoPlayer.player;
    },
    // playerOptions() {
    //   let url = this.url;

    //   return {
    //     aspectRatio: "16:9",
    //     fluid: true,
    //     muted: true,
    //     language: "en",
    //     playbackRates: [0.7, 1.0, 1.5, 2.0],
    //     sources: [
    //       {
    //         type: "video/mp4",
    //         src: url,
    //       },
    //     ],
    //     poster: "/static/images/author.jpg",
    //   };
    // },
  },
  methods: {
    forceRerender() {
      // Remove my-component from the DOM
      this.isPlayable = true;
      console.log(this.sources, "patitwo");

      // If you like promises better you can
      // also use nextTick this way
      this.$nextTick().then(() => {
        // Add the component back in
        // this.isPlayable = true;
        this.$refs.videoPlayer.options.sources = this.sources;
      });
    },
    // listen event
    onPlayerPlay(player: any) {
      // console.log('player play!', player)
    },
    onPlayerPause(player: any) {
      // console.log('player pause!', player)
    },
    // ...player event

    // or listen state event
    playerStateChanged(playerCurrentState: any) {
      // console.log('player current update state', playerCurrentState)
    },

    // player is ready
    playerReadied(player: any) {
      console.log("the player is readied", player);
      // you can use it to do something...
      // player.[methods]
    },
  },
  watch: {
    sources: {
      handler(n, o) {
        this.forceRerender();
      },
      deep: true,
    },
  },
});
</script>
<style scoped>
.video-js {
  height: fit-content;
  width: 100%;
}
</style>