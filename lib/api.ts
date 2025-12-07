// lib/api.ts
import axios from "axios";
import { Camper } from "@/types/camper";

const instance = axios.create({
  baseURL: "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io",
});

export interface CampersResponse {
  total: number;
  items: Camper[];
}

export async function getCampers(
  params?: Record<string, string | number | boolean>
): Promise<CampersResponse> {
  const response = await instance.get<CampersResponse>("/campers", { params });
  const data = response.data;

  return {
    total: data.total ?? 0,
    items: Array.isArray(data.items) ? data.items : [],
  };
}

export async function getCamperById(id: string): Promise<Camper> {
  const response = await instance.get<Camper>(`/campers/${id}`);
  return response.data;
}
