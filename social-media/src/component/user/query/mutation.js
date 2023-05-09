import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_URL } from "config";
import { useAuth } from "context/AuthContext";

const useDataUser = ({ onSuccess, onError,id } = {}) => {
  const queryClient = useQueryClient();
  const { token } = useAuth();
  const saveUserMutation = useMutation(
    async (restUserProperties ) => {
      const { data } = await axios.post(
        `${API_URL}accounts/follow/${id}/`,
        
          restUserProperties,
        
        {
          headers: {
         
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

export  {useDataUser};

const useMessageUser = ({ onSuccess, onError,id } = {}) => {
  const queryClient = useQueryClient();
  const { token } = useAuth();
  const saveMessageMutation = useMutation(
    async (restUserProperties ) => {
      const { data } = await axios.post(
        `${API_URL}accounts/message/create/${id}/`,
        
          restUserProperties,
        
        {
          headers: {
          
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

  return saveMessageMutation;
};

export  {useMessageUser};

