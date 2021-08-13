<template>
  <!-- <default-layout> -->
  <Default>
    <main class="mt-5">
      <div class="container">
        <div class="row">
          <div class="col-lg-8">
            <div class="row">
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
                      <hr class="my-5" />
                    </div>

                    <div class="form_c">
                      <h3 class="ml-3 mb-5n cmt-title">
                        Laissez un Commentaire
                      </h3>
                      <div class="form-group">
                        <label for=""> Nom</label>
                        <input type="text" class="form-control" />
                      </div>

                      <div class="form-group">
                        <label for=""> Message</label>
                        <textarea name="" id="" class="form-control"></textarea>
                      </div>
                      <div class="form-group">
                        <button class="Btn-form">Envoyer</button>
                      </div>
                    </div>
                  </div>
                </div>
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
                <a href="" v-for="(article, i) in fourArticles" :key="i">
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
} from "@/interfaces/articles.interface";
import { AppService } from "@/services/app.service";
import Vue from "vue";
// import defaultLayout from "./../layouts/defaultLayout.vue";
export default Vue.extend({
  data() {
    return {
      article: {} as IArticle,
      comments: [] as ICommentArticle[],
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
  },
  methods: {
    async getArticle(): Promise<void> {
      let myId = parseInt(this.$route.params.id);
      const userService = new AppService();
      const result = await userService.getOneArticle({ id: myId });

      if (!result.status) {
        // console.log(result);
        this.article = result[0] as IArticle;
      } else {
        console.log("Erreur");
      }
    },
    async getCommentsArticle(): Promise<void> {
      let myId = parseInt(this.$route.params.id);
      const userService = new AppService();
      const result = await userService.getCommentsArticle({ id: myId });

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
  beforeMount() {
    this.getArticle();
    this.getCommentsArticle();
  },
});
</script>

<style>
</style>