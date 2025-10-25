 
        import api from './api';

        export interface Project {
        _id?: string;
        nom: string;
        description?: string;
        objectifs?: string[];
        dateDebut: Date;
        dateFin?: Date;
        budget: number;
        devise?: string;
        statut?: 'planifie' | 'en_cours' | 'suspendu' | 'termine' | 'annule';
        progression?: number;
        beneficiairesCibles?: number;
        localisation?: {
            ville?: string;
            region?: string;
            coordonnees?: {
            lat: number;
            lng: number;
            };
        };
        responsable?: string;
        equipe?: string[];
        partenaires?: string[];
        indicateurs?: Array<{
            nom: string;
            valeur: number;
            unite: string;
            dateMesure: Date;
        }>;
        }

        export interface Activity {
    _id?: string;
    projectId: string; // ID du projet parent
    nom: string;
    description?: string;
    dateDebut: Date;
    dateFinPrevue: Date;
    responsable?: string;
    statut: 'a_faire' | 'en_cours' | 'terminee' | 'bloquee';
    // Ajoutez ici tout autre champ pertinent pour une activité (budget, etc.)
}

        class ProjectService {
        async getAll(statut?: string): Promise<Project[]> {
            const params = statut ? { statut } : {};
            const response = await api.get<Project[]>('/projects', { params });
            return response.data;
        }

        async getById(id: string): Promise<Project> {
            const response = await api.get<Project>(`/projects/${id}`);
            return response.data;
        }

        async create(project: Project): Promise<Project> {
            const response = await api.post<Project>('/projects', project);
            return response.data;
        }

        async update(id: string, project: Partial<Project>): Promise<Project> {
            const response = await api.put<Project>(`/projects/${id}`, project);
            return response.data;
        }

        async delete(id: string): Promise<void> {
            await api.delete(`/projects/${id}`);
        }

        async getActivities(id: string): Promise<Activity[]> {
            const response = await api.get(`/projects/${id}/activities`);
            return response.data;
        }
        }

        export default new ProjectService();