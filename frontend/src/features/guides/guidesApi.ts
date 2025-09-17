import axiosInstance from "@/shared/api/axios";
import type {
  GetGuidesResponse,
  GetGuideToursResponse,
  GetProfileResponse,
} from "./types/getGuideToursResponse";

export const getGuideAssignedTours = async (guideId: string) => {
  const res = await axiosInstance.get<GetGuideToursResponse>(
    `users/${guideId}/tours`
  );
  return res.data;
};

export const getAllGuides = async ({
  page,
  limit,
}: {
  page: number;
  limit: number;
}) => {
  const params = new URLSearchParams();
  if (page) {
    params.set("page", `${page}`);
  }
  if (limit) {
    params.set("limit", `${limit}`);
  }
  const query = params.toString();
  const res = await axiosInstance.get<GetGuidesResponse>(
    `/users/guides?${query}`
  );
  return res.data;
};

export const getGuide = async (id: string) => {
  const res = await axiosInstance.get<GetProfileResponse>(`users/guides/${id}`);
  return res.data.data;
};
