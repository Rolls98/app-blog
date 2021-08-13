<template>
  <div id="app">
    <router-view />
  </div>
</template>
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
    console.log(this.$store.getters["websiteModule/articles"]);
  },
});
</script>

<style>
@import "./assets/bootstrap.min.css";
@import "./assets/main.css";
</style>
