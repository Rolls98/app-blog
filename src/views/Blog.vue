<template>
  <!-- <default-layout> -->
  <Default>
    <main class="mt-5">
      <div class="container">
        <div class="row">
          <div class="col-lg-8">
            <div class="row" v-if="!isSearch">
              <div class="row mt-5">
                <div class="col-12" v-for="(article, i) in getItems" :key="i">
                  <div class="article-blog">
                    <h3 class="article-blog-title">{{ article.title }}</h3>
                    <div class="meta">
                      <span class="meta-span"> {{ article.author }}</span>
                      <span class="meta-span">
                        {{ getDate(article.createdAt) }}</span
                      >
                    </div>
                    <div class="illustration">
                      <img :src="article.image" alt="" class="imf-fluid" />
                    </div>
                    <div class="description">
                      <p>
                        {{ article.content | truncate(45, "...") }}
                      </p>
                      <router-link
                        tag="button"
                        class="s-moreBtn"
                        :to="{ name: 'Article', params: { id: article.id } }"
                        >Lire la suite</router-link
                      >
                      <!-- <a href="detail-artile.html">
                        <button class="s-moreBtn">Lire la suite</button></a
                      > -->
                    </div>
                    <hr class="hr" />
                  </div>
                </div>
              </div>
              <!-- pagination -->
              <div class="m-pagination">
                <paginate
                  :page-count="getPageCount"
                  :click-handler="clickCallback"
                  prev-text="<"
                  next-text=">"
                  :container-class="'className'"
                >
                </paginate>
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
                <a href="" v-for="(article, i) in someArticles" :key="i">
                  <div class="recents d-flex">
                    <div class="img-r">
                      <img :src="article.image" alt="" class="img-fluid" />
                    </div>
                    <p>{{ article.content | truncate(10, "...") }}</p>
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
import { IArticle, Icategorie } from "@/interfaces/articles.interface";
import { AppService } from "@/services/app.service";
import searchResult from "@/components/searchResult.vue";
import Vue from "vue";
// import defaultLayout from "./../layouts/defaultLayout.vue";
export default Vue.extend({
  components: {
    searchResult,
  },
  data() {
    return {
      parPage: 4,
      currentPage: 1,
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
  methods: {
    getDate(localDate: string) {
      let myDate = new Date(localDate);
      return myDate.toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    },
    async localSearch(e) {
      e.preventDefault();
      if (this.search.length >= 1) {
        await this.searchArticles();
        this.isSearch = true;
      }
    },
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
    clickCallback: function (pageNum: number) {
      this.currentPage = Number(pageNum);
    },
  },
  computed: {
    getItems(): IArticle[] {
      if (this.listArticles) {
        let current = this.currentPage * this.parPage;
        let start = current - this.parPage;
        return this.listArticles.slice(start, current);
      }
      return new Object() as IArticle[];
    },

    categories(): Icategorie[] {
      return this.$store.getters["websiteModule/categories"];
    },
    someArticles(): IArticle[] {
      return this.$store.getters["websiteModule/articles"]
        ? this.$store.getters["websiteModule/articles"].slice(4, 8)
        : "";
    },

    getPageCount(): number {
      if (this.listArticles) {
        return Math.ceil(this.listArticles.length / this.parPage);
      }
      return 0;
    },
    listArticles(): IArticle[] {
      return this.$store.getters["websiteModule/articles"];
    },
  },
  // components: {
  //   defaultLayout,
  // },
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