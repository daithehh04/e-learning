import EndPoint from '../helper/endpoint';
import { ApiConfig } from './config';
export const apiLoadCourseBySlug = async (params) => {
  return ApiConfig(EndPoint.GET_COURSE_BY_SLUG, { params });
};
