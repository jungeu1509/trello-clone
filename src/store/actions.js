import { board, auth } from "../api";

const actions = {
  ADD_BOARD(_, { title }) {
    return board.create(title);
  },
  FETCH_BOARDS({ commit }) {
    return board.fetch().then(data => {
      commit("SET_BOARDS", data.list);
    });
  },
  LOGIN({ commit }, { email, password }) {
    return auth
      .login(email, password)
      .then(({ accessToken }) => commit("LOGIN", accessToken));
  }
};

export default actions;
