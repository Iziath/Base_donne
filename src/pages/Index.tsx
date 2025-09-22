import { Layout } from "@/components/layout/Layout";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { RecentActivities } from "@/components/dashboard/RecentActivities";
import { ProjectsOverview } from "@/components/dashboard/ProjectsOverview";
import { 
  Users, 
  FolderOpen, 
  Heart, 
  Target, 
  TrendingUp,
  Calendar,
  AlertCircle
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Index = () => {
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
            value={12}
            change={{ value: "+2 ce mois", type: "increase" }}
            icon={FolderOpen}
          />
          <StatsCard
            title="Bénéficiaires"
            value="2,847"
            change={{ value: "+15%", type: "increase" }}
            icon={Heart}
          />
          <StatsCard
            title="Équipe & Bénévoles"
            value={45}
            change={{ value: "+3 cette semaine", type: "increase" }}
            icon={Users}
          />
          <StatsCard
            title="Activités ce mois"
            value={28}
            change={{ value: "+8", type: "increase" }}
            icon={Target}
          />
        </div>

        {/* Alerts and Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertCircle className="w-5 h-5 text-warning" />
                <span>Alertes importantes</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-warning-light rounded-lg">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Rapport mensuel en retard</p>
                  <Badge variant="secondary">3 jours</Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Projet AgriTech 2024
                </p>
              </div>
              <div className="p-3 bg-info-light rounded-lg">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Formation prévue demain</p>
                  <Badge className="bg-info text-white">Rappel</Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  25 participants inscrits
                </p>
              </div>
              <div className="p-3 bg-success-light rounded-lg">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Financement approuvé</p>
                  <Badge className="bg-success text-white">Nouveau</Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Projet Santé pour Tous - 50,000€
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="lg:col-span-2 space-y-6">
            <RecentActivities />
          </div>
        </div>

        {/* Projects Overview */}
        <ProjectsOverview />
      </div>
    </Layout>
  );
};

export default Index;
