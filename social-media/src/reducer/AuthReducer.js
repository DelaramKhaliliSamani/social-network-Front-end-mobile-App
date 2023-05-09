export const authReducer = (state, action) => {
    switch (action.type) {
      case 'LOGIN':
        localStorage.setItem('token', action.token);
        return action.token;
      case 'LOGOUT':
        localStorage.removeItem('token');
        return null;
      default:
        return state;
    }
  };
  