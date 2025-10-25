
import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Target, 
  CheckCircle,
  AlertCircle,
  Plus,
  Loader2,
  XCircle
} from "lucide-react";
import activityService, { Activity } from "@/services/activityService";
import dashboardService, { DashboardStats, RecentActivity } from "@/services/dashboardservice";

interface TodayActivity {
  id: string;
  title: string;
  time: string;
  location: string;
  participants: number;
  status: "planifie" | "en_cours" | "termine" | "annule";
  project: string;
  startTime: string;
  endTime: string;
  type: Activity['type'];
}

interface TodayStats {
  planned: number;
  participants: number;
  completed: number;
  delayed: number;
}

const Today = () => {
  const [activities, setActivities] = useState<TodayActivity[]>([]);
  const [stats, setStats] = useState<TodayStats>({
    planned: 0,
    participants: 0,
    delayed: 0,
    completed: 0
  });
  const [dashboardStats, setDashboardStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentDate, setCurrentDate] = useState("");


  useEffect(() => {
    fetchTodayData();
    updateCurrentDate();
    
    const interval = setInterval(updateCurrentDate, 60000);
    return () => clearInterval(interval);
  }, []);

  const updateCurrentDate = () => {
    setCurrentDate(
      new Date().toLocaleDateString('fr-FR', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })
    );
  };

  const fetchTodayData = async () => {
    try {
      setLoading(true);
      setError(null);
      
    
      const [allActivitiesResponse, dashboardData] = await Promise.all([
        activityService.getAll(),
        dashboardService.getStats()
      ]);

      setDashboardStats(dashboardData);

      // VÉRIFICATION IMPORTANTE : S'assurer que allActivities est un tableau
      const allActivities = Array.isArray(allActivitiesResponse) 
        ? allActivitiesResponse 
        : [];

      console.log('Activités chargées:', allActivities); // Debug

      // Filtrer les activités d'aujourd'hui
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const todayActivities = allActivities.filter(activity => {
        if (!activity || !activity.dateDebut) return false;
        
        try {
          const activityDate = new Date(activity.dateDebut);
          activityDate.setHours(0, 0, 0, 0);
          return activityDate.getTime() === today.getTime();
        } catch (dateError) {
          console.error('Erreur de date pour l\'activité:', activity, dateError);
          return false;
        }
      });

      console.log('Activités du jour filtrées:', todayActivities); // Debug

      // Transformer les données pour l'interface
      const transformedActivities: TodayActivity[] = todayActivities.map(activity => ({
        id: activity._id || Math.random().toString(),
        title: activity.titre || 'Sans titre',
        time: `${formatTime(activity.dateDebut)} - ${activity.dateFin ? formatTime(activity.dateFin) : 'N/A'}`,
        location: activity.lieu?.adresse || activity.lieu?.ville || 'Lieu non spécifié',
        participants: activity.participantsReels || activity.participantsCibles || 0,
        status: activity.statut || 'planifie',
        project: activity.projet || 'Projet non spécifié',
        startTime: formatTime(activity.dateDebut),
        endTime: activity.dateFin ? formatTime(activity.dateFin) : '',
        type: activity.type || 'autre'
      }));

      setActivities(transformedActivities);
      calculateStats(transformedActivities);
      
    } catch (err: unknown) {
      console.error("Erreur lors du chargement des données:", err);
      
      let errorMessage = "Erreur lors du chargement des données";
      
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosError = err as { response?: { data?: { message?: string } } };
        if (axiosError.response?.data?.message) {
          errorMessage = axiosError.response.data.message;
        }
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (date: Date): string => {
    return new Date(date).toLocaleTimeString('fr-FR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const calculateStats = (activitiesData: TodayActivity[]) => {
    const planned = activitiesData.length;
    const participants = activitiesData.reduce((sum, activity) => sum + activity.participants, 0);
    const completed = activitiesData.filter(activity => activity.status === "termine").length;
    
    // Calcul des activités en retard (en cours mais dépassant l'heure de fin)
    const delayed = activitiesData.filter(activity => 
      activity.status === "en_cours" && isActivityDelayed(activity)
    ).length;

    setStats({ planned, participants, completed, delayed });
  };

  const isActivityDelayed = (activity: TodayActivity): boolean => {
    if (!activity.endTime) return false;
    
    const now = new Date();
    const [endHours, endMinutes] = activity.endTime.split(':').map(Number);
    const endTime = new Date();
    endTime.setHours(endHours, endMinutes, 0, 0);
    
    return now > endTime;
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "en_cours":
        return <Clock className="w-4 h-4" />;
      case "termine":
        return <CheckCircle className="w-4 h-4" />;
      case "annule":
        return <XCircle className="w-4 h-4" />;
      default:
        return <Calendar className="w-4 h-4" />;
    }
  };

  const getActivityTypeIcon = (type: Activity['type']) => {
    switch (type) {
      case 'formation':
        return '';
      case 'distribution':
        return '';
      case 'atelier':
        return '';
      case 'reunion':
        return '';
      case 'sensibilisation':
        return '';
      default:
        return '';
    }
  };

  const handleActivityAction = async (activityId: string, action: "details" | "edit") => {
    try {
      if (action === "details") {
        // Navigation vers la page de détails
        window.location.href = `/activities/${activityId}`;
      } else if (action === "edit") {
        // Navigation vers la page d'édition
        window.location.href = `/activities/${activityId}/edit`;
      }
    } catch (error) {
      console.error("Erreur lors de l'action:", error);
    }
  };

  const handleNewActivity = () => {
    window.location.href = '/activities/new';
  };

  const handleRetry = () => {
    fetchTodayData();
  };

  // Fonction pour trier les activités par heure de début
  const getSortedActivities = () => {
    return [...activities].sort((a, b) => {
      const timeA = a.startTime.replace(':', '');
      const timeB = b.startTime.replace(':', '');
      return parseInt(timeA) - parseInt(timeB);
    });
  };

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
            <h1 className="text-3xl font-bold text-heading-color">Activités du jour</h1>
            <p className="text-muted-foreground mt-1">{currentDate}</p>
            {dashboardStats && (
              <p className="text-sm text-muted-foreground">
                {dashboardStats.activities.total} activités totales • {dashboardStats.projects.active} projets actifs
              </p>
            )}
          </div>
          <Button 
            className="bg-gradient-primary whitespace-nowrap"
            onClick={handleNewActivity}
          >
            <Plus className="mr-2 w-4 h-4" />
            Nouvelle activité
          </Button>
        </div>

        {/* Summary Cards avec données du dashboard */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Calendar className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-heading-color">
                    {dashboardStats ? dashboardStats.activities.today : stats.planned}
                  </p>
                  <p className="text-sm text-muted-foreground">Activités aujourd'hui</p>
                  {dashboardStats && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {dashboardStats.activities.thisMonth} ce mois
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-secondary/10 rounded-lg">
                  <Users className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-heading-color">
                    {dashboardStats ? dashboardStats.beneficiaries.total : stats.participants}
                  </p>
                  <p className="text-sm text-muted-foreground">Bénéficiaires</p>
                  {dashboardStats && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {dashboardStats.team.total} membres d'équipe
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-success/10 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-success" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-heading-color">{stats.completed}</p>
                  <p className="text-sm text-muted-foreground">Terminées aujourd'hui</p>
                  {dashboardStats && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {dashboardStats.projects.total} projets total
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-warning/10 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-warning" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-heading-color">{stats.delayed}</p>
                  <p className="text-sm text-muted-foreground">En retard</p>
                  {dashboardStats && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {dashboardStats.projects.active} projets actifs
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Activities List */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle>Planning d'aujourd'hui</CardTitle>
                <CardDescription>
                  Toutes les activités prévues pour aujourd'hui - {activities.length} activité(s)
                  {dashboardStats && (
                    <span> • {dashboardStats.projects.active} projets actifs</span>
                  )}
                </CardDescription>
              </div>
              <div className="flex items-center space-x-2 mt-2 sm:mt-0">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={fetchTodayData}
                >
                  <Loader2 className="w-4 h-4 mr-2" />
                  Actualiser
                </Button>
                <Button 
                  size="sm"
                  onClick={handleNewActivity}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Nouvelle
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {activities.length === 0 ? (
              <div className="text-center py-8">
                <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Aucune activité prévue pour aujourd'hui</p>
                <Button 
                  className="mt-4 bg-gradient-primary"
                  onClick={handleNewActivity}
                >
                  <Plus className="mr-2 w-4 h-4" />
                  Créer une activité
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {getSortedActivities().map((activity) => (
                  <div 
                    key={activity.id} 
                    className="flex flex-col lg:flex-row lg:items-center justify-between p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors group"
                  >
                    <div className="flex-1 mb-3 lg:mb-0">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{getActivityTypeIcon(activity.type)}</span>
                          <h3 className="font-semibold text-heading-color text-lg group-hover:text-primary transition-colors">
                            {activity.title}
                          </h3>
                        </div>
                        <div className="flex items-center gap-2">
                          {getStatusBadge(activity.status)}
                          <span className="flex items-center text-xs text-muted-foreground">
                            {getStatusIcon(activity.status)}
                          </span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4" />
                          <span className="font-medium">{activity.time}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4" />
                          <span className="truncate" title={activity.location}>
                            {activity.location}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Users className="w-4 h-4" />
                          <span>{activity.participants} participants</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Target className="w-4 h-4" />
                          <span className="truncate" title={activity.project}>
                            {activity.project}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 self-end lg:self-auto">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleActivityAction(activity.id, "details")}
                        className="hover:bg-primary hover:text-primary-foreground"
                      >
                        Détails
                      </Button>
                      <Button 
                        variant="default" 
                        size="sm"
                        onClick={() => handleActivityAction(activity.id, "edit")}
                      >
                        Modifier
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Section statistiques supplémentaires du dashboard */}
        {dashboardStats && dashboardStats.recentActivities && dashboardStats.recentActivities.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Activités récentes</CardTitle>
              <CardDescription>
                Dernières activités sur tous les projets
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {dashboardStats.recentActivities.slice(0, 5).map((activity) => (
                  <div key={activity._id} className="flex items-center justify-between py-2 border-b border-border last:border-b-0">
                    <div className="flex-1">
                      <p className="font-medium text-sm">{activity.description}</p>
                      <p className="text-xs text-muted-foreground">{activity.projectNom}</p>
                    </div>
                    <Badge variant={activity.statut === 'termine' ? 'default' : 'secondary'}>
                      {activity.statut}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default Today;