import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Calendar, DollarSign } from "lucide-react";

const projects = [
  {
    id: 1,
    name: "AgriTech 2024",
    description: "Modernisation de l'agriculture locale",
    progress: 78,
    status: "En cours" as const,
    deadline: "Mar 2024",
    budget: "50,000€",
    beneficiaries: 500,
  },
  {
    id: 2,
    name: "Santé pour Tous",
    description: "Amélioration de l'accès aux soins",
    progress: 45,
    status: "En cours" as const,
    deadline: "Juin 2024",
    budget: "75,000€",
    beneficiaries: 1200,
  },
  {
    id: 3,
    name: "Éducation Communautaire",
    description: "Formation et alphabétisation",
    progress: 92,
    status: "Finalisation" as const,
    deadline: "Jan 2024",
    budget: "30,000€",
    beneficiaries: 300,
  },
];

const statusColors = {
  "En cours": "bg-info text-white",
  "Finalisation": "bg-warning text-white",
  "Terminé": "bg-success text-white",
  "En attente": "bg-muted text-muted-foreground",
};

export function ProjectsOverview() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Projets en cours
          <Button variant="outline" size="sm">
            Gérer les projets
            <ExternalLink className="ml-2 w-4 h-4" />
          </Button>
        </CardTitle>
        <CardDescription>
          Suivi de l'avancement des projets actifs
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {projects.map((project) => (
            <div key={project.id} className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <h4 className="font-medium text-sm">{project.name}</h4>
                  <p className="text-xs text-muted-foreground">{project.description}</p>
                </div>
                <Badge className={statusColors[project.status]}>
                  {project.status}
                </Badge>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Progression</span>
                  <span className="font-medium">{project.progress}%</span>
                </div>
                <Progress value={project.progress} className="h-2" />
              </div>
              
              <div className="grid grid-cols-3 gap-4 text-xs">
                <div className="flex items-center space-x-1 text-muted-foreground">
                  <Calendar className="w-3 h-3" />
                  <span>Échéance: {project.deadline}</span>
                </div>
                <div className="flex items-center space-x-1 text-muted-foreground">
                  <DollarSign className="w-3 h-3" />
                  <span>Budget: {project.budget}</span>
                </div>
                <div className="text-muted-foreground">
                  <span>{project.beneficiaries} bénéficiaires</span>
                </div>
              </div>
              
              {project !== projects[projects.length - 1] && (
                <div className="border-b border-border pt-2"></div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}