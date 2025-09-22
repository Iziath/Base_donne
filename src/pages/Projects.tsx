import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { 
  Plus, 
  Search, 
  Filter, 
  Calendar, 
  MapPin, 
  Users, 
  DollarSign,
  MoreVertical,
  Edit,
  Trash2,
  Eye
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const projects = [
  {
    id: 1,
    name: "AgriTech 2024",
    description: "Modernisation de l'agriculture locale avec introduction de techniques durables",
    status: "En cours",
    progress: 78,
    startDate: "Jan 2024",
    endDate: "Mar 2024",
    budget: "50,000€",
    location: "Cotonou, Parakou",
    beneficiaries: 500,
    responsible: "Marie Kone",
    activities: 12,
  },
  {
    id: 2,
    name: "Santé pour Tous",
    description: "Amélioration de l'accès aux soins de santé primaires",
    status: "En cours",
    progress: 45,
    startDate: "Fév 2024",
    endDate: "Juin 2024",
    budget: "75,000€",
    location: "Porto-Novo, Abomey",
    beneficiaries: 1200,
    responsible: "Dr. Jean Mensah",
    activities: 8,
  },
  {
    id: 3,
    name: "Éducation Communautaire",
    description: "Programme de formation et d'alphabétisation des adultes",
    status: "Finalisation",
    progress: 92,
    startDate: "Oct 2023",
    endDate: "Jan 2024",
    budget: "30,000€",
    location: "Natitingou",
    beneficiaries: 300,
    responsible: "Fatou Diallo",
    activities: 15,
  },
  {
    id: 4,
    name: "Entrepreneuriat Féminin",
    description: "Accompagnement des femmes entrepreneurs",
    status: "En attente",
    progress: 0,
    startDate: "Mar 2024",
    endDate: "Sept 2024",
    budget: "40,000€",
    location: "Bohicon, Savalou",
    beneficiaries: 200,
    responsible: "Aïcha Koffi",
    activities: 0,
  },
];

const statusColors = {
  "En cours": "bg-info text-white",
  "Finalisation": "bg-warning text-white",
  "Terminé": "bg-success text-white",
  "En attente": "bg-muted text-muted-foreground",
};

const Projects = () => {
  return (
    <Layout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-heading-color">Gestion des Projets</h1>
            <p className="text-muted-foreground mt-1">
              Suivi et administration de tous les projets RAMP-BENIN
            </p>
          </div>
          <Button className="bg-gradient-primary">
            <Plus className="mr-2 w-4 h-4" />
            Nouveau projet
          </Button>
        </div>

        {/* Filters and Search */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input 
                  placeholder="Rechercher un projet..." 
                  className="pl-10"
                />
              </div>
              <Button variant="outline">
                <Filter className="mr-2 w-4 h-4" />
                Filtrer
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {projects.map((project) => (
            <Card key={project.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <CardTitle className="text-lg">{project.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {project.description}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={statusColors[project.status]}>
                      {project.status}
                    </Badge>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          Voir détails
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Modifier
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Supprimer
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Progress */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Progression</span>
                    <span className="font-medium">{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="h-2" />
                </div>

                {/* Project Info */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>{project.startDate} - {project.endDate}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>{project.location}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-muted-foreground">
                      <DollarSign className="w-4 h-4" />
                      <span>{project.budget}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-muted-foreground">
                      <Users className="w-4 h-4" />
                      <span>{project.beneficiaries} bénéficiaires</span>
                    </div>
                  </div>
                </div>

                {/* Responsible and Activities */}
                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <div className="text-sm">
                    <span className="text-muted-foreground">Responsable: </span>
                    <span className="font-medium">{project.responsible}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {project.activities} activités
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Projects;