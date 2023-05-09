import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_URL } from "config";

const useSaveUser = ({ onSuccess, onError } = {}) => {
  const queryClient = useQueryClient();

  const saveUserMutation = useMutation(
    async (restUserProperties ) => {
      const { data } = await axios.post(
        `${API_URL}accounts/register/`,
        
          restUserProperties,
        
        {
          headers: {
         
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
