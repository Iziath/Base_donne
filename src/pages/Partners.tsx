import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Filter, 
  Plus, 
  Building2, 
  Mail, 
  Phone, 
  Globe, 
  MapPin,
  Handshake,
  Eye,
  Edit,
  Trash2
} from "lucide-react";

const Partners = () => {
  const partners = [
    {
      id: 1,
      name: "UNICEF Bénin",
      type: "international",
      category: "Santé & Éducation",
      email: "contact@unicef.org",
      phone: "+229 21 xx xx xx",
      website: "www.unicef.org/benin",
      location: "Cotonou",
      status: "actif",
      partnership: "Projet Santé Scolaire",
      since: "2022-01-15",
      description: "Partenariat pour l'amélioration de la santé et de l'éducation des enfants"
    },
    {
      id: 2,
      name: "Ministère de la Santé",
      type: "gouvernemental",
      category: "Santé publique",
      email: "info@sante.gouv.bj",
      phone: "+229 21 xx xx xx",
      website: "www.sante.gouv.bj",
      location: "Porto-Novo",
      status: "actif",
      partnership: "Santé pour Tous",
      since: "2021-06-10",
      description: "Collaboration pour le renforcement du système de santé"
    },
    {
      id: 3,
      name: "Fondation Agri-Développement",
      type: "prive",
      category: "Agriculture",
      email: "contact@agridev.org",
      phone: "+229 96 xx xx xx",
      website: "www.agridev.org",
      location: "Parakou",
      status: "actif",
      partnership: "AgriTech 2024",
      since: "2023-03-20",
      description: "Développement de l'agriculture durable et moderne"
    },
    {
      id: 4,
      name: "ONG Femmes Entrepreneuses",
      type: "ong",
      category: "Entrepreneuriat",
      email: "info@femmes-ent.org",
      phone: "+229 95 xx xx xx",
      website: "www.femmes-entrepreneuses.org",
      location: "Bohicon",
      status: "actif",
      partnership: "Entrepreneuriat Féminin",
      since: "2023-09-01",
      description: "Autonomisation économique des femmes"
    },
    {
      id: 5,
      name: "Banque Mondiale",
      type: "international",
      category: "Financement",
      email: "contact@worldbank.org",
      phone: "+229 21 xx xx xx",
      website: "www.worldbank.org",
      location: "Cotonou",
      status: "en_negociation",
      partnership: "Projet Infrastructure",
      since: "2024-01-15",
      description: "Financement pour le développement rural"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "actif":
        return <Badge className="bg-success text-success-foreground">Actif</Badge>;
      case "en_negociation":
        return <Badge className="bg-warning text-warning-foreground">En négociation</Badge>;
      case "suspendu":
        return <Badge className="bg-destructive text-destructive-foreground">Suspendu</Badge>;
      default:
        return <Badge variant="secondary">Inactif</Badge>;
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "international":
        return <Badge className="bg-primary text-primary-foreground">International</Badge>;
      case "gouvernemental":
        return <Badge className="bg-secondary text-secondary-foreground">Gouvernemental</Badge>;
      case "prive":
        return <Badge className="bg-info text-white">Privé</Badge>;
      case "ong":
        return <Badge className="bg-accent text-accent-foreground">ONG</Badge>;
      default:
        return <Badge variant="outline">Autre</Badge>;
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-heading-color">Gestion des Partenaires</h1>
            <p className="text-muted-foreground mt-1">
              Organisations partenaires et collaborateurs RAMP-BENIN
            </p>
          </div>
          <Button className="bg-gradient-primary">
            <Plus className="mr-2 w-4 h-4" />
            Nouveau partenaire
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Building2 className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-2xl font-bold text-heading-color">15</p>
                  <p className="text-sm text-muted-foreground">Partenaires actifs</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Handshake className="w-5 h-5 text-secondary" />
                <div>
                  <p className="text-2xl font-bold text-heading-color">8</p>
                  <p className="text-sm text-muted-foreground">Nouveaux en 2024</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Globe className="w-5 h-5 text-info" />
                <div>
                  <p className="text-2xl font-bold text-heading-color">5</p>
                  <p className="text-sm text-muted-foreground">Internationaux</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Building2 className="w-5 h-5 text-warning" />
                <div>
                  <p className="text-2xl font-bold text-heading-color">3</p>
                  <p className="text-sm text-muted-foreground">En négociation</p>
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
                  placeholder="Rechercher un partenaire..." 
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

        {/* Partners List */}
        <div className="grid gap-6">
          {partners.map((partner) => (
            <Card key={partner.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <CardTitle className="text-lg">{partner.name}</CardTitle>
                      {getStatusBadge(partner.status)}
                      {getTypeBadge(partner.type)}
                    </div>
                    <CardDescription className="text-sm">
                      {partner.description}
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span>{partner.email}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span>{partner.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Globe className="w-4 h-4 text-muted-foreground" />
                    <span>{partner.website}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span>{partner.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Handshake className="w-4 h-4 text-muted-foreground" />
                    <span>{partner.partnership}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Building2 className="w-4 h-4 text-muted-foreground" />
                    <span>{partner.category}</span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium">Partenaire depuis:</span> {new Date(partner.since).toLocaleDateString('fr-FR')}
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

export default Partners;