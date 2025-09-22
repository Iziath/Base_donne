import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Filter, 
  Plus, 
  Upload, 
  FileText, 
  Image, 
  Download,
  FolderOpen,
  Eye,
  Edit,
  Trash2,
  Share
} from "lucide-react";

const Documents = () => {
  const documents = [
    {
      id: 1,
      name: "Contrat partenariat UNICEF.pdf",
      type: "pdf",
      category: "Contrats",
      project: "Santé Scolaire",
      author: "Marie Kouassi",
      date: "2024-03-15",
      size: "2.4 MB",
      downloads: 12,
      shared: true
    },
    {
      id: 2,
      name: "Photos formation agriculture.zip",
      type: "image",
      category: "Médias",
      project: "AgriTech 2024",
      author: "Pierre Akpovi",
      date: "2024-03-14",
      size: "15.8 MB",
      downloads: 5,
      shared: false
    },
    {
      id: 3,
      name: "Manuel procédures RAMP.docx",
      type: "document",
      category: "Procédures",
      project: "Administration",
      author: "Admin RAMP",
      date: "2024-03-10",
      size: "1.2 MB",
      downloads: 28,
      shared: true
    },
    {
      id: 4,
      name: "Budget prévisionnel 2024.xlsx",
      type: "spreadsheet",
      category: "Finance",
      project: "Tous projets",
      author: "Comptabilité",
      date: "2024-01-15",
      size: "892 KB",
      downloads: 15,
      shared: false
    },
    {
      id: 5,
      name: "Présentation projet santé.pptx",
      type: "presentation",
      category: "Présentations",
      project: "Santé pour Tous",
      author: "Dr. Jean Adjovi",
      date: "2024-02-28",
      size: "5.6 MB",
      downloads: 22,
      shared: true
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return <FileText className="w-5 h-5 text-red-500" />;
      case "image":
        return <Image className="w-5 h-5 text-blue-500" />;
      case "document":
        return <FileText className="w-5 h-5 text-blue-600" />;
      case "spreadsheet":
        return <FileText className="w-5 h-5 text-green-600" />;
      case "presentation":
        return <FileText className="w-5 h-5 text-orange-500" />;
      default:
        return <FileText className="w-5 h-5 text-gray-500" />;
    }
  };

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case "Contrats":
        return <Badge className="bg-primary text-primary-foreground">Contrats</Badge>;
      case "Médias":
        return <Badge className="bg-secondary text-secondary-foreground">Médias</Badge>;
      case "Procédures":
        return <Badge className="bg-info text-white">Procédures</Badge>;
      case "Finance":
        return <Badge className="bg-success text-success-foreground">Finance</Badge>;
      case "Présentations":
        return <Badge className="bg-warning text-warning-foreground">Présentations</Badge>;
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
            <h1 className="text-3xl font-bold text-heading-color">Gestion des Documents</h1>
            <p className="text-muted-foreground mt-1">
              Stockage et partage des documents RAMP-BENIN
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline">
              <Upload className="mr-2 w-4 h-4" />
              Téléverser
            </Button>
            <Button className="bg-gradient-primary">
              <Plus className="mr-2 w-4 h-4" />
              Nouveau dossier
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
                  <p className="text-2xl font-bold text-heading-color">156</p>
                  <p className="text-sm text-muted-foreground">Documents total</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <FolderOpen className="w-5 h-5 text-secondary" />
                <div>
                  <p className="text-2xl font-bold text-heading-color">24</p>
                  <p className="text-sm text-muted-foreground">Dossiers</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Share className="w-5 h-5 text-info" />
                <div>
                  <p className="text-2xl font-bold text-heading-color">89</p>
                  <p className="text-sm text-muted-foreground">Partagés</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Download className="w-5 h-5 text-success" />
                <div>
                  <p className="text-2xl font-bold text-heading-color">2.1 GB</p>
                  <p className="text-sm text-muted-foreground">Stockage utilisé</p>
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
                  placeholder="Rechercher un document..." 
                  className="pl-10"
                />
              </div>
              <Button variant="outline">
                <Filter className="mr-2 w-4 h-4" />
                Filtres
              </Button>
              <Button variant="outline">
                Type
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Documents List */}
        <div className="grid gap-4">
          {documents.map((document) => (
            <Card key={document.id}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 flex-1">
                    {getTypeIcon(document.type)}
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-1">
                        <h3 className="font-semibold text-heading-color">{document.name}</h3>
                        {getCategoryBadge(document.category)}
                        {document.shared && (
                          <Badge variant="outline" className="text-xs">
                            <Share className="w-3 h-3 mr-1" />
                            Partagé
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                        <span>Projet: {document.project}</span>
                        <span>Par {document.author}</span>
                        <span>{new Date(document.date).toLocaleDateString('fr-FR')}</span>
                        <span>{document.size}</span>
                        <span>{document.downloads} téléchargements</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Share className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-destructive">
                      <Trash2 className="w-4 h-4" />
                    </Button>
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

export default Documents;