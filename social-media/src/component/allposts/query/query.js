import axios from "axios";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { API_URL } from "config";
import { useAuth } from "context/AuthContext";

const useSaveUser = ({ onSuccess, onError } = {}) => {
  const { token } = useAuth();
  const queryClient = useQueryClient();
  const saveUserQuery = useQuery(
    ["posts"],
    async () => {
      const { data } = await axios.get(`${API_URL}post/`, {
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

export { useSaveUser };

const useCommentPost = ({ onSuccess, onError, id } = {}) => {
  const { token } = useAuth();
  const queryClient = useQueryClient();
  const saveCommentuery = useQuery(
    ["Commentpost"],
    async () => {
      const { data } = await axios.patch(`${API_URL}comment/${id}/`, {
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

  return saveCommentuery;
};

export { useCommentPost };
