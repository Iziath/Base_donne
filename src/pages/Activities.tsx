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
  Trash2
} from "lucide-react";

const Activities = () => {
  const activities = [
    {
      id: 1,
      title: "Formation en agriculture durable",
      description: "Formation sur les techniques d'agriculture biologique et durable",
      date: "2024-03-15",
      time: "09:00 - 12:00",
      location: "Centre communautaire de Cotonou",
      participants: 25,
      status: "planifiee",
      project: "AgriTech 2024",
      responsable: "Marie Kouassi"
    },
    {
      id: 2,
      title: "Distribution de matériel médical",
      description: "Distribution de kits médicaux aux centres de santé",
      date: "2024-03-15",
      time: "14:00 - 17:00",
      location: "Hôpital de zone",
      participants: 150,
      status: "en_cours",
      project: "Santé pour Tous",
      responsable: "Dr. Adjovi"
    },
    {
      id: 3,
      title: "Sensibilisation à l'hygiène",
      description: "Campagne de sensibilisation dans les écoles",
      date: "2024-03-16",
      time: "08:00 - 16:00",
      location: "École primaire de Bohicon",
      participants: 200,
      status: "terminee",
      project: "Santé Scolaire",
      responsable: "Fatou Bello"
    },
    {
      id: 4,
      title: "Formation micro-crédit",
      description: "Formation sur la gestion de micro-entreprises",
      date: "2024-03-18",
      time: "10:00 - 15:00",
      location: "Salle communale",
      participants: 30,
      status: "planifiee",
      project: "Entrepreneuriat Féminin",
      responsable: "Aïcha Dossou"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "en_cours":
        return <Badge className="bg-warning text-warning-foreground">En cours</Badge>;
      case "terminee":
        return <Badge className="bg-success text-success-foreground">Terminée</Badge>;
      case "annulee":
        return <Badge className="bg-destructive text-destructive-foreground">Annulée</Badge>;
      default:
        return <Badge variant="secondary">Planifiée</Badge>;
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-heading-color">Gestion des Activités</h1>
            <p className="text-muted-foreground mt-1">
              Planifiez, suivez et gérez toutes les activités RAMP
            </p>
          </div>
          <Button className="bg-gradient-primary">
            <Plus className="mr-2 w-4 h-4" />
            Nouvelle activité
          </Button>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input 
                  placeholder="Rechercher une activité..." 
                  className="pl-10"
                />
              </div>
              <Button variant="outline">
                <Filter className="mr-2 w-4 h-4" />
                Filtres
              </Button>
              <Button variant="outline">
                <Calendar className="mr-2 w-4 h-4" />
                Calendrier
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Activities List */}
        <div className="grid gap-6">
          {activities.map((activity) => (
            <Card key={activity.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <CardTitle className="text-lg">{activity.title}</CardTitle>
                      {getStatusBadge(activity.status)}
                    </div>
                    <CardDescription className="text-sm">
                      {activity.description}
                    </CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-destructive">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span>{new Date(activity.date).toLocaleDateString('fr-FR')} à {activity.time}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span>{activity.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <span>{activity.participants} participants</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Target className="w-4 h-4 text-muted-foreground" />
                    <span>{activity.project}</span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium">Responsable:</span> {activity.responsable}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Activities;