<template>
  <!-- <default-layout> -->
  <Default>
    <main class="mt-5">
      <div class="container">
        <div class="row">
          <div class="col-lg-8">
            <div class="row">
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
                      <a href="detail-artile.html">
                        <button class="s-moreBtn">Lire la suite</button></a
                      >
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
          </div>
          <div class="col-lg-4">
            <div class="sidebar mt-5">
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
import Vue from "vue";
// import defaultLayout from "./../layouts/defaultLayout.vue";
export default Vue.extend({
  data() {
    return {
      parPage: 4,
      currentPage: 1,
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
});
</script>

<style>
</style>