
import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Plus, 
  Search, 
  Filter, 
  MapPin, 
  Phone, 
  Calendar,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  UserCheck,
  Loader2,
  AlertCircle,
  Download
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { beneficiaryService, Beneficiary } from "@/services/beneficiaryservice";

// Types pour l'interface
interface BeneficiaryWithDetails extends Beneficiary {
  age?: number;
  status: "Actif" | "En formation" | "En attente" | "Inactif";
  category: string;
  registrationDate: string;
}

const statusColors = {
  "Actif": "bg-success text-white",
  "En formation": "bg-info text-white",
  "En attente": "bg-warning text-white",
  "Inactif": "bg-muted text-muted-foreground",
};

const Beneficiaries = () => {
  const [beneficiaries, setBeneficiaries] = useState<BeneficiaryWithDetails[]>([]);
  const [filteredBeneficiaries, setFilteredBeneficiaries] = useState<BeneficiaryWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Charger les bénéficiaires
  useEffect(() => {
    fetchBeneficiaries();
  }, []);

  // Filtrer les bénéficiaires quand la recherche ou le filtre change
  useEffect(() => {
    filterBeneficiaries();
  }, [beneficiaries, searchTerm, statusFilter]);

  const fetchBeneficiaries = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Début du chargement des bénéficiaires...');
      
      const response = await beneficiaryService.getAll();
      console.log('Réponse API bénéficiaires:', response);
      
      // Gestion robuste de la réponse avec typage correct
      let allBeneficiaries: Beneficiary[] = [];
      
      if (Array.isArray(response)) {
        allBeneficiaries = response;
      } else if (response && typeof response === 'object') {
        console.log('Structure réponse bénéficiaires:', Object.keys(response));
        
        // Conversion en type any pour éviter les erreurs TypeScript
        const responseUnknown = response as unknown;
        
        if (
        typeof responseUnknown === 'object' &&
        responseUnknown !== null &&
        'beneficiaries' in responseUnknown &&
        Array.isArray((responseUnknown as Record<string, unknown>).beneficiaries)
      ) {
        allBeneficiaries = (responseUnknown as { beneficiaries: Beneficiary[] }).beneficiaries;
        console.log('Bénéficiaires trouvés dans response.beneficiaries:', allBeneficiaries);
      } 
      // Vérifier si c'est un objet avec la propriété data
      else if (
        typeof responseUnknown === 'object' &&
        responseUnknown !== null &&
        'data' in responseUnknown &&
        Array.isArray((responseUnknown as Record<string, unknown>).data)
      ) {
        allBeneficiaries = (responseUnknown as { data: Beneficiary[] }).data;
        console.log('Bénéficiaires trouvés dans response.data:', allBeneficiaries);
      } 
      // Chercher n'importe quelle propriété tableau
      else if (typeof responseUnknown === 'object' && responseUnknown !== null) {
        const responseObj = responseUnknown as Record<string, unknown>;
        for (const key in responseObj) {
          if (Array.isArray(responseObj[key])) {
            allBeneficiaries = responseObj[key] as Beneficiary[];
            console.log(`Bénéficiaires trouvés dans ${key}:`, allBeneficiaries);
            break;
          }
        }
      }
    }
    
      
      console.log('Bénéficiaires extraits:', allBeneficiaries);
      
      // Transformer les données pour l'interface
      const transformedBeneficiaries: BeneficiaryWithDetails[] = allBeneficiaries.map(beneficiary => {
        // Calculer l'âge
        const age = beneficiary.dateNaissance 
          ? new Date().getFullYear() - new Date(beneficiary.dateNaissance).getFullYear()
          : 0;

        // Déterminer le statut
        const getStatus = (): "Actif" | "En formation" | "En attente" | "Inactif" => {
          const activeProjects = beneficiary.projets?.filter(p => p.statut === 'actif') || [];
          const inactiveProjects = beneficiary.projets?.filter(p => p.statut === 'inactif') || [];
          
          if (activeProjects.length > 0) return "Actif";
          if (inactiveProjects.length > 0) return "En formation";
          return "En attente";
        };

        // Catégorie professionnelle
        const getCategory = (): string => {
          return beneficiary.profession || "Bénéficiaire";
        };

        // Date d'inscription
        const getRegistrationDate = (): string => {
          const dates = beneficiary.projets?.map(p => new Date(p.dateInscription)) || [];
          if (dates.length === 0) return "Date inconnue";
          
          const earliestDate = new Date(Math.min(...dates.map(d => d.getTime())));
          return earliestDate.toLocaleDateString('fr-FR', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
          });
        };

        return {
          ...beneficiary,
          age,
          status: getStatus(),
          category: getCategory(),
          registrationDate: getRegistrationDate()
        };
      });

      setBeneficiaries(transformedBeneficiaries);
      
    } catch (err: unknown) {
      console.error("Erreur lors du chargement des bénéficiaires:", err);
      
      let errorMessage = "Erreur lors du chargement des bénéficiaires";
      
      if (err && typeof err === 'object') {
        if ('response' in err) {
          const axiosError = err as { response?: { data?: { message?: string } } };
          errorMessage = axiosError.response?.data?.message || errorMessage;
        } else if ('message' in err) {
          errorMessage = (err as Error).message;
        }
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const filterBeneficiaries = () => {
    let filtered = beneficiaries;

    // Filtre par recherche
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      
      filtered = filtered.filter(beneficiary => {
        // Vérifier chaque champ avec des valeurs par défaut pour éviter les undefined
        const nomMatch = beneficiary.nom?.toLowerCase().includes(searchLower) || false;
        const prenomMatch = beneficiary.prenom?.toLowerCase().includes(searchLower) || false;
        const professionMatch = beneficiary.profession?.toLowerCase().includes(searchLower) || false;
        const villeMatch = beneficiary.adresse?.ville?.toLowerCase().includes(searchLower) || false;
        const quartierMatch = beneficiary.adresse?.quartier?.toLowerCase().includes(searchLower) || false;
        const telephoneMatch = beneficiary.telephone?.includes(searchTerm) || false;

        return nomMatch || prenomMatch || professionMatch || villeMatch || quartierMatch || telephoneMatch;
      });
    }

    // Filtre par statut
    if (statusFilter !== "all") {
      filtered = filtered.filter(beneficiary => beneficiary.status === statusFilter);
    }

    setFilteredBeneficiaries(filtered);
  };

  const handleViewProfile = (beneficiaryId: string) => {
    if (!beneficiaryId) return;
    window.location.href = `/beneficiaries/${beneficiaryId}`;
  };

  const handleEditBeneficiary = (beneficiaryId: string) => {
    if (!beneficiaryId) return;
    window.location.href = `/beneficiaries/${beneficiaryId}/edit`;
  };

  const handleDeleteBeneficiary = async (beneficiaryId: string) => {
    if (!beneficiaryId) return;

    if (confirm("Êtes-vous sûr de vouloir supprimer ce bénéficiaire ?")) {
      try {
        await beneficiaryService.delete(beneficiaryId);
        fetchBeneficiaries();
      } catch (error) {
        console.error("Erreur lors de la suppression:", error);
        alert("Erreur lors de la suppression du bénéficiaire");
      }
    }
  };

  const handleNewBeneficiary = () => {
    window.location.href = '/beneficiaries/new';
  };

  const handleExportList = () => {
    const dataStr = JSON.stringify(filteredBeneficiaries, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'beneficiaires-ramp.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleRetry = () => {
    fetchBeneficiaries();
  };

  const getGenderText = (genre: string | undefined): string => {
    if (!genre) return 'Non spécifié';
    return genre === 'F' ? 'Féminin' : genre === 'M' ? 'Masculin' : 'Non spécifié';
  };

  const getProjectsList = (beneficiary: BeneficiaryWithDetails): string[] => {
    return beneficiary.projets?.map(p => p.projet).filter(Boolean) || [];
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
            <p className="mt-2 text-muted-foreground">Chargement des bénéficiaires...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-heading-color mb-2">
              Erreur de chargement
            </h3>
            <p className="text-muted-foreground mb-4">{error}</p>
            <Button onClick={handleRetry}>
              Réessayer
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-heading-color">Gestion des Bénéficiaires</h1>
            <p className="text-muted-foreground mt-1">
              Base de données des bénéficiaires et suivi de leur participation
            </p>
          </div>
          <Button className="bg-gradient-primary" onClick={handleNewBeneficiary}>
            <Plus className="mr-2 w-4 h-4" />
            Nouveau bénéficiaire
          </Button>
        </div>

        {/* Filters and Search */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input 
                  placeholder="Rechercher un bénéficiaire..." 
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <select 
                className="flex h-10 w-full sm:w-[180px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">Tous les statuts</option>
                <option value="Actif">Actif</option>
                <option value="En formation">En formation</option>
                <option value="En attente">En attente</option>
                <option value="Inactif">Inactif</option>
              </select>

              <Button variant="outline" onClick={fetchBeneficiaries}>
                <Filter className="mr-2 w-4 h-4" />
                Actualiser
              </Button>

              <Button variant="outline" onClick={handleExportList}>
                <Download className="mr-2 w-4 h-4" />
                Exporter
              </Button>
            </div>

            {/* Résultats de recherche */}
            <div className="mt-4 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {filteredBeneficiaries.length} bénéficiaire(s) trouvé(s)
                {searchTerm && ` pour "${searchTerm}"`}
                {statusFilter !== "all" && ` avec statut "${statusFilter}"`}
              </p>
              
              {(searchTerm || statusFilter !== "all") && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => {
                    setSearchTerm("");
                    setStatusFilter("all");
                  }}
                >
                  Effacer les filtres
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Beneficiaries Table */}
        <Card>
          <CardHeader>
            <CardTitle>Liste des bénéficiaires</CardTitle>
          </CardHeader>
          <CardContent>
            {filteredBeneficiaries.length === 0 ? (
              <div className="text-center py-8">
                <UserCheck className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-heading-color mb-2">
                  Aucun bénéficiaire trouvé
                </h3>
                <p className="text-muted-foreground mb-4">
                  {searchTerm || statusFilter !== "all" 
                    ? "Aucun bénéficiaire ne correspond à vos critères de recherche." 
                    : "Aucun bénéficiaire n'a été enregistré pour le moment."
                  }
                </p>
                <Button onClick={handleNewBeneficiary}>
                  <Plus className="mr-2 w-4 h-4" />
                  Ajouter un bénéficiaire
                </Button>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Bénéficiaire</TableHead>
                    <TableHead>Informations</TableHead>
                    <TableHead>Projets</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBeneficiaries.map((beneficiary) => (
                    <TableRow key={beneficiary._id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarFallback className="bg-primary text-primary-foreground">
                              {beneficiary.prenom?.[0] || ''}{beneficiary.nom?.[0] || ''}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">
                              {beneficiary.prenom} {beneficiary.nom}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {beneficiary.category}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1 text-sm">
                          <div className="flex items-center space-x-1 text-muted-foreground">
                            <span>{beneficiary.age} ans • {getGenderText(beneficiary.genre)}</span>
                          </div>
                          <div className="flex items-center space-x-1 text-muted-foreground">
                            <MapPin className="w-3 h-3" />
                            <span>{beneficiary.adresse?.ville || 'Ville non spécifiée'}</span>
                          </div>
                          <div className="flex items-center space-x-1 text-muted-foreground">
                            <Phone className="w-3 h-3" />
                            <span>{beneficiary.telephone || 'Non renseigné'}</span>
                          </div>
                          <div className="flex items-center space-x-1 text-muted-foreground">
                            <Calendar className="w-3 h-3" />
                            <span>Inscrit le {beneficiary.registrationDate}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          {getProjectsList(beneficiary).map((project, index) => (
                            <Badge key={index} variant="outline" className="text-xs mr-1 mb-1">
                              {project}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={statusColors[beneficiary.status]}>
                          {beneficiary.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleViewProfile(beneficiary._id!)}>
                              <Eye className="mr-2 h-4 w-4" />
                              Voir profil
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEditBeneficiary(beneficiary._id!)}>
                              <Edit className="mr-2 h-4 w-4" />
                              Modifier
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              className="text-destructive"
                              onClick={() => handleDeleteBeneficiary(beneficiary._id!)}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Supprimer
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Beneficiaries;