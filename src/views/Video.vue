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
                      <yanVideo :sources="getSource(video.url)"></yanVideo>
                      <!-- <video controls>
                        <source
                          src="”http://techslides.com/demos/sample-videos/small.ogv”"
                          type="video/ogg"
                        />
                        <source
                          src="/build/videos/arcnet.io(7-sec).mp4"
                          type="video/mp4"
                        />
                      </video> -->
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
                    <div class="comment-text">
                      <h4 class="cmt-name">name</h4>
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Earum excepturi ipsum porro perspiciatis officiis
                        perferendis?
                      </p>
                      <button class="rply-btn">repondre</button>
                    </div>
                    <div class="rply-text">
                      <h4 class="cmt-name">name</h4>
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Earum excepturi ipsum porro perspiciatis officiis
                        perferendis?
                      </p>
                      <button class="rply-btn">repondre</button>
                    </div>

                    <div class="form_c">
                      <h3 class="ml-3 mb-5n cmt-title">
                        Laissez un Commentaires
                      </h3>
                      <div class="form-group">
                        <label for=""> Nom</label>
                        <input type="text" class="form-control" />
                      </div>

                      <div class="form-group">
                        <label for=""> Message</label>
                        <textarea id="" name="" class="form-control" />
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
} from "@/interfaces/articles.interface";
import yanVideo from "@/components/video.vue";
import { ICommentVideo, Ivideo } from "@/interfaces/video.interface";
import { AppService } from "@/services/app.service";
import Vue from "vue";
// import defaultLayout from "./../layouts/defaultLayout.vue";
export default Vue.extend({
  components: {
    yanVideo,
  },
  data() {
    return {
      video: {} as Ivideo,
      comments: [] as ICommentVideo[],
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
  },
  methods: {
    getSource(url: string): any {
      return [
        {
          type: "video/mp4",
          // src: "https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm",
          src: url,
        },
      ];
    },
    async getVideo(): Promise<void> {
      let myId = parseInt(this.$route.params.id);
      const userService = new AppService();
      const result = await userService.getOneVideo({ id: myId });

      if (!result.status) {
        // console.log(result);
        this.video = result[0] as Ivideo;
      } else {
        console.log("Erreur");
      }
    },
    async getCommentsArticle(): Promise<void> {
      let myId = parseInt(this.$route.params.id);
      const userService = new AppService();
      const result = await userService.getCommentsVideo({ id: myId });

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
    this.getVideo();
    this.getCommentsArticle();
  },
});
</script>


<style>
</style>