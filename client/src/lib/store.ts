import { create } from "zustand";
import type { Campaign, Project, Customer } from "@shared/schema";

interface AppState {
  selectedCampaignId: number | null;
  campaigns: Campaign[];
  projects: Project[];
  customers: Customer[];
  isLoading: boolean;
  error: string | null;
  
  setSelectedCampaignId: (id: number | null) => void;
  setCampaigns: (campaigns: Campaign[]) => void;
  setProjects: (projects: Project[]) => void;
  setCustomers: (customers: Customer[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useAppStore = create<AppState>((set) => ({
  selectedCampaignId: null,
  campaigns: [],
  projects: [],
  customers: [],
  isLoading: false,
  error: null,
  
  setSelectedCampaignId: (id) => set({ selectedCampaignId: id }),
  setCampaigns: (campaigns) => set({ campaigns }),
  setProjects: (projects) => set({ projects }),
  setCustomers: (customers) => set({ customers }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
}));
