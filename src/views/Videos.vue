<template>
  <!-- <default-layout> -->
  <Default>
    <main class="mt-5">
      <div class="container">
        <div class="row">
          <div class="col-lg-8">
            <div class="row">
              <div class="col-lg-6" v-for="(video, i) in getItems" :key="i">
                <div class="article article-video">
                  <yanVideo :sources="getSource(video.url)"></yanVideo>
                  <div class="description">
                    <div class="meta">
                      <span class="meta-span">
                        {{ getDate(video.createdAt) }}</span
                      >
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
              </div>

              <!-- pagination -->
              <div class="m-pagination text-center">
                <paginate
                  :page-count="getPageCount"
                  :click-handler="clickCallback"
                  prev-text="<"
                  next-text=">"
                  :container-class="'className'"
                >
                </paginate>
                <!-- <ul>
                  <li class="active-p">1</li>
                  <li>2</li>
                  <li>3</li>
                  <li>4</li>
                  <li class="list-span">suivant</li>
                </ul> -->
              </div>
              <!-- pub box -->
              <div class="card mt-5" style="padding: 1.5rem" />
            </div>
          </div>
          <div class="col-lg-4 mb-5">
            <div class="sidebar">
              <div class="cat-widget mb-5">
                <h3 class="sibar-t">recherche</h3>
                <form action="" class="d-flex">
                  <input type="text" class="form-control" />
                  <button type="submit" class="btn-form">
                    <span class="material-icons-outlined"> search </span>
                  </button>
                </form>
              </div>
              <div class="cat-widget mt-5">
                <h3 class="sibar-t">Vidéos récents</h3>
                <a href="">
                  <div class="recents d-flex">
                    <div class="img-r">
                      <video controls>
                        <source
                          src="”http://techslides.com/demos/sample-videos/small.ogv”"
                          type="video/ogg"
                        />
                        <source
                          src="/build/videos/arcnet.io(7-sec).mp4"
                          type="video/mp4"
                        />
                      </video>
                    </div>
                    <p>Lorem ipsum dolor ipsum dolor sit amettyyrty.</p>
                  </div>
                </a>
              </div>
              <div class="cat-widget mt-5">
                <h3 class="sibar-t">categorie</h3>
                <ul>
                  <li v-for="(categorie, n) in categories" :key="n">
                    <a href="">{{ categorie.libelle }}</a>
                  </li>
                  <!-- <li><a href="">categorie 2</a></li>
                  <li><a href="">categorie 3</a></li>
                  <li><a href="">categorie 4</a></li> -->
                </ul>
              </div>
              <div class="cat-widget mt-5">
                <h3 class="sibar-t">Réseaux sociaux</h3>
                <div class="row">
                  <div class="col-lg-3 col-md-6 social face text-center">
                    <a href="">Facebook</a>
                  </div>
                  <div class="col-lg-3 col-md-6 social lin text-center">
                    <a href="">Linkedin</a>
                  </div>
                  <div class="col-lg-3 col-md-6 social you text-center">
                    <a href="">Youtube</a>
                  </div>
                  <div class="col-lg-3 col-md-6 social text-center">
                    <a href="">E-mail</a>
                  </div>
                </div>
              </div>
              <div class="cat-widget mt-5">
                <h3 class="sibar-t">publicité</h3>
                <div class="pub" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </Default>
  <!-- </default-layout> -->
</template>

<script lang="ts">
import { Ivideo } from "@/interfaces/video.interface";
import yanVideo from "@/components/video.vue";
import Vue from "vue";
import { Icategorie } from "@/interfaces/articles.interface";
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
  data() {
    return {
      parPage: 1,
      currentPage: 1,
    };
  },
  methods: {
    clickCallback: function (pageNum: number) {
      this.currentPage = Number(pageNum);
    },
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
    getItems(): Ivideo[] {
      if (this.videos) {
        let current = this.currentPage * this.parPage;
        let start = current - this.parPage;
        return this.videos.slice(start, current);
      }
      return new Object() as Ivideo[];
    },
    getPageCount(): number {
      if (this.videos) {
        return Math.ceil(this.videos.length / this.parPage);
      }
      return 0;
    },
    videos(): Ivideo[] {
      return this.$store.getters["websiteModule/videos"];
    },
    categories(): Icategorie[] {
      return this.$store.getters["websiteModule/categories"];
    },
  },
  // beforeMount() {
  //   this.videos = this.$store.getters["websiteModule/videos"];
  // },
});
</script>

<style>
.m-pagination a {
  vertical-align: middle !important;
}
.m-pagination ul li:hover {
  background-color: #1b6068;
  color: white;
}
.m-pagination ul li a:hover {
  color: white;
}
.m-pagination ul li .active {
  background-color: #1b6068;
  color: white;
}
</style>