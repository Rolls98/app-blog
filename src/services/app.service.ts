import { IvideoResponse } from "./../interfaces/video.interface";
import {
  IArticle,
  IArticlesResponse,
  IcategorieResponse,
  iSearch,
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
      } = await this.client.get("/articles", { params: body });

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
      } = await this.client.get("videos", { params: body });

      return data;
    } catch (e) {
      console.log(e);
      return {
        status: 0,
      } as IvideoResponse;
    }
  }
}
