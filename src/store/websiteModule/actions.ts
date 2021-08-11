import { WebsiteState } from "../../interfaces/store/website.interface";
import { AppService } from "../../services/app.service";
export default {
  async fetchArticles({
    commit,
    state,
  }: {
    commit: any;
    state: WebsiteState;
  }): Promise<void> {
    const userService = new AppService();
    const result = await userService.getArticles();

    if (!result.status) {
      // console.log("Bravo", result);
      commit("updateArticles", result);
    } else {
      console.log("Erreur");
    }
  },
  async fetchVideos({
    commit,
    state,
  }: {
    commit: any;
    state: WebsiteState;
  }): Promise<void> {
    const userService = new AppService();
    const result = await userService.getVideos();

    if (!result.status) {
      commit("updateVideos", result);
    } else {
      console.log("Erreur");
    }
  },
};
