<template>
  <Default>
    <div>
      <!-- <loading
        :active="!SocketConnected"
        :opacity="0.8"
        loader="bars"
        :can-cancel="false"
        :is-full-page="true"
      ></loading> -->
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
                    <!-- <yanVideo :source="video.url"></yanVideo> -->
                    <yanVideo :source="video.url"></yanVideo>

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
              <form @submit="checkForm">
                <div class="form-group">
                  <label for="">Nom</label>
                  <input
                    id=""
                    type="text"
                    name=""
                    v-model="nom"
                    required
                    class="form-control"
                  />
                </div>
                <div class="form-group">
                  <label for="">E-mail</label>
                  <input
                    id=""
                    type="email"
                    name=""
                    v-model="email"
                    required
                    class="form-control"
                  />
                </div>

                <div class="form-group">
                  <label for="">Message</label>
                  <textarea id="" name="" v-model="message" required />
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
  </Default>
</template>

<script lang="ts">
import { IArticle, Icategorie } from "@/interfaces/articles.interface";
import { Ivideo } from "@/interfaces/video.interface";
import yanVideo from "@/components/lecteurVideo.vue";
import Vue from "vue";
import { AppService } from "@/services/app.service";
// import Default from "../layouts/Default.vue";
export default Vue.extend({
  components: {
    yanVideo,
  },
  data() {
    return {
      action: "Envoyer",
      isDisabled: false,
      nom: null as unknown as string,
      message: null as unknown as string,
      email: null as unknown as string,
      SocketConnected: false,
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

    async checkForm(e: any) {
      e.preventDefault();
      this.isDisabled = true;
      this.action = "Veillez patienter ...";
      if (this.email && this.message && this.nom) {
        console.log("bien");
        await this.postContact();
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
    async postContact(): Promise<void> {
      let data = {
        nom: this.nom,
        email: this.email,
        message: this.message,
      };
      console.log(data);

      const userService = new AppService();
      const result = await userService.postContact(data);
      console.log(result);
      if (!result.status) {
        this.message = "";
        this.nom = "";
        this.email = "";
        // this.$swal("Votre comentaire a bien été enregistré");
        this.$swal.fire({
          position: "center",
          icon: "success",
          title:
            "Votre message  a bien été envoyé , nous vous repondrons sous peu",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        console.log("Erreur");
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
        ? this.$store.getters["websiteModule/videos"].slice(0, 3)
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
