import { Ivideo, ICommentVideo } from "../../interfaces/video.interface";
import {
  IArticle,
  ICommentArticle,
  Icategorie,
} from "../../interfaces/articles.interface";
import { WebsiteState } from "../../interfaces/store/website.interface";
export default {
  articles(state: WebsiteState): IArticle[] {
    return state.articles;
  },
  videos(state: WebsiteState): Ivideo[] {
    return state.videos;
  },
  commentsArticle(state: WebsiteState): ICommentArticle[] {
    return state.commentsArticle;
  },
  commentsVideo(state: WebsiteState): ICommentVideo[] {
    return state.commentsVideo;
  },
  categories(state: WebsiteState): Icategorie[] {
    return state.categories;
  },
};
