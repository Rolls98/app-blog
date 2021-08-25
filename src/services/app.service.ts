import { IvideoResponse } from "./../interfaces/video.interface";
import {
  IArticle,
  IArticlesResponse,
  IcategorieResponse,
  iSearch,
  IComment,
  ICommentResponse,
  IbarSearch,
  IContact,
  IContactResponse,
} from "./../interfaces/articles.interface";
import { CommonService } from "./Common.service";

export class AppService extends CommonService {
  async getArticles(): Promise<IArticlesResponse> {
    try {
      const { data }: { data: IArticlesResponse } = await this.client.get(
        "articles",
      );
      // localResult
      //
      return data;
    } catch (e) {
      console.log(e);
      return {
        status: 0,
      } as IArticlesResponse;
    }
  }

  async getVideos(): Promise<IvideoResponse> {
    try {
      const { data }: { data: IvideoResponse } = await this.client.get(
        "videos",
      );

      return data;
    } catch (e) {
      console.log(e);
      return {
        status: 0,
      } as IvideoResponse;
    }
  }
  async getCategories(): Promise<IcategorieResponse> {
    try {
      const { data }: { data: IcategorieResponse } = await this.client.get(
        "categories",
      );
      return data;
    } catch (e) {
      console.log(e);
      return {
        status: 0,
      } as IcategorieResponse;
    }
  }
  async getCommentsArticle(body: iSearch): Promise<IArticlesResponse> {
    try {
      const {
        data,
      }: {
        data: IArticlesResponse;
      } = await this.client.get(`/articles/${body.id}/comment_articles`, {
        params: body,
      });

      return data;
    } catch (e) {
      console.log(e);
      return {
        status: 0,
      } as IArticlesResponse;
    }
  }
  async getCommentsVideo(body: iSearch): Promise<IvideoResponse> {
    try {
      const {
        data,
      }: {
        data: IvideoResponse;
      } = await this.client.get(`/videos/${body.id}/comment_videos`, {
        params: body,
      });

      return data;
    } catch (e) {
      console.log(e);
      return {
        status: 0,
      } as IvideoResponse;
    }
  }
  async getOneArticle(body: iSearch): Promise<IArticlesResponse> {
    try {
      const { data }: { data: IArticlesResponse } = await this.client.get(
        `articles/${body.id}`,
        { params: body },
      );
      // localResult
      //
      return data;
    } catch (e) {
      console.log(e);
      return {
        status: 0,
      } as IArticlesResponse;
    }
  }
  async searchArticles(body: IbarSearch): Promise<IArticlesResponse> {
    try {
      const { data }: { data: IArticlesResponse } = await this.client.get(
        "articles",
        { params: body },
      );
      // localResult
      //
      return data;
    } catch (e) {
      console.log(e);
      return {
        status: 0,
      } as IArticlesResponse;
    }
  }
  async searchVideos(body: IbarSearch): Promise<IvideoResponse> {
    try {
      const { data }: { data: IvideoResponse } = await this.client.get(
        "videos",
        { params: body },
      );
      // localResult
      //
      return data;
    } catch (e) {
      console.log(e);
      return {
        status: 0,
      } as IvideoResponse;
    }
  }
  async getOneVideo(body: iSearch): Promise<IvideoResponse> {
    try {
      const { data }: { data: IvideoResponse } = await this.client.get(
        `videos/${body.id}`,
      );
      // localResult
      //
      return data;
    } catch (e) {
      console.log(e);
      return {
        status: 0,
      } as IvideoResponse;
    }
  }
  async postCommentArticle(body: IComment): Promise<ICommentResponse> {
    try {
      const { data }: { data: ICommentResponse } = await this.client.post(
        "comment_articles",
        body,
      );
      // localResult
      //
      return data;
    } catch (e) {
      console.log(e);
      return {
        status: 0,
      } as ICommentResponse;
    }
  }
  async postCommentVideo(body: IComment): Promise<ICommentResponse> {
    try {
      const { data }: { data: ICommentResponse } = await this.client.post(
        "comment_videos",
        body,
      );
      // localResult
      //
      return data;
    } catch (e) {
      console.log(e);
      return {
        status: 0,
      } as ICommentResponse;
    }
  }
  async postContact(body: IContact): Promise<IContactResponse> {
    try {
      const { data }: { data: IContactResponse } = await this.client.post(
        "contacts",
        body,
      );
      // localResult
      //
      return data;
    } catch (e) {
      console.log(e);
      return {
        status: 0,
      } as IContactResponse;
    }
  }
}
