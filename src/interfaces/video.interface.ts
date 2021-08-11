import { Icategorie } from "./articles.interface";
export interface ICommentVideo {
  id: number;
  message: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ICommentVideoResponse {
  status: number;
  result?: ICommentVideo[];
}

export interface Ivideo {
  id: 106;
  url: string;
  title: string;
  content: string;
  categorie: Icategorie;
  author: string;
  createdAt: string;
  updatedAt: string;
}
export interface IvideoResponse {
  status: number;
  result?: Ivideo[];
}
