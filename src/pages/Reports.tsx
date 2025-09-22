import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Filter, 
  Plus, 
  Download, 
  FileText, 
  Calendar, 
  BarChart3,
  TrendingUp,
  Eye,
  Edit,
  Trash2
} from "lucide-react";

const Reports = () => {
  const reports = [
    {
      id: 1,
      title: "Rapport mensuel - Mars 2024",
      type: "mensuel",
      project: "AgriTech 2024",
      author: "Marie Kouassi",
      date: "2024-03-31",
      status: "termine",
      format: "PDF",
      size: "2.4 MB",
      downloads: 25
    },
    {
      id: 2,
      title: "Rapport d'activité - Santé pour Tous",
      type: "activite",
      project: "Santé pour Tous",
      author: "Dr. Jean Adjovi",
      date: "2024-03-28",
      status: "termine",
      format: "PDF",
      size: "1.8 MB",
      downloads: 18
    },
    {
      id: 3,
      title: "Rapport trimestriel Q1 2024",
      type: "trimestriel",
      project: "Tous projets",
      author: "Admin RAMP",
      date: "2024-03-31",
      status: "en_cours",
      format: "PDF",
      size: "3.2 MB",
      downloads: 12
    },
    {
      id: 4,
      title: "Analyse des bénéficiaires",
      type: "analyse",
      project: "Entrepreneuriat Féminin",
      author: "Aïcha Dossou",
      date: "2024-03-25",
      status: "termine",
      format: "Excel",
      size: "892 KB",
      downloads: 8
    },
    {
      id: 5,
      title: "Rapport financier - Q1 2024",
      type: "financier",
      project: "Tous projets",
      author: "Comptabilité",
      date: "2024-04-05",
      status: "brouillon",
      format: "PDF",
      size: "1.5 MB",
      downloads: 0
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "termine":
        return <Badge className="bg-success text-success-foreground">Terminé</Badge>;
      case "en_cours":
        return <Badge className="bg-warning text-warning-foreground">En cours</Badge>;
      case "brouillon":
        return <Badge variant="secondary">Brouillon</Badge>;
      default:
        return <Badge variant="outline">Planifié</Badge>;
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "mensuel":
        return <Badge className="bg-primary text-primary-foreground">Mensuel</Badge>;
      case "trimestriel":
        return <Badge className="bg-secondary text-secondary-foreground">Trimestriel</Badge>;
      case "activite":
        return <Badge className="bg-info text-white">Activité</Badge>;
      case "financier":
        return <Badge className="bg-accent text-accent-foreground">Financier</Badge>;
      case "analyse":
        return <Badge variant="outline">Analyse</Badge>;
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
            <h1 className="text-3xl font-bold text-heading-color">Rapports & Analytics</h1>
            <p className="text-muted-foreground mt-1">
              Génération et gestion des rapports d'activité
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline">
              <BarChart3 className="mr-2 w-4 h-4" />
              Analytics
            </Button>
            <Button className="bg-gradient-primary">
              <Plus className="mr-2 w-4 h-4" />
              Nouveau rapport
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <FileText className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-2xl font-bold text-heading-color">24</p>
                  <p className="text-sm text-muted-foreground">Rapports générés</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Download className="w-5 h-5 text-secondary" />
                <div>
                  <p className="text-2xl font-bold text-heading-color">156</p>
                  <p className="text-sm text-muted-foreground">Téléchargements</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-info" />
                <div>
                  <p className="text-2xl font-bold text-heading-color">8</p>
                  <p className="text-sm text-muted-foreground">Ce mois</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-success" />
                <div>
                  <p className="text-2xl font-bold text-heading-color">+15%</p>
                  <p className="text-sm text-muted-foreground">Croissance</p>
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
                  placeholder="Rechercher un rapport..." 
                  className="pl-10"
                />
              </div>
              <Button variant="outline">
                <Filter className="mr-2 w-4 h-4" />
                Filtres
              </Button>
              <Button variant="outline">
                <Calendar className="mr-2 w-4 h-4" />
                Période
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Reports List */}
        <div className="grid gap-6">
          {reports.map((report) => (
            <Card key={report.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <CardTitle className="text-lg">{report.title}</CardTitle>
                      {getStatusBadge(report.status)}
                      {getTypeBadge(report.type)}
                    </div>
                    <CardDescription className="text-sm">
                      Projet: {report.project} • Créé par {report.author}
                    </CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Download className="w-4 h-4" />
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
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span>{new Date(report.date).toLocaleDateString('fr-FR')}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FileText className="w-4 h-4 text-muted-foreground" />
                    <span>{report.format} • {report.size}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Download className="w-4 h-4 text-muted-foreground" />
                    <span>{report.downloads} téléchargements</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <BarChart3 className="w-4 h-4 text-muted-foreground" />
                    <span>Généré automatiquement</span>
                  </div>
                </div>
                
                {report.status === "termine" && (
                  <div className="mt-4 pt-4 border-t border-border">
                    <Button size="sm" className="mr-2">
                      <Download className="mr-2 w-4 h-4" />
                      Télécharger
                    </Button>
                    <Button variant="outline" size="sm">
                      Partager
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Reports;