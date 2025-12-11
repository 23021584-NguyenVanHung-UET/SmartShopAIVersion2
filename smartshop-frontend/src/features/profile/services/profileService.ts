import axios from "@/lib/axios";
import { UpdateProfilePayload, UserProfile } from "../type";

export const getProfile = async (): Promise<UserProfile> => {
    const res = await axios.get<UserProfile>("/public/profile");
    return res.data;
};

export const updateProfile = async (payload: UpdateProfilePayload): Promise<UserProfile> => {
    const res = await axios.put<UserProfile>("/public/profile", payload);
    return res.data;
};
