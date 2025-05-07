import api from "../api/axios";
import { apiRequest } from "../api/ApiRequest";

const Conversation = {
  getAllConversation: async () => {
    return await apiRequest(() => {
      return api.get("/conversations/");
    });
  },

  getAllMessageByConversation: async ({ id }) => {
    return await apiRequest(() => {
      return api.get(`/conversations/${id}/messages/`);
    });
  },

  sendMessageByUserInConversation: async ({ id, content }) => {
    return await apiRequest(() => {
      return api.post(`/conversations/${id}/send-message/`, {
        message: content,
      });
    });
  },

  chatWithGemini: async ({content}) => {
    return await apiRequest(() => {
      return api.post('/gemini/chat/', {
        message: content,
      });
    });
  },
};


export default Conversation;
