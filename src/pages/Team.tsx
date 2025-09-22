import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Search, 
  Filter, 
  Plus, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Users,
  UserPlus,
  Edit,
  Trash2
} from "lucide-react";

const Team = () => {
  const teamMembers = [
    {
      id: 1,
      name: "Marie Kouassi",
      role: "Coordinatrice de projet",
      email: "marie.kouassi@ramp.org",
      phone: "+229 97 xx xx xx",
      location: "Cotonou",
      status: "actif",
      type: "personnel",
      joinDate: "2023-01-15",
      projects: ["AgriTech 2024", "Santé pour Tous"]
    },
    {
      id: 2,
      name: "Dr. Jean Adjovi",
      role: "Responsable Santé",
      email: "j.adjovi@ramp.org",
      phone: "+229 96 xx xx xx",
      location: "Porto-Novo",
      status: "actif",
      type: "personnel",
      joinDate: "2022-06-10",
      projects: ["Santé pour Tous", "Santé Scolaire"]
    },
    {
      id: 3,
      name: "Fatou Bello",
      role: "Animatrice communautaire",
      email: "fatou.bello@ramp.org",
      phone: "+229 95 xx xx xx",
      location: "Bohicon",
      status: "actif",
      type: "benevole",
      joinDate: "2023-09-01",
      projects: ["Santé Scolaire"]
    },
    {
      id: 4,
      name: "Aïcha Dossou",
      role: "Formatrice micro-crédit",
      email: "aicha.dossou@ramp.org",
      phone: "+229 94 xx xx xx",
      location: "Parakou",
      status: "actif",
      type: "stagiaire",
      joinDate: "2024-02-01",
      projects: ["Entrepreneuriat Féminin"]
    },
    {
      id: 5,
      name: "Pierre Akpovi",
      role: "Agent de terrain",
      email: "pierre.akpovi@ramp.org",
      phone: "+229 93 xx xx xx",
      location: "Abomey",
      status: "inactif",
      type: "personnel",
      joinDate: "2021-03-20",
      projects: []
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "actif":
        return <Badge className="bg-success text-success-foreground">Actif</Badge>;
      case "conge":
        return <Badge className="bg-warning text-warning-foreground">En congé</Badge>;
      default:
        return <Badge variant="secondary">Inactif</Badge>;
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "personnel":
        return <Badge variant="default">Personnel</Badge>;
      case "benevole":
        return <Badge className="bg-secondary text-secondary-foreground">Bénévole</Badge>;
      case "stagiaire":
        return <Badge className="bg-info text-white">Stagiaire</Badge>;
      default:
        return <Badge variant="outline">Autre</Badge>;
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2);
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-heading-color">Gestion de l'Équipe</h1>
            <p className="text-muted-foreground mt-1">
              Personnel, bénévoles et stagiaires RAMP-BENIN
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline">
              <UserPlus className="mr-2 w-4 h-4" />
              Inviter
            </Button>
            <Button className="bg-gradient-primary">
              <Plus className="mr-2 w-4 h-4" />
              Nouveau membre
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-2xl font-bold text-heading-color">24</p>
                  <p className="text-sm text-muted-foreground">Personnel</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-secondary" />
                <div>
                  <p className="text-2xl font-bold text-heading-color">15</p>
                  <p className="text-sm text-muted-foreground">Bénévoles</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-info" />
                <div>
                  <p className="text-2xl font-bold text-heading-color">6</p>
                  <p className="text-sm text-muted-foreground">Stagiaires</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-success" />
                <div>
                  <p className="text-2xl font-bold text-heading-color">41</p>
                  <p className="text-sm text-muted-foreground">Actifs</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input 
                  placeholder="Rechercher un membre de l'équipe..." 
                  className="pl-10"
                />
              </div>
              <Button variant="outline">
                <Filter className="mr-2 w-4 h-4" />
                Filtres
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Team Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((member) => (
            <Card key={member.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src="" />
                      <AvatarFallback>{getInitials(member.name)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{member.name}</CardTitle>
                      <CardDescription>{member.role}</CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
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
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    {getStatusBadge(member.status)}
                    {getTypeBadge(member.type)}
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <span>{member.email}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span>{member.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span>{member.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span>Depuis {new Date(member.joinDate).toLocaleDateString('fr-FR')}</span>
                    </div>
                  </div>

                  {member.projects.length > 0 && (
                    <div className="pt-2 border-t border-border">
                      <p className="text-sm font-medium mb-2">Projets assignés:</p>
                      <div className="flex flex-wrap gap-1">
                        {member.projects.map((project, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {project}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Team;