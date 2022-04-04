import { Mission } from "../types/mission";
import api from "./api";

const reviewService = {
  getAllMissions: async (): Promise<Mission[]> => await api.post("/missions"),
  getOneMission: async (missionId: string): Promise<Mission> =>
    await api.get(`/missions/${missionId}`),
  postMission: async (mission: Mission): Promise<string> =>
    await api.post(`/missions`, mission),
  deleteMission: async (missionId: string): Promise<string> =>
    await api.delete(`/missions/${missionId}`),
  updateMission: async (missionId: string, mission: Mission): Promise<string> =>
    await api.patch(`/missions/${missionId}`, mission),
  search: async (keywords: string[]): Promise<Mission[]> => {
    let url = "/missions/search?";
    keywords.map((keyword) => (url = url + `criteria=${keyword}&`));
    return await api.get(url);
  },
};

export default reviewService;
