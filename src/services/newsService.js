import {request} from '../configs/axios';

//get all news
export const getAllNews = async page => {
  try {
    const {data} = await request.get(`news?page=${page || 1}&limit=10`);
    return data;
  } catch (error) {
    throw error.message;
  }
};

// create news
export const createNews = async body => {
  try {
    const {data} = await request.post('news', body);
    return data;
  } catch (error) {
    throw error.message;
  }
};

//delete news
export const deleteNews = async newsId => {
  try {
    const {data} = await request.delete(`news/${newsId}`);
    console.log(data);
    return data;
  } catch (error) {
    throw error.message;
  }
};

//edit news
export const editNews = async (newsId, body) => {
  try {
    const {data} = await request.put(`news/${newsId}`, body);
    return data;
  } catch (error) {
    throw error.message;
  }
};

//get all comments
export const getAllcomment = async newsId => {
  try {
    const {data} = await request.get(`news/${newsId}/comments`);

    return data;
  } catch (error) {
    throw error.message;
  }
};

//create comment
export const createComment = async (newsId, body) => {
  try {
    const {data} = await request.post(`news/${newsId}/comments`, body);
    return data;
  } catch (error) {
    throw error.message;
  }
};

//edit comment
export const editComment = async (newsId, commentId, body) => {
  try {
    const {data} = await request.put(
      `news/${newsId}/comments/${commentId}`,
      body,
    );
    return data;
  } catch (error) {
    throw error.message;
  }
};

//delete comment
export const deleteComment = async (newsId, commentId) => {
  try {
    const {data} = await request.delete(`news/${newsId}/comments/${commentId}`);

    return data;
  } catch (error) {
    throw error.message;
  }
};

//upload news image api
export const uploadNewsImage = async body => {
  try {
    const data = await request.post(`news/${body.newsId}/images`, body);
    return data;
  } catch (error) {
    throw error.message;
  }
};
