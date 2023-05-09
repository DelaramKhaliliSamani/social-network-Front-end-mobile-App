import React, { createContext, useReducer } from "react";
import { authReducer } from "reducer/AuthReducer";
import { authrefreshReducer } from "reducer/AuthrefreshReducer";

const AuthContext = createContext();

const AuthProvider = (props) => {
  const [token, authDispatch] = useReducer(
    authReducer,
    localStorage.getItem("token")
  );
  const [refreshtoken, authrefreshDispatch] = useReducer(
    authrefreshReducer,
    localStorage.getItem("refreshtoken")
  );

  return (
    <AuthContext.Provider
      value={{ token, authDispatch, refreshtoken, authrefreshDispatch }}
      {...props}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

const useAuth = () => React.useContext(AuthContext);

export { AuthProvider, useAuth };