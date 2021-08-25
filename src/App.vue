<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script src="js/jquery.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/js/bootstrap.bundle.min.js"></script>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  async beforeMount(): Promise<void> {
    await Promise.all([
      this.$store.dispatch("websiteModule/fetchArticles"),
      this.$store.dispatch("websiteModule/fetchVideos"),
      this.$store.dispatch("websiteModule/fetchCategories"),

      // this.$store.dispatch("websiteModule/fetchArticles"),
      // this.$store.dispatch("websiteModule/fetchVideos"),
    ]);
    // console.log(this.$store.getters["websiteModule/articles"]);
  },
});
</script>

<style>
@import "./assets/bootstrap.min.css";
@import "./assets/main.css";
@import "https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined|Material+Icons+Two+Tone|Material+Icons+Round|Material+Icons+Sharp";
@import "https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css";
@import "https://fonts.googleapis.com";
@import "https://fonts.gstatic.com";
@import "https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,800;0,900;1,100;1,200;1,300;1,400;1,600;1,900&display=swap";
</style>
