import { ApiConfig } from "./config";
import EndPoint from "../helper/endpoint";

export const apiLoadCategorys = async (params) => {
     return ApiConfig(EndPoint.GET_CATEGORYS_BY_STATUS, { params });
};

export const apiLoadCategoryBySlug = async (params) => {
     return ApiConfig(EndPoint.GET_CATEGORYS_BY_SLUG, { params });
};