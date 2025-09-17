export const ROLES = {
  ADMIN: "admin",
  CLIENT: "client",
  GUIDE: "guide",
  LEADGUIDE: "lead-guide",
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];

export interface IAvailability {
  day: string;
  from: string;
  to: string;
}
export interface GuideProfile {
  guide: string;
  languagesSpoken: string[];
  availability: IAvailability[];
  bio?: string;
  yearsOfExperience?: number;
  profileCompleted: boolean;
  images: string[];
  imageCover: string;
  address: string;
}
export interface User {
  id?: string;
  name: string;
  email: string;
  password: string;
  role: Role;
  isVerified: boolean;
  isActive?: boolean;
  avatar?: string;
  phone?: string;
  guideProfile?: GuideProfile;
  createdAt?: Date;
  updatedAt?: Date;
}
