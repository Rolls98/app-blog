import { ICommentVideo, Ivideo } from "../../interfaces/video.interface";
import {
  IArticle,
  Icategorie,
  ICommentArticle,
} from "../../interfaces/articles.interface";
import { WebsiteState } from "../../interfaces/store/website.interface";

const state: () => WebsiteState = () => ({
  articles: (null as unknown) as IArticle[],
  categories: (null as unknown) as Icategorie[],
  videos: (null as unknown) as Ivideo[],
  commentsVideo: (null as unknown) as ICommentVideo[],
  commentsArticle: (null as unknown) as ICommentArticle[],
});

export default state;
