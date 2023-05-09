export const authrefreshReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("refreshtoken", action.refreshtoken);
      return action.refreshtoken;
    case "LOGOUT":
      localStorage.removeItem("refreshtoken");
      return null;
    default:
      return state;
  }
};
