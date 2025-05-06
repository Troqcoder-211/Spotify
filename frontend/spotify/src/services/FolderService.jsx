import api from "../api/axios";
import { apiRequest } from "../api/ApiRequest";

const FolderService = {
  getAllFolders: async () => {
    return await apiRequest(() => {
      return api.get("/folders/");
    });
  },

  // Các method khác có thể thêm ở đây, ví dụ:
  // createFolder: async (data) => {
  //   return await apiRequest(() => {
  //     return api.post("/folders", data);
  //   });
  // }
};


export default FolderService;
