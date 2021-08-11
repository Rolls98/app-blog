import { Icategorie } from "./../articles.interface";
import { ICommentVideo, Ivideo } from "./../video.interface";
import { IArticle, ICommentArticle } from "../articles.interface";

export interface WebsiteState {
  articles: IArticle[];
  categories: Icategorie[];
  videos: Ivideo[];
  commentsVideo: ICommentVideo[];
  commentsArticle: ICommentArticle[];
}
