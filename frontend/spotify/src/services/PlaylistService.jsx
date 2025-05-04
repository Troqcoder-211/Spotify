import api from "../api/axios";
import { apiRequest } from "../api/ApiRequest";

const PlaylistService = {
  getAllPlayLists: async () => {
    return await apiRequest(() => {
      return api.get("/playlists/");
    });
  },

  // Các method khác có thể thêm ở đây, ví dụ:
  // createFolder: async (data) => {
  //   return await apiRequest(() => {
  //     return api.post("/folders", data);
  //   });
  // }
};


export default PlaylistService;
