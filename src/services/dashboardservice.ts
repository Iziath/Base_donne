
import api from './api';
import { RecentActivities } from '../components/dashboard/RecentActivities';

export interface RecentActivity {
    _id: string;
    description: string;
    date: Date; 
    projectId: string; 
    projectNom: string; 
    statut: 'termine' | 'en_cours' | 'planifie';
}

export interface ProjectProgress {
    _id: string;
    nom: string;
    progression: number; 
    statut: 'planifie' | 'en_cours' | 'suspendu' | 'termine' | 'annule';
}

export interface DashboardStats {
  projects: {
    total: number;
    active: number;
    newThisMonth: number;
  };
  activities: {
    total: number;
    thisMonth: number;
    today: number;
  };
  beneficiaries: {
    total: number;
  };
  team: {
    total: number;
  };
  recentActivities: RecentActivity[];
  projectsProgress: ProjectProgress[];
}

class DashboardService {
  async getStats(): Promise<DashboardStats> {
    const response = await api.get<DashboardStats>('/dashboard/stats');
    return response.data;
  }
}

export default new DashboardService();