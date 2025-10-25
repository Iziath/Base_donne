
import api from './api';

export interface Partner {
  _id?: string;
  nom: string;
  type: 'international' | 'gouvernemental' | 'prive' | 'ong' | 'autre';
  categorie: string;
  email?: string;
  telephone?: string;
  siteWeb?: string;
  adresse?: {
    ville?: string;
    adresse?: string;
  };
  statut: 'actif' | 'en_negociation' | 'suspendu' | 'inactif';
  partenariat: string;
  dateDebut: Date;
  description?: string;
  contacts?: Array<{
    nom: string;
    poste: string;
    email: string;
    telephone: string;
  }>;
  projets?: string[];
  documents?: Array<{
    nom: string;
    url: string;
    type: string;
  }>;
}

class PartnerService {
  async getAll(): Promise<Partner[]> {
    const response = await api.get<Partner[]>('/partners');
    return response.data;
  }

  async getById(id: string): Promise<Partner> {
    const response = await api.get<Partner>(`/partners/${id}`);
    return response.data;
  }

  async create(partner: Partner): Promise<Partner> {
    const response = await api.post<Partner>('/partners', partner);
    return response.data;
  }

  async update(id: string, partner: Partial<Partner>): Promise<Partner> {
    const response = await api.put<Partner>(`/partners/${id}`, partner);
    return response.data;
  }

  async delete(id: string): Promise<void> {
    await api.delete(`/partners/${id}`);
  }

  async getStats(): Promise<unknown> {
    const response = await api.get('/partners/stats');
    return response.data;
  }
}

export const partnerService = new PartnerService();
export default partnerService;