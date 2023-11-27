import { ApiConfig } from './config';
import EndPoint from '../helper/endpoint';

export const apiLoadTopicByCourse = async (params) => {
  return ApiConfig(EndPoint.GET_TOPIC_BY_COURSE, { params });
};

export const apiLoadQuestionsByTopic = async (params) => {
  return ApiConfig(EndPoint.GET_QUESTIONS_BY_TOPIC, { params });
};

export const apiLoadTopicById = async (params) => {
  return ApiConfig(EndPoint.GET_TOPIC_BY_ID, { params });
};

export const apiLoadLessonByIdTopic = async (params) => {
  return ApiConfig(EndPoint.GET_LESSONS_BY_ID_TOPIC, { params });
};

export const apiGetTotalLearnedTopic = async (payload) => {
  return ApiConfig(EndPoint.GET_TOTAL_LEARNED_TOPIC, { payload });
};

export const apiUpdateTopic = async (payload) => {
  return ApiConfig(EndPoint.UPDATE_TOPIC, {
    payload,
  });
};
