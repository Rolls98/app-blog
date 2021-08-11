import { WebsiteState } from "../../interfaces/store/website.interface";
import { ICommentVideo, Ivideo } from "../../interfaces/video.interface";
import {
  IArticle,
  ICommentArticle,
  Icategorie,
} from "../../interfaces/articles.interface";
export default {
  updateArticles(state: WebsiteState, articles: IArticle[]): void {
    state.articles = articles;
  },
  updateVideos(state: WebsiteState, videos: Ivideo[]): void {
    state.videos = videos;
  },
  updateCommentsArticle(
    state: WebsiteState,
    commentsArticle: ICommentArticle[],
  ): void {
    state.commentsArticle = commentsArticle;
  },
  updateCommentsVideo(
    state: WebsiteState,
    commentsVideo: ICommentVideo[],
  ): void {
    state.commentsVideo = commentsVideo;
  },
  updateCategories(state: WebsiteState, categories: Icategorie[]): void {
    state.categories = categories;
  },
};
