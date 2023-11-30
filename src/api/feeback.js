import { ApiConfig } from "./config";
import EndPoint from "../helper/endpoint";
export const apiCreateFeedback = async (payload) => {
     return ApiConfig(EndPoint.CREATE_FEEDBACK, {
          payload,
     });
};
