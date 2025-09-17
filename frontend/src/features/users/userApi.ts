import axiosInstance from "@/shared/api/axios";
import type { User } from "./types/user.types";
import type { TourDurationUnit } from "../tours/types/tour";
import type { CreateUserData, UpdateUserData } from "./schema/user.schema";
import type { GuideProfileData } from "./schema/guideProfile.schema";
import type { UserQueryOptions } from "./types/userQueryOptions";
import type { ResponseSuccess } from "./types/userResponseSuccess";

export const getUsers = async (options: UserQueryOptions = {}) => {
  const {
    search,
    page,
    limit = Number(import.meta.env.VITE_LIMIT_PER_PAGE || 10),
    role,
    sort,
  } = options;

  const params = new URLSearchParams();

  if (search) params.set("search", search);
  if (role) params.set("role", role);
  if (sort) {
    const [field, direction] = sort.split("-");
    const finalSort = direction === "asc" ? field : `-${field}`;
    params.set("sort", finalSort);
  }
  if (page) {
    params.set("page", `${page}`);
    params.set("limit", `${limit}`);
  }

  const queryString = params.toString();

  const response = await axiosInstance.get<ResponseSuccess>(
    `/users?${queryString}`
  );
  return response.data;
};

export const createUser = async (data: CreateUserData | UpdateUserData) => {
  const id = data.id;
  const url = id ? `/users/${id}` : "/users";
  const method = id ? axiosInstance.patch : axiosInstance.post;
  const res = await method(url, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const deleteUser = async (id: string) => {
  await axiosInstance.delete(`/users/${id}`);
};

export const updateProfile = async (data: GuideProfileData) => {
  const formData = new FormData();

  // normal text fields
  formData.append("bio", data.bio!);
  formData.append("address", data.address);
  formData.append("phone", data.phone);
  formData.append("yearsOfExperience", String(data.yearsOfExperience));
  data.languagesSpoken.forEach((lang, i) => {
    formData.append(`languagesSpoken[${i}]`, lang);
  });

  data.availability.forEach((slot, index) => {
    formData.append(`availability[${index}][day]`, slot.day);
    formData.append(`availability[${index}][from]`, slot.from);
    formData.append(`availability[${index}][to]`, slot.to);
  });

  // ✅ File fields
  if (data.avatar) formData.append("avatar", data.avatar);
  if (data.imageCover) formData.append("imageCover", data.imageCover);
  if (Array.isArray(data.images)) {
    data.images.forEach((img) => {
      if (img instanceof File) {
        formData.append("images", img);
      } else if (typeof img === "string") {
        formData.append("images", img); // old filename
      }
    });
  }
  const res = await axiosInstance.patch("/users/me/profile", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

type Response = {
  status: string;
  results: number;
  data: { guides: User[] };
};

export const getAvailableGuides = async ({
  startDates,
  tourDuration,
  tourDurationUnit,
}: {
  startDates: Date[];
  tourDuration: number;
  tourDurationUnit: TourDurationUnit;
}) => {
  const res = await axiosInstance.post<Response>(
    "/users/guides/available-for-tour",
    {
      startDates,
      tourDuration,
      tourDurationUnit,
    }
  );
  return res.data.data.guides;
};

type ResponseGetUsersByIds = {
  status: string;
  results: number;
  data: { users: User[] };
};

export const getGuidesByIds = async (ids: string[]) => {
  const idsQuery = ids.join(",");
  const res = await axiosInstance.get<ResponseGetUsersByIds>(
    `/users/by-ids?ids=${idsQuery}`
  );
  return res.data.data.users;
};
