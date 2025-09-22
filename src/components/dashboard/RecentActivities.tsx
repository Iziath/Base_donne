import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users, ExternalLink } from "lucide-react";

const activities = [
  {
    id: 1,
    title: "Formation en agriculture durable",
    project: "AgriTech 2024",
    date: "Aujourd'hui, 14:00",
    location: "Cotonou",
    participants: 25,
    status: "En cours" as const,
  },
  {
    id: 2,
    title: "Distribution de matériel médical",
    project: "Santé pour Tous",
    date: "Demain, 09:00",
    location: "Porto-Novo",
    participants: 150,
    status: "Programmée" as const,
  },
  {
    id: 3,
    title: "Atelier de sensibilisation",
    project: "Éducation Communautaire",
    date: "15 Jan, 10:00",
    location: "Parakou",
    participants: 80,
    status: "Programmée" as const,
  },
];

const statusColors = {
  "En cours": "bg-success text-white",
  "Programmée": "bg-info text-white",
  "Terminée": "bg-muted text-muted-foreground",
};

export function RecentActivities() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Activités récentes
          <Button variant="outline" size="sm">
            Voir tout
            <ExternalLink className="ml-2 w-4 h-4" />
          </Button>
        </CardTitle>
        <CardDescription>
          Aperçu des dernières activités et événements
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start space-x-4 p-4 bg-card-header rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="flex-1 space-y-2">
                <div className="flex items-start justify-between">
                  <h4 className="font-medium text-sm">{activity.title}</h4>
                  <Badge className={statusColors[activity.status]}>
                    {activity.status}
                  </Badge>
                </div>
                
                <p className="text-xs text-primary font-medium">{activity.project}</p>
                
                <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-3 h-3" />
                    <span>{activity.date}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-3 h-3" />
                    <span>{activity.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-3 h-3" />
                    <span>{activity.participants} participants</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}