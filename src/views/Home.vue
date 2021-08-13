<template>
  <Default>
    <div>
      <main class="mt-5">
        <section class="m-section">
          <div class="container">
            <div class="row">
              <div
                class="col-lg-3 col-md-6 col-sm-6 col-12"
                v-for="(categorie, n) in categories"
                :key="n"
              >
                <div id="" class="categoy-card">
                  <img :src="categorie.image" alt="" class="img-fluid" />
                  <div class="title">
                    <h3>{{ categorie.libelle }}</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section class="section-presentation">
          <div class="container">
            <div class="row">
              <div
                class="col-lg-6 col-md-6 col-sm-12"
                v-if="firstArticle != ''"
              >
                <h2 class="secton-title">
                  {{ firstArticle.title }}
                </h2>
                <p class="section-p">
                  {{ firstArticle.content }}
                </p>
              </div>
              <div class="col-lg-6 col-md-6 col-sm-12">
                <div class="p-img">
                  <img :src="firstArticle.image" alt="" class="img-fluid" />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section class="section-article">
          <div class="container">
            <h2 class="secton-title text-center">Section Title</h2>
            <div class="row mt-5" v-if="eightArticles != ''">
              <div
                class="col-lg-3 col-md-4 col-sm-6 col-12"
                v-for="(item, i) in eightArticles"
                :key="i"
              >
                <div class="article">
                  <div class="illustration">
                    <img :src="item.image" alt="" class="imf-fluid" />
                  </div>
                  <div class="description">
                    <h3>{{ item.title }}</h3>
                    <p>{{ item.content | truncate(15, "...") }}</p>
                    <router-link
                      tag="button"
                      class="s-moreBtn"
                      :to="{ name: 'Article', params: { id: item.id } }"
                      >voir plus</router-link
                    >
                    <!-- <a href="detail-article.html">
                      <button class="s-moreBtn">voir plus</button></a
                    > -->
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section class="liste-video">
          <div class="container">
            <h2 class="secton-title text-center">Section Title</h2>
            <div class="row" v-if="threeVideos != ''">
              <div class="col-lg-4" v-for="(video, i) in threeVideos" :key="i">
                <router-link
                  tag="div"
                  :to="{ name: 'Video', params: { id: video.id } }"
                >
                  <div class="article article-video">
                    <yanVideo :sources="getSource(video.url)"></yanVideo>
                    <!-- <video controls> -->
                    <!-- <source
                      src="”http://techslides.com/demos/sample-videos/small.ogv”"
                      type="video/ogg"
                    /> -->
                    <!-- <source v-if="video" :src="video.url" type="video/mp4" />
                  </video> -->
                    <div class="description">
                      <div class="meta">
                        <span class="meta-span">{{
                          getDate(video.createdAt)
                        }}</span>
                        <!-- <router-link
                        tag="span"
                        class="meta-category"
                        :to="{ name: 'Video', params: { id: video.id } }"
                        >{{ video.categorie.libelle }}</router-link
                      > -->
                        <span class="meta-category">{{
                          video.categorie.libelle
                        }}</span>
                      </div>
                      <h3>
                        {{ video.content | truncate(15, "...") }}
                      </h3>

                      <!-- <div class="player-icon">
                      <span class="material-icons-outlined"> play_circle </span>
                    </div> -->
                    </div>
                  </div>
                </router-link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <div class="contact-section">
        <div class="container">
          <div class="row">
            <div class="col-lg-4">
              <h2 class="secton-title">Contacter-Nous</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Error,
                ducimus quis! Hic amet iure quisquam?
              </p>
            </div>
            <div class="col-lg-6">
              <form action="">
                <div class="form-group">
                  <label for="">Nom</label>
                  <input id="" type="text" name="" class="form-control" />
                </div>
                <div class="form-group">
                  <label for="">E-mail</label>
                  <input id="" type="email" name="" class="form-control" />
                </div>

                <div class="form-group">
                  <label for="">Message</label>
                  <textarea id="" name="" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Default>
</template>

<script lang="ts">
import { IArticle, Icategorie } from "@/interfaces/articles.interface";
import { Ivideo } from "@/interfaces/video.interface";
import yanVideo from "@/components/video.vue";
import Vue from "vue";
// import Default from "../layouts/Default.vue";
export default Vue.extend({
  components: {
    yanVideo,
  },
  filters: {
    truncate(text: string, length: number, suffix: string) {
      if (text.length > length) {
        return text.substring(0, length) + suffix;
      } else {
        return text;
      }
    },
  },
  methods: {
    getDate(localDate: string) {
      let myDate = new Date(localDate);
      return myDate.toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    },
    getSource(url: string): any {
      return [
        {
          type: "video/mp4",
          // src: "https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm",
          src: url,
        },
      ];
    },
  },
  computed: {
    listArticles(): IArticle[] {
      return this.$store.getters["websiteModule/articles"];
    },
    firstArticle(): IArticle {
      return this.$store.getters["websiteModule/articles"]
        ? this.$store.getters["websiteModule/articles"][0]
        : "";
    },
    eightArticles(): IArticle[] {
      return this.$store.getters["websiteModule/articles"]
        ? this.$store.getters["websiteModule/articles"].slice(0, 8)
        : "";
    },
    threeVideos(): Ivideo[] {
      return this.$store.getters["websiteModule/videos"]
        ? this.$store.getters["websiteModule/articles"].slice(0, 3)
        : "";
    },
    categories(): Icategorie[] {
      return this.$store.getters["websiteModule/categories"];
    },
  },
  // async beforeMount(): Promise<void> {
  //   await Promise.all([
  //     this.$store.dispatch("websiteModule/fetchArticles"),
  //     this.$store.dispatch("websiteModule/fetchVideos"),
  //     this.$store.dispatch("websiteModule/fetchCategories"),

  //     // this.$store.dispatch("websiteModule/fetchArticles"),
  //     // this.$store.dispatch("websiteModule/fetchVideos"),
  //   ]);
  //   console.log(this.$store.getters["websiteModule/articles"]);
  // },
});
</script>
