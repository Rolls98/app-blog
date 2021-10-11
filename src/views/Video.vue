<template>
  <!-- <default-layout> -->
  <Default>
    <main class="mt-5">
      <div class="container">
        <div class="row">
          <div class="col-lg-8">
            <div class="row" v-if="!isSearch">
              <div class="row mt-5">
                <div class="col-12">
                  <div class="article-blog">
                    <h1 class="article-blog-title">
                      {{ video.title }}
                    </h1>
                    <div class="meta">
                      <span class="meta-span"> {{ video.author }}</span>
                      <span class="meta-span">
                        {{ getDate(video.createdAt) }}</span
                      >
                      <span class="material-icons-outlined meta-span">
                        share</span
                      >
                    </div>
                    <div class="illustration">
                      <!-- <yanVideo :sources="getSource(video.url)"></yanVideo> -->
                      <yanVideo :source="getSource(video.url)"></yanVideo>
                    </div>
                    <div class="description">
                      <p>
                        {{ video.content }}
                      </p>
                    </div>
                    <hr class="hr" />
                  </div>
                </div>
                <div class="col-12">
                  <div class="commentaire">
                    <h3 class="ml-3 mb-5n cmt-title">Commentaires</h3>

                    <div
                      class="comment-text"
                      v-for="(comment, i) in comments"
                      :key="i"
                    >
                      <h4 class="cmt-name">{{ comment.author }}</h4>
                      <p>
                        {{ comment.message }}
                      </p>
                      <div class="d-flex justify-content-end">
                        <p>
                          {{ getDateComment(comment.createdAt) }}
                        </p>
                      </div>
                      <hr class="my-5" />
                    </div>

                    <div class="form_c">
                      <h3 class="ml-3 mb-5n cmt-title">
                        Laissez un Commentaires
                      </h3>
                      <form id="app" @submit="checkForm">
                        <div class="form-group">
                          <label for=""> Nom</label>
                          <input
                            type="text"
                            v-model="author"
                            class="form-control"
                          />
                        </div>

                        <div class="form-group">
                          <label for=""> Message</label>
                          <textarea
                            v-model="message"
                            class="form-control"
                          ></textarea>
                        </div>
                        <div class="form-group">
                          <button
                            class="Btn-form"
                            type="submit"
                            @submit="checkForm"
                          >
                            Envoyer
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <searchResult v-else></searchResult>
          </div>
          <div class="col-lg-4">
            <div class="sidebar mt-5">
              <div class="cat-widget mb-5">
                <h3 class="sibar-t">recherche</h3>
                <form @submit="localSearch" class="d-flex">
                  <input type="text" v-model="search" class="form-control" />
                  <button
                    @submit="localSearch"
                    :disabled="search.length == 0"
                    class="btn-form"
                  >
                    <span class="material-icons-outlined"> search </span>
                  </button>
                </form>
              </div>
              <div class="cat-widget mt-5">
                <h3 class="sibar-t">Vidéos récents</h3>
                <a href="">
                  <div class="recents d-flex">
                    <div class="img-r">
                      <yanVideo :sources="getSource(video.url)"></yanVideo>
                      <!-- <yanVideo></yanVideo> -->
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
import {
  IArticle,
  Icategorie,
  ICommentArticle,
  ICommentResponse,
} from "@/interfaces/articles.interface";
import yanVideo from "@/components/lecteurVideo.vue";
import searchResult from "@/components/searchResult.vue";
import { ICommentVideo, Ivideo } from "@/interfaces/video.interface";
import { AppService } from "@/services/app.service";
import Vue from "vue";
// import defaultLayout from "./../layouts/defaultLayout.vue";
export default Vue.extend({
  components: {
    yanVideo,
    searchResult,
  },
  data() {
    return {
      video: {} as Ivideo,
      // comments: [] as ICommentVideo[],
      comments: [] as ICommentResponse[],
      author: null as unknown as string,
      message: null as unknown as string,
      isSearch: false,
      search: "" as string,
    };
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
  computed: {
    fourVideos(): Ivideo[] {
      return this.$store.getters["websiteModule/videos"]
        ? this.$store.getters["websiteModule/videos"].slice(0, 4)
        : "";
    },
    categories(): Icategorie[] {
      return this.$store.getters["websiteModule/categories"];
    },
    id() {
      return this.$route.params.id;
    },
  },
  methods: {
    async localSearch(e) {
      e.preventDefault();
      if (this.search.length >= 1) {
        await this.searchVideos();
        this.isSearch = true;
      }
    },
    getDateComment(localDate: string) {
      let myDate = new Date(localDate);
      return myDate.toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
      });
    },
    async searchVideos(): Promise<void> {
      const userService = new AppService();
      const result = await userService.searchVideos({ title: this.search });

      if (!result.status) {
        console.log(result, "search findind ");
        // this.resultArticles = result;
        this.$store.commit("websiteModule/updateSearchResults", result);
        // this.comments = result;
      } else {
        console.log("Erreur");
      }
    },
    getSource(url: string): any {
      return [
        {
          type: "video/mp4",
          src: url,
        },
      ];
    },
    async postCommentVideo(): Promise<void> {
      let myId = this.$route.params.id;
      let data = {
        message: this.message,
        video: "/api/videos/" + myId,
        author: this.author,
      };
      console.log(data);

      const userService = new AppService();
      const result = await userService.postCommentArticle(data);
      console.log(result);
      if (!result.status) {
        this.comments = [result, ...this.comments];

        console.log(result, "post effectué ");
        this.message = "";
        this.author = "";
        // this.$swal("Votre comentaire a bien été enregistré");
        this.$swal.fire({
          position: "center",
          icon: "success",
          title: "Votre comentaire a bien été enregistré",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        console.log("Erreur");
      }
    },
    async checkForm(e: any) {
      e.preventDefault();
      if (this.author && this.message) {
        console.log("bien");
        await this.postCommentVideo();
      } else {
        console.log("incorrect");
        this.$swal.fire({
          position: "center",
          icon: "error",
          title: "Veuillez remplir correctement tous les champs",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    },
    async getVideo(): Promise<void> {
      let myId = parseInt(this.$route.params.id);
      const userService = new AppService();
      const result = await userService.getOneVideo({ id: myId.toString() });

      if (!result.status) {
        // console.log(result);
        this.video = result as Ivideo;
      } else {
        console.log("Erreur");
      }
    },
    async getCommentsVideo(): Promise<void> {
      let myId = parseInt(this.$route.params.id);
      const userService = new AppService();
      const result = await userService.getCommentsVideo({
        id: myId.toString(),
      });

      if (!result.status) {
        console.log(result, "commentaire ");
        this.comments = result;
      } else {
        console.log("Erreur");
      }
    },
    getDate(localDate: string) {
      let myDate = new Date(localDate);
      return myDate.toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    },
  },
  async beforeMount() {
    await this.getVideo();
    await this.getCommentsVideo();
  },
  watch: {
    search(n, o) {
      if (this.search.length == 0 && this.isSearch == true) {
        this.isSearch = false;
      }
    },
    // id(n, o) {
    //   if (n) {
    //     console.log("nfifj");

    //     this.getVideo();
    //     this.getCommentsVideo();
    //   }
    // },
  },
});
</script>


<style>
</style>