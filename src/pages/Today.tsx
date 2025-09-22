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
  Plus
} from "lucide-react";

const Today = () => {
  const todayActivities = [
    {
      id: 1,
      title: "Formation en agriculture durable",
      time: "09:00 - 12:00",
      location: "Centre communautaire de Cotonou",
      participants: 25,
      status: "en_cours",
      project: "AgriTech 2024"
    },
    {
      id: 2,
      title: "Distribution de matériel médical",
      time: "14:00 - 17:00",
      location: "Hôpital de zone",
      participants: 150,
      status: "planifiee",
      project: "Santé pour Tous"
    },
    {
      id: 3,
      title: "Réunion équipe projet",
      time: "18:00 - 19:30",
      location: "Bureau RAMP",
      participants: 8,
      status: "planifiee",
      project: "Coordination interne"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "en_cours":
        return <Badge className="bg-warning text-warning-foreground">En cours</Badge>;
      case "terminee":
        return <Badge className="bg-success text-success-foreground">Terminée</Badge>;
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
            <h1 className="text-3xl font-bold text-heading-color">Activités du jour</h1>
            <p className="text-muted-foreground mt-1">
              {new Date().toLocaleDateString('fr-FR', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
          <Button className="bg-gradient-primary">
            <Plus className="mr-2 w-4 h-4" />
            Nouvelle activité
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-2xl font-bold text-heading-color">5</p>
                  <p className="text-sm text-muted-foreground">Activités prévues</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-secondary" />
                <div>
                  <p className="text-2xl font-bold text-heading-color">183</p>
                  <p className="text-sm text-muted-foreground">Participants</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-success" />
                <div>
                  <p className="text-2xl font-bold text-heading-color">2</p>
                  <p className="text-sm text-muted-foreground">Terminées</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <AlertCircle className="w-5 h-5 text-warning" />
                <div>
                  <p className="text-2xl font-bold text-heading-color">1</p>
                  <p className="text-sm text-muted-foreground">En retard</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Activities List */}
        <Card>
          <CardHeader>
            <CardTitle>Planning d'aujourd'hui</CardTitle>
            <CardDescription>
              Toutes les activités prévues pour aujourd'hui
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {todayActivities.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-semibold text-heading-color">{activity.title}</h3>
                      {getStatusBadge(activity.status)}
                    </div>
                    <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{activity.time}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span>{activity.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>{activity.participants} participants</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Target className="w-4 h-4" />
                        <span>{activity.project}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      Détails
                    </Button>
                    <Button variant="default" size="sm">
                      Modifier
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Today;