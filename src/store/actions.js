import { board, list, card, auth } from "../api";

const actions = {
  // Board
  ADD_BOARD(_, { title }) {
    return board.create(title).then(data => data.item);
  },
  FETCH_BOARDS({ commit }) {
    return board.fetch().then(data => {
      commit("SET_BOARDS", data.list);
    });
  },
  FETCH_BOARD({ commit }, { id }) {
    return board.fetch(id).then(data => {
      commit("SET_BOARD", data.item);
    });
  },
  DELETE_BOARD(_, { id }) {
    return board.destroy(id);
  },
  UPDATE_BOARD({ dispatch, state }, { id, title, bgColor }) {
    return board
      .update(id, { title, bgColor })
      .then(() => dispatch("FETCH_BOARD", { id: state.board.id }));
  },

  // List
  ADD_LIST({ dispatch, state }, { title, boardId, pos }) {
    return list
      .create({ title, boardId, pos })
      .then(() => dispatch("FETCH_BOARD", { id: state.board.id }));
  },
  UPDATE_LIST({ dispatch, state }, { id, pos, title }) {
    return list
      .update(id, { pos, title })
      .then(() => dispatch("FETCH_BOARD", { id: state.board.id }));
  },
  DELETE_LIST({ dispatch, state }, { id }) {
    return list
      .destroy(id)
      .then(() => dispatch("FETCH_BOARD", { id: state.board.id }));
  },

  // Card
  ADD_CARD({ dispatch, state }, { title, listId, pos }) {
    return card
      .create(title, listId, pos)
      .then(() => dispatch("FETCH_BOARD", { id: state.board.id }));
  },
  FETCH_CARD({ commit }, { id }) {
    return card.fetch(id).then(data => {
      commit("SET_CARD", data.item);
    });
  },
  UPDATE_CARD({ dispatch, state }, { id, title, description, pos, listId }) {
    return card.update(id, { title, description, pos, listId }).then(() => {
      dispatch("FETCH_BOARD", { id: state.board.id });
    });
  },
  DELETE_CARD({ dispatch, state }, { id }) {
    return card.destroy(id).then(() => {
      dispatch("FETCH_BOARD", { id: state.board.id });
    });
  },

  // Auth
  LOGIN({ commit }, { email, password }) {
    return auth
      .login(email, password)
      .then(({ accessToken }) => commit("LOGIN", accessToken));
  }
};

export default actions;
