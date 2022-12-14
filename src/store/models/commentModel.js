import {
  getAllcomment,
  createComment,
  editComment,
  deleteComment,
} from '../../services/newsService';
import {getExistingIndex, showToast} from '../../utils';

//comment models
export const comments = {
  // initial states
  state: {
    error: '',
    comments: {},
  },
  // comment model reducers to update initial states
  reducers: {
    getAllcomment(state, payload) {
      return {
        ...state,
        comments: {
          [payload.id]: payload.comments,
        },
      };
    },

    addComment(state, payload) {
      console.log(state.comments);
      const newsComment = state.comments[payload.newsId];
      newsComment.push(payload);
      return {
        ...state,
        error: '',
        comments: {
          ...state.comments,
          [payload.newsId]: newsComment,
        },
      };
    },
    editComment(state, payload) {
      const newsComment = state.comments[payload.newsId];
      const index = getExistingIndex(payload.id, newsComment);
      newsComment[index] = payload;

      return {
        ...state,
        error: '',
        comments: {
          ...state.comments,
          [payload.newsId]: newsComment,
        },
      };
    },

    delete(state, payload) {
      return {
        ...state,
        error: '',
        comments: {
          ...state.comments,
          [payload.id]: state.comments[payload.id].filter(
            el => el.id !== payload.comment.id,
          ),
        },
      };
    },
  },

  effects: dispatch => ({
    // get all comments
    async getAllcommentAsync(id) {
      try {
        const allComment = await getAllcomment(id);
        dispatch.comments.getAllcomment({id, comments: allComment});
      } catch (error) {
        showToast('error', error);
      }
    },

    // add comment
    async addCommentAsync(data) {
      try {
        const comment = await createComment(data.newsId, data.body);

        dispatch.comments.addComment(comment);
      } catch (error) {
        showToast('error', error);
      }
    },

    //edit comment
    async editCommentAsync(data) {
      try {
        const comment = await editComment(
          data.newsId,
          data.commentId,
          data.body,
        );
        dispatch.comments.editComment(comment);
      } catch (error) {
        showToast('error', error);
      }
    },

    //delete comment
    async deleteCommentAsync(data) {
      try {
        const comment = await deleteComment(data.newsId, data.commentId);
        dispatch.comments.delete({id: comment.newsId, comment});
      } catch (error) {
        showToast('error', error);
      }
    },
  }),
};
