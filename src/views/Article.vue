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
                      {{ article.title }}
                    </h1>
                    <div class="meta">
                      <span class="meta-span"> {{ article.author }}</span>
                      <span class="meta-span">
                        {{ getDate(article.createdAt) }}</span
                      >
                      <span class="material-icons-outlined meta-span">
                        share</span
                      >
                    </div>
                    <div class="illustration">
                      <img :src="article.image" alt="" class="imf-fluid" />
                    </div>
                    <div class="description">
                      <p>
                        {{ article.content }}
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
                        Laissez un Commentaire
                      </h3>
                      <form id="app" @submit="checkForm">
                        <div class="form-group">
                          <label for=""> Nom</label>
                          <input
                            type="text"
                            v-model="author"
                            required
                            class="form-control"
                          />
                        </div>

                        <div class="form-group">
                          <label for=""> Message</label>
                          <textarea
                            v-model="message"
                            required
                            class="form-control"
                          ></textarea>
                        </div>
                        <div class="form-group">
                          <button
                            class="Btn-form"
                            type="submit"
                            @submit="checkForm"
                            :disabled="isDisabled"
                          >
                            {{ action }}
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
                <h3 class="sibar-t">Articles récents</h3>
                <a href="" v-for="(article, i) in fourArticles" :key="i">
                  <div class="recents d-flex">
                    <div class="img-r">
                      <img :src="article.image" alt="" class="img-fluid" />
                    </div>
                    <!-- <router-link
                      :to="localRoute"
                    >
                      {{ article.content | truncate(10, "...") }}</router-link
                    > -->
                    <p @click="localRoute(article.id)">
                      {{ article.content | truncate(10, "...") }}
                    </p>
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
                <div class="pub"></div>
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
import searchResult from "@/components/searchResult.vue";
import { AppService } from "@/services/app.service";
import Vue from "vue";
// import defaultLayout from "./../layouts/defaultLayout.vue";
export default Vue.extend({
  components: {
    searchResult,
  },
  data() {
    return {
      article: {} as IArticle,
      comments: [] as ICommentResponse[],
      author: null as unknown as string,
      message: null as unknown as string,
      action: "Envoyer",
      search: "" as string,
      isDisabled: false,
      isSearch: false,
      hasResult: false,
      // resultArticles: [] as IArticle[],
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
    fourArticles(): IArticle[] {
      return this.$store.getters["websiteModule/articles"]
        ? this.$store.getters["websiteModule/articles"].slice(0, 4)
        : "";
    },
    categories(): Icategorie[] {
      return this.$store.getters["websiteModule/categories"];
    },
    allArticles(): IArticle[] {
      return this.$store.getters["websiteModule/articles"];
    },
  },
  methods: {
    localRoute(myId: number) {
      return this.$router.push({
        name: "Article",
        params: { id: myId.toString() },
      });
    },
    async localSearch(e) {
      e.preventDefault();
      if (this.search.length >= 1) {
        await this.searchArticles();
        this.isSearch = true;
      }
    },
    // },
    async searchArticles(): Promise<void> {
      const userService = new AppService();
      const result = await userService.searchArticles({ title: this.search });

      if (!result.status) {
        console.log(result, "search findind ");
        // this.resultArticles = result;
        this.$store.commit("websiteModule/updateSearchResults", result);
        // this.comments = result;
      } else {
        console.log("Erreur");
      }
    },
    async getArticle(): Promise<void> {
      let myId = parseInt(this.$route.params.id);
      console.log(myId);

      const userService = new AppService();
      const result = await userService.getOneArticle({ id: myId.toString() });

      if (!result.status) {
        // console.log(result);
        this.article = result as IArticle;
        console.log(result);
      } else {
        console.log("Erreur");
      }
    },
    async getCommentsArticle(): Promise<void> {
      let myId = parseInt(this.$route.params.id);
      console.log(myId);

      const userService = new AppService();
      const result = await userService.getCommentsArticle({
        id: myId.toString(),
      });

      if (!result.status) {
        // console.log(result, "commentaire ");
        this.comments = result;
      } else {
        console.log("Erreur");
      }
    },
    async postCommentArticle(): Promise<void> {
      let myId = this.$route.params.id;
      let data = {
        message: this.message,
        article: "/api/articles/" + myId,
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
    getDate(localDate: string) {
      let myDate = new Date(localDate);
      return myDate.toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
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
    async checkForm(e: any) {
      e.preventDefault();
      this.isDisabled = true;
      this.action = "Veillez patienter ...";
      if (this.author && this.message) {
        console.log("bien");
        await this.postCommentArticle();
        this.isDisabled = false;
        this.action = "Envoyer";
      } else {
        console.log("incorrect");
        this.isDisabled = false;
        this.action = "Envoyer";
        this.$swal.fire({
          position: "center",
          icon: "error",
          title: "Veuillez remplir correctement tous les champs",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    },
  },

  async beforeMount() {
    await this.getArticle();
    await this.getCommentsArticle();
  },
  watch: {
    search(n, o) {
      if (this.search.length == 0 && this.isSearch == true) {
        this.isSearch = false;
      }
    },
  },
});
</script>

<style>
</style>