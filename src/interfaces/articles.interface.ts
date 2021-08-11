export interface IArticle {
  id: number;
  title: string;
  content: string;
  categorie: Icategorie;
  author: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export interface iSearch {
  id: number;
}

export interface Icategorie {
  id?: number;
  libelle: string;
}
export interface IArticlesResponse {
  status: number;
  result?: IArticle[];
}
export interface IcategorieResponse {
  status: number;
  result?: Icategorie[];
}

export interface ICommentArticle {
  id: number;
  message: string;
  createdAt: string;
  updatedAt: string;
}

export interface ICommentArticleResponse {
  status: number;
  result?: ICommentArticle[];
}
