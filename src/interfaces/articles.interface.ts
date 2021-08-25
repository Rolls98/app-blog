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
export interface IbarSearch {
  title: string;
}
export interface IContact {
  nom: string;
  email: string;
  message: string;
}
export interface IContactResponse {
  id: number;
  nom: string;
  email: string;
  message: string;
  status?: number;
}
export interface IComment {
  message: string;
  article?: string;
  video?: string;
  author: string;
}
export interface ICommentResponse {
  id?: number;
  message?: string;
  article?: string;
  video?: string;
  author?: string;
  createdAt?: string;
  updatedAt?: string;
  status?: number;
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
  createdAt: string;
  updatedAt: string;
  message?: string;

  article?: string;
  video?: string;
  author?: string;
  status?: number;
}

export interface ICommentArticleResponse {
  status: number;
  result?: ICommentArticle[];
}
