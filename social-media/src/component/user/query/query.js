import axios from "axios";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { API_URL } from "config";
import { useAuth } from "context/AuthContext";

const useSaveUser = ({ onSuccess, onError,id } = {}) => {
  const { token } = useAuth();
  const queryClient = useQueryClient();
  const saveUserQuery = useQuery(
    ["userinfo"],
    async () => {
      const { data } = await axios.get(`${API_URL}accounts/user/${id}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      return data;
    },
    {
      onSuccess: async () => {
        // await queryClient.removeQueries('user')
        // await queryClient.removeQueries('users')
        if (onSuccess) {
          onSuccess();
        }
      },
      onError: async (error, variables, context) => {
        if (onError) {
          onError();
        }
      },
    }
  );

  return saveUserQuery;
};

export  {useSaveUser};


const useProUser = ({ onSuccess, onError,id } = {}) => {
  const { token } = useAuth();
  const queryClient = useQueryClient();
  const saveProQuery = useQuery(
    ["Pro"],
    async () => {
      const { data } = await axios.get(`${API_URL}accounts/profile/${id}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      return data;
    },
    {
      onSuccess: async () => {
        // await queryClient.removeQueries('user')
        // await queryClient.removeQueries('users')
        if (onSuccess) {
          onSuccess();
        }
      },
      onError: async (error, variables, context) => {
        if (onError) {
          onError();
        }
      },
    }
  );

  return saveProQuery;
};

export {useProUser};

const useAllUser = ({ onSuccess, onError,id } = {}) => {
  const { token } = useAuth();
  const queryClient = useQueryClient();
  const saveAllQuery = useQuery(
    ["All"],
    async () => {
      const { data } = await axios.get(`${API_URL}accounts/message/view/${id}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      return data;
    },
    {
      onSuccess: async () => {
        // await queryClient.removeQueries('user')
        // await queryClient.removeQueries('users')
        if (onSuccess) {
          onSuccess();
        }
      },
      onError: async (error, variables, context) => {
        if (onError) {
          onError();
        }
      },
    }
  );

  return saveAllQuery;
};

export  {useAllUser};