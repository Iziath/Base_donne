
import api from './api';

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

  // Méthodes supplémentaires utiles
  async getByProject(projectId: string): Promise<Beneficiary[]> {
    const response = await api.get<Beneficiary[]>(`/beneficiaries/project/${projectId}`);
    return response.data;
  }

  async getStats(): Promise<unknown> {
    const response = await api.get('/beneficiaries/stats');
    return response.data;
  }
}

export const beneficiaryService = new BeneficiaryService();
export default beneficiaryService;