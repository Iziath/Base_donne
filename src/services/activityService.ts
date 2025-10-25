
import api from './api';

export interface Activity {
  _id?: string;
  titre: string;
  description?: string;
  type: 'formation' | 'distribution' | 'atelier' | 'reunion' | 'sensibilisation' | 'autre';
  dateDebut: Date;
  dateFin?: Date;
  lieu?: {
    ville?: string;
    adresse?: string;
    coordonnees?: { lat: number; lng: number };
  };
  participantsCibles?: number;
  participantsReels?: number;
  statut?: 'planifie' | 'en_cours' | 'termine' | 'annule';
  projet: string;
  animateurs?: string[];
  materiels?: Array<{ nom: string; quantite: number; unite: string }>;
  resultats?: Array<{ description: string; indicateur: string; valeur: number }>;
  photos?: string[];
}

class ActivityService {
  async getAll(): Promise<Activity[]> {
    const response = await api.get<Activity[]>('/activities');
    return response.data;
  }

  async getById(id: string): Promise<Activity> {
    const response = await api.get<Activity>(`/activities/${id}`);
    return response.data;
  }

  async create(activity: Activity): Promise<Activity> {
    const response = await api.post<Activity>('/activities', activity);
    return response.data;
  }

  async update(id: string, activity: Partial<Activity>): Promise<Activity> {
    const response = await api.put<Activity>(`/activities/${id}`, activity);
    return response.data;
  }

  async delete(id: string): Promise<void> {
    await api.delete(`/activities/${id}`);
  }
}

export default new ActivityService();

// src/services/beneficiaryService.ts
export interface Beneficiary {
  _id?: string;
  nom: string;
  prenom: string;
  genre: 'M' | 'F';
  dateNaissance?: Date;
  telephone?: string;
  email?: string;
  adresse?: {
    ville?: string;
    quartier?: string;
    rue?: string;
  };
  profession?: string;
  niveauEducation?: string;
  situationFamiliale?: string;
  projets?: Array<{
    projet: string;
    dateInscription: Date;
    statut: 'actif' | 'inactif' | 'termine';
  }>;
  activites?: Array<{
    activite: string;
    dateParticipation: Date;
    presence: boolean;
  }>;
  indicateurs?: Array<{
    nom: string;
    valeur: string;
    dateMesure: Date;
  }>;
}

class BeneficiaryService {
  async getAll(): Promise<Beneficiary[]> {
    const response = await api.get<Beneficiary[]>('/beneficiaries');
    return response.data;
  }

  async getById(id: string): Promise<Beneficiary> {
    const response = await api.get<Beneficiary>(`/beneficiaries/${id}`);
    return response.data;
  }

  async create(beneficiary: Beneficiary): Promise<Beneficiary> {
    const response = await api.post<Beneficiary>('/beneficiaries', beneficiary);
    return response.data;
  }

  async update(id: string, beneficiary: Partial<Beneficiary>): Promise<Beneficiary> {
    const response = await api.put<Beneficiary>(`/beneficiaries/${id}`, beneficiary);
    return response.data;
  }

  async delete(id: string): Promise<void> {
    await api.delete(`/beneficiaries/${id}`);
  }
}

export const beneficiaryService = new BeneficiaryService();