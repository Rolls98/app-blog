<template>
  <div>
    <div v-if="listArticles.length != 0">
      <div class="row">
        <div class="row mt-5">
          <div>
            <p>{{ listArticles.length }} resultats trouvé(s)</p>
          </div>
          <div class="col-12" v-for="(article, i) in getItems" :key="i">
            <div class="article-blog">
              <h3 class="article-blog-title">{{ article.title }}</h3>
              <div class="meta">
                <span class="meta-span"> {{ article.author }}</span>
                <span class="meta-span"> {{ getDate(article.createdAt) }}</span>
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
    </div>
    <div v-else>
      <p>Aucun resultat trouvé</p>
    </div>
  </div>
</template>

<script lang="ts">
import { IArticle } from "@/interfaces/articles.interface";
import { Ivideo } from "@/interfaces/video.interface";
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      parPage: 3,
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
  computed: {
    listArticles(): IArticle[] | Ivideo[] {
      return this.$store.getters["websiteModule/searchResults"];
    },
    getPageCount(): number {
      console.log(Math.ceil(this.listArticles.length / this.parPage), "wadjdp");

      if (this.listArticles) {
        return Math.ceil(this.listArticles.length / this.parPage);
      }
      return 0;
    },
    getItems(): IArticle[] | Ivideo[] {
      if (this.listArticles) {
        let current = this.currentPage * this.parPage;
        let start = current - this.parPage;
        return this.listArticles.slice(start, current);
      }
      return new Object() as IArticle[];
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
});
</script>

<style>
</style>