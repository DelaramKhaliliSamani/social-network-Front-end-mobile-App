import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_URL } from "config";
import { useAuth } from "context/AuthContext";

const useSaveUser = ({ onSuccess, onError } = {}) => {
  const queryClient = useQueryClient();
  const { token } = useAuth();

  const saveUserMutation = useMutation(
    async (restUserProperties ) => {
      const { data } = await axios.patch(
        `${API_URL}accounts/profile/${7}`,
        
          restUserProperties,
        
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
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

export default useSaveUser;
