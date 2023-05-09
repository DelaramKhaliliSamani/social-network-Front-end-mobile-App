import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_URL } from "config";

const useSaveUser = ({ onSuccess, onError } = {}) => {
  const queryClient = useQueryClient();

  const saveUserMutation = useMutation(
    async ({ ...restUserProperties }) => {
      const { data } = await axios.post(
        `${API_URL}accounts/token/`,
        {
          ...restUserProperties,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

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

  return saveUserMutation;
};

export  {useSaveUser};
const useResetUser = ({ onSuccess, onError } = {}) => {
  const queryClient = useQueryClient();

  const saveResetMutation = useMutation(
    async ({ ...restUserProperties }) => {
      const { data } = await axios.post(
        `${API_URL}password_reset/`,
        {
          ...restUserProperties,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

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

  return saveResetMutation;
};

export  {useResetUser};
