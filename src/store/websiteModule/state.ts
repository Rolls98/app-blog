import { ICommentVideo, Ivideo } from "../../interfaces/video.interface";
import {
  IArticle,
  Icategorie,
  ICommentArticle,
} from "../../interfaces/articles.interface";
import { WebsiteState } from "../../interfaces/store/website.interface";

const state: () => WebsiteState = () => ({
  articles: [] as IArticle[],
  searchResults: [] as IArticle[] | Ivideo[],
  categories: [] as Icategorie[],
  videos: [] as Ivideo[],
  commentsVideo: [] as ICommentVideo[],
  commentsArticle: [] as ICommentArticle[],
});

export default state;
