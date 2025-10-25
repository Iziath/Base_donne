
import { useEffect, useState } from 'react';
import { Layout } from "@/components/layout/Layout";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import dashboardService, { DashboardStats, ProjectProgress, RecentActivity } from '@/services/dashboardservice';
import { 
  Users, 
  FolderOpen, 
  Heart, 
  Target, 
  TrendingUp,
  Calendar,
  AlertCircle,
  Loader2
} from "lucide-react";
import { toast } from '@/hooks/use-toast';

const Index = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const data = await dashboardService.getStats();
      setStats(data);
    } catch (error:unknown ) {
      toast({
        title: "Erreur",
        description: "Impossible de charger les statistiques",
        variant: "destructive",
      });
      console.error('Error fetching dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-96">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-heading-color">Tableau de bord</h1>
            <p className="text-muted-foreground mt-1">
              Vue d'ensemble des activités RAMP-BENIN
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline">
              <Calendar className="mr-2 w-4 h-4" />
              Planifier une activité
            </Button>
            <Button className="bg-gradient-primary">
              <TrendingUp className="mr-2 w-4 h-4" />
              Nouveau rapport
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Projets actifs"
            value={stats?.projects.active || 0}
            change={{ 
              value: `+${stats?.projects.newThisMonth || 0} ce mois`, 
              type: "increase" 
            }}
            icon={FolderOpen}
          />
          <StatsCard
            title="Bénéficiaires"
            value={stats?.beneficiaries.total.toLocaleString() || "0"}
            change={{ value: "+15%", type: "increase" }}
            icon={Heart}
          />
          <StatsCard
            title="Équipe & Bénévoles"
            value={stats?.team.total || 0}
            change={{ value: "+3 cette semaine", type: "increase" }}
            icon={Users}
          />
          <StatsCard
            title="Activités ce mois"
            value={stats?.activities.thisMonth || 0}
            change={{ 
              value: `${stats?.activities.today || 0} aujourd'hui`, 
              type: "increase" 
            }}
            icon={Target}
          />
        </div>

        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle>Activités récentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats?.recentActivities && stats.recentActivities.length > 0 ? (
                stats.recentActivities.map((activity: RecentActivity) => (
                  <div key={activity._id} className="flex items-start space-x-4 p-4 bg-card-header rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{activity.description}</h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(activity.date).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                    <Badge className={
                      activity.statut === 'termine' ? 'bg-success' :
                      activity.statut === 'en_cours' ? 'bg-warning' : 'bg-info'
                    }>
                      {activity.statut}
                    </Badge>
                  </div>
                ))
              ) : (
                <p className="text-center text-muted-foreground py-8">
                  Aucune activité récente
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Projects Progress */}
        {stats?.projectsProgress && stats.projectsProgress.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Progression des projets</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stats.projectsProgress.map((project: ProjectProgress) => (
                  <div key={project._id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{project.nom}</span>
                      <span className="text-sm text-muted-foreground">
                        {project.progression}%
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all"
                        style={{ width: `${project.progression}%` }}
                      />
                    </div>
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

export default Index;