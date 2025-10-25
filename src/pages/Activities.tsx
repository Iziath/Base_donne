
import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Filter, 
  Plus, 
  Calendar, 
  MapPin, 
  Users, 
  Target,
  Eye,
  Edit,
  Trash2,
  Loader2,
  AlertCircle
} from "lucide-react";
import activityService, { Activity } from "@/services/activityService";


interface ActivityWithDetails extends Activity {
  responsable?: string;
  description?: string;
}

interface ApiResponse {
  data?: Activity[];
  activities?: Activity[];
  results?: Activity[];
  [key: string]: unknown; 
}

const Activities = () => {
  const [activities, setActivities] = useState<ActivityWithDetails[]>([]);
  const [filteredActivities, setFilteredActivities] = useState<ActivityWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Charger les activités
  useEffect(() => {
    fetchActivities();
  }, []);

  // Filtrer les activités quand la recherche ou le filtre change
  useEffect(() => {
    filterActivities();
  }, [activities, searchTerm, statusFilter]);

  const fetchActivities = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Début du chargement des activités...');
      
      const response = await activityService.getAll();
      console.log('Réponse complète:', response);
      
      // GESTION  DU TYPE DE RÉPONSE
      let allActivities: Activity[] = [];
      
      if (Array.isArray(response)) {
        // Si la réponse est directement un tableau
        allActivities = response;
      } else if (response && typeof response === 'object') {
        const apiResponse = response as ApiResponse;
        // Si c'est un objet Axios avec une propriété data
        if (apiResponse.data && Array.isArray(apiResponse.data)) {
          allActivities = apiResponse.data;
        }
        // Si c'est un objet avec une propriété activities
        else if ('apiResponseactivities' in response && Array.isArray(apiResponse.activities)) {
          allActivities = apiResponse.activities;
        }
        // Si c'est un objet avec une propriété results
        else if (apiResponse.results && Array.isArray(apiResponse.results)) {
          allActivities = apiResponse.results;
        }
      }
      
      console.log('Activités extraites:', allActivities);
      
      // Transformer les données pour l'interface
      const transformedActivities: ActivityWithDetails[] = allActivities.map(activity => ({
        ...activity,
        responsable: activity.animateurs?.[0] || "Non assigné",
        description: activity.description || "Aucune description disponible"
      }));

      setActivities(transformedActivities);
      
    } catch (err: unknown) {
      console.error("Erreur détaillée:", err);
      
      let errorMessage = "Erreur lors du chargement des activités";
      
      if (err && typeof err === 'object') {
        // Erreur Axios
        if ('response' in err) {
          const axiosError = err as { response?: { data?: { message?: string } } };
          errorMessage = axiosError.response?.data?.message || errorMessage;
        } 
        // Erreur standard
        else if ('message' in err) {
          errorMessage = (err as Error).message;
        }
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const filterActivities = () => {
    let filtered = activities;

    // Filtre par recherche
    if (searchTerm) {
      filtered = filtered.filter(activity =>
        activity.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        activity.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        activity.projet.toLowerCase().includes(searchTerm.toLowerCase()) ||
        activity.lieu?.adresse?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        activity.lieu?.ville?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtre par statut
    if (statusFilter !== "all") {
      filtered = filtered.filter(activity => activity.statut === statusFilter);
    }

    setFilteredActivities(filtered);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "en_cours":
        return <Badge className="bg-warning text-warning-foreground">En cours</Badge>;
      case "termine":
        return <Badge className="bg-success text-success-foreground">Terminée</Badge>;
      case "annule":
        return <Badge className="bg-destructive text-destructive-foreground">Annulée</Badge>;
      default:
        return <Badge variant="secondary">Planifiée</Badge>;
    }
  };

  const formatDate = (date: Date): string => {
    return new Date(date).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatTime = (date: Date): string => {
    return new Date(date).toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getActivityTime = (activity: ActivityWithDetails): string => {
    const startTime = formatTime(activity.dateDebut);
    const endTime = activity.dateFin ? formatTime(activity.dateFin) : '';
    return endTime ? `${startTime} - ${endTime}` : startTime;
  };

  const handleViewDetails = (activityId: string) => {
    if (activityId && activityId.startsWith('temp-')) {
      alert("Cette activité n'est pas encore sauvegardée");
      return;
    }
    window.location.href = `/activities/${activityId}`;
  };

  const handleEditActivity = (activityId: string) => {
    if (activityId && activityId.startsWith('temp-')) {
      alert("Cette activité n'est pas encore sauvegardée");
      return;
    }
    window.location.href = `/activities/${activityId}/edit`;
  };

  const handleDeleteActivity = async (activityId: string) => {
    if (activityId && activityId.startsWith('temp-')) {
      alert("Cette activité n'est pas encore sauvegardée");
      return;
    }

    if (confirm("Êtes-vous sûr de vouloir supprimer cette activité ?")) {
      try {
        await activityService.delete(activityId);
        // Recharger la liste après suppression
        fetchActivities();
      } catch (error) {
        console.error("Erreur lors de la suppression:", error);
        alert("Erreur lors de la suppression de l'activité");
      }
    }
  };

  const handleNewActivity = () => {
    window.location.href = '/activities/new';
  };

  const handleRetry = () => {
    fetchActivities();
  };

  
  const getMockActivities = (): ActivityWithDetails[] => [
    {
      _id: 'temp-1',
      titre: "Formation en agriculture durable",
      description: "Formation sur les techniques d'agriculture biologique et durable",
      type: 'formation',
      dateDebut: new Date('2024-03-15T09:00:00'),
      dateFin: new Date('2024-03-15T12:00:00'),
      lieu: {
        ville: "Cotonou",
        adresse: "Centre communautaire de Cotonou"
      },
      participantsCibles: 25,
      participantsReels: 20,
      statut: 'planifie',
      projet: "AgriTech 2024",
      animateurs: ["Marie Kouassi"],
      responsable: "Marie Kouassi"
    },
    {
      _id: 'temp-2',
      titre: "Distribution de matériel médical",
      description: "Distribution de kits médicaux aux centres de santé",
      type: 'distribution',
      dateDebut: new Date('2024-03-15T14:00:00'),
      dateFin: new Date('2024-03-15T17:00:00'),
      lieu: {
        ville: "Cotonou",
        adresse: "Hôpital de zone"
      },
      participantsCibles: 150,
      participantsReels: 145,
      statut: 'en_cours',
      projet: "Santé pour Tous",
      animateurs: ["Dr. Adjovi"],
      responsable: "Dr. Adjovi"
    }
  ];

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
            <p className="mt-2 text-muted-foreground">Chargement des activités...</p>
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
            <div className="space-x-2">
              <Button onClick={handleRetry}>
                Réessayer
              </Button>
              <Button variant="outline" onClick={() => {
                setActivities(getMockActivities());
                setError(null);
              }}>
                Utiliser les données de démonstration
              </Button>
            </div>
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
            <h1 className="text-3xl font-bold text-heading-color">Gestion des Activités</h1>
            <p className="text-muted-foreground mt-1">
              Planifiez, suivez et gérez toutes les activités RAMP
              {activities.length > 0 && activities.some(a => a._id?.startsWith('temp-')) && (
                <span className="text-warning ml-2">(Données de démonstration)</span>
              )}
            </p>
          </div>
          <Button className="bg-gradient-primary" onClick={handleNewActivity}>
            <Plus className="mr-2 w-4 h-4" />
            Nouvelle activité
          </Button>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input 
                  placeholder="Rechercher une activité..." 
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
                <option value="planifie">Planifiée</option>
                <option value="en_cours">En cours</option>
                <option value="termine">Terminée</option>
                <option value="annule">Annulée</option>
              </select>

              <Button variant="outline" onClick={fetchActivities}>
                <Filter className="mr-2 w-4 h-4" />
                Actualiser
              </Button>
            </div>

            {/* Résultats de recherche */}
            <div className="mt-4 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {filteredActivities.length} activité(s) trouvée(s)
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

        {/* Activities List */}
        <div className="grid gap-6">
          {filteredActivities.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-heading-color mb-2">
                  Aucune activité trouvée
                </h3>
                <p className="text-muted-foreground mb-4">
                  {searchTerm || statusFilter !== "all" 
                    ? "Aucune activité ne correspond à vos critères de recherche." 
                    : "Aucune activité n'a été créée pour le moment."
                  }
                </p>
                <Button onClick={handleNewActivity}>
                  <Plus className="mr-2 w-4 h-4" />
                  Créer une activité
                </Button>
              </CardContent>
            </Card>
          ) : (
            filteredActivities.map((activity) => (
              <Card key={activity._id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                        <CardTitle className="text-lg">{activity.titre}</CardTitle>
                        {getStatusBadge(activity.statut || 'planifie')}
                        {activity._id?.startsWith('temp-') && (
                          <Badge variant="outline" className="text-xs">
                            Démo
                          </Badge>
                        )}
                      </div>
                      <CardDescription className="text-sm">
                        {activity.description}
                      </CardDescription>
                    </div>
                    <div className="flex items-center space-x-2 self-end sm:self-auto">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleViewDetails(activity._id!)}
                        title="Voir les détails"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleEditActivity(activity._id!)}
                        title="Modifier"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-destructive hover:text-destructive"
                        onClick={() => handleDeleteActivity(activity._id!)}
                        title="Supprimer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span>
                        {formatDate(activity.dateDebut)} à {getActivityTime(activity)}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span className="truncate" title={activity.lieu?.adresse || activity.lieu?.ville || 'Lieu non spécifié'}>
                        {activity.lieu?.adresse || activity.lieu?.ville || 'Lieu non spécifié'}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span>
                        {activity.participantsReels || activity.participantsCibles || 0} participants
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Target className="w-4 h-4 text-muted-foreground" />
                      <span className="truncate" title={activity.projet}>
                        {activity.projet}
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-border">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <p className="text-sm text-muted-foreground">
                        <span className="font-medium">Responsable:</span> {activity.responsable}
                      </p>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="text-xs">
                          {activity.type}
                        </Badge>
                        {activity.participantsReels && activity.participantsCibles && (
                          <Badge variant="outline" className="text-xs">
                            {Math.round((activity.participantsReels / activity.participantsCibles) * 100)}% de présence
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Activities;