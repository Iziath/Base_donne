
import { useState, useEffect } from "react";
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
  Trash2,
  Loader2,
  AlertCircle,
  Download
} from "lucide-react";
import { partnerService, Partner } from "@/services/partnerservice";

// Types pour l'interface
interface PartnerStats {
  total: number;
  actifs: number;
  nouveaux: number;
  internationaux: number;
  enNegociation: number;
}

const Partners = () => {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [filteredPartners, setFilteredPartners] = useState<Partner[]>([]);
  const [stats, setStats] = useState<PartnerStats>({
    total: 0,
    actifs: 0,
    nouveaux: 0,
    internationaux: 0,
    enNegociation: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");

  // Charger les partenaires
  useEffect(() => {
    fetchPartners();
  }, []);

  // Filtrer les partenaires quand les critères changent
  useEffect(() => {
    filterPartners();
  }, [partners, searchTerm, statusFilter, typeFilter]);

  const fetchPartners = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Tentative de chargement depuis l\'API...');
      
      // Utiliser le service partenaire pour récupérer les données
      const response = await partnerService.getAll();
      console.log('Réponse API partenaires:', response);
      
      // Extraire le tableau des partenaires de la réponse
      const allPartners = response.partners || [];
      
      if (allPartners.length > 0) {
        console.log('Partenaires chargés depuis l\'API:', allPartners.length);
        setPartners(allPartners);
        calculateStats(allPartners);
      } else {
        // Si pas de données mais pas d'erreur, afficher état vide
        console.log('Aucun partenaire trouvé dans la base de données');
        setPartners([]);
        calculateStats([]);
      }
      
    } catch (err: unknown) {
      console.error("Erreur lors du chargement des partenaires:", err);
      
      const errorMessage = err instanceof Error 
        ? `Erreur: ${err.message}`
        : "Impossible de charger les partenaires depuis le serveur";
      
      setError(errorMessage);
      setPartners([]);
      calculateStats([]);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (partnersData: Partner[]) => {
    const currentYear = new Date().getFullYear();
    
    const newStats: PartnerStats = {
      total: partnersData.length,
      actifs: partnersData.filter(p => p.statut === 'actif').length,
      nouveaux: partnersData.filter(p => {
        try {
          return new Date(p.dateDebut).getFullYear() === currentYear;
        } catch {
          return false;
        }
      }).length,
      internationaux: partnersData.filter(p => p.type === 'international').length,
      enNegociation: partnersData.filter(p => p.statut === 'en_negociation').length
    };

    setStats(newStats);
  };

  const filterPartners = () => {
    let filtered = partners;

    // Filtre par recherche
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      
      filtered = filtered.filter(partner =>
        (partner.nom ?? '').toLowerCase().includes(searchLower) ||
        (partner.categorie ?? '').toLowerCase().includes(searchLower) ||
        (partner.partenariat ?? '').toLowerCase().includes(searchLower) ||
        (partner.description ?? '').toLowerCase().includes(searchLower) ||
        (partner.adresse?.ville ?? '').toLowerCase().includes(searchLower) ||
        (partner.email ?? '').toLowerCase().includes(searchLower)
      );
    }

    // Filtre par statut
    if (statusFilter !== "all") {
      filtered = filtered.filter(partner => partner.statut === statusFilter);
    }

    // Filtre par type - adaptation pour votre modèle
    if (typeFilter !== "all") {
      // Mapping entre les types de votre frontend et ceux de votre modèle
      const typeMapping: { [key: string]: string } = {
        'national': 'gouvernemental', // ou autre mapping selon votre besoin
        'international': 'international',
        'local': 'prive' // ou autre mapping
      };
      
      const mappedType = typeMapping[typeFilter] || typeFilter;
      filtered = filtered.filter(partner => partner.type === mappedType);
    }

    setFilteredPartners(filtered);
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      actif: { variant: "default" as const, label: "Actif" },
      inactif: { variant: "secondary" as const, label: "Inactif" },
      en_negociation: { variant: "outline" as const, label: "En négociation" },
      suspendu: { variant: "destructive" as const, label: "Suspendu" }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || { variant: "secondary" as const, label: status };
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const getTypeBadge = (type: string) => {
    const typeConfig = {
      international: { variant: "default" as const, label: "International" },
      gouvernemental: { variant: "secondary" as const, label: "Gouvernemental" },
      prive: { variant: "outline" as const, label: "Privé" },
      ong: { variant: "secondary" as const, label: "ONG" },
      autre: { variant: "outline" as const, label: "Autre" }
    };
    
    const config = typeConfig[type as keyof typeof typeConfig] || { variant: "secondary" as const, label: type };
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const handleNewPartner = () => {
    // Ouvrir un modal ou naviguer vers le formulaire de création
    alert("Fonctionnalité de création de partenaire - À implémenter avec le formulaire");
  };

  const handleViewPartner = (partnerId: string) => {
    // Naviguer vers la page de détail du partenaire
    console.log('Voir le partenaire:', partnerId);
    alert(`Voir les détails du partenaire ${partnerId}`);
  };

  const handleEditPartner = (partnerId: string) => {
    // Ouvrir le formulaire d'édition
    console.log('Éditer le partenaire:', partnerId);
    alert(`Éditer le partenaire ${partnerId}`);
  };

  const handleRetry = () => {
    fetchPartners();
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('fr-FR');
    } catch {
      return 'Date invalide';
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
            <p className="mt-2 text-muted-foreground">Chargement des partenaires...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="space-y-6">
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-heading-color">Gestion des Partenaires</h1>
              <p className="text-muted-foreground mt-1">
                Organisations partenaires et collaborateurs RAMP-BENIN
              </p>
            </div>
            <Button className="bg-gradient-primary" onClick={handleNewPartner}>
              <Plus className="mr-2 w-4 h-4" />
              Nouveau partenaire
            </Button>
          </div>

          {/* Message d'erreur */}
          <Card className="border-destructive">
            <CardContent className="p-6">
              <div className="text-center">
                <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-heading-color mb-2">
                  Erreur de chargement
                </h3>
                <p className="text-muted-foreground mb-4">
                  {error}
                </p>
                <div className="space-y-3 text-left bg-muted p-4 rounded-lg">
                  <p className="text-sm font-medium">Vérifiez que :</p>
                  <ol className="text-sm text-muted-foreground list-decimal list-inside space-y-1">
                    <li>Le serveur backend est démarré</li>
                    <li>La base de données MongoDB est accessible</li>
                    <li>L'endpoint /api/partners fonctionne correctement</li>
                  </ol>
                </div>
                <Button onClick={handleRetry} className="mt-4">
                  Réessayer
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-heading-color">Gestion des Partenaires</h1>
            <p className="text-muted-foreground mt-1">
              Organisations partenaires et collaborateurs RAMP-BENIN
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <Download className="mr-2 w-4 h-4" />
              Exporter
            </Button>
            <Button className="bg-gradient-primary" onClick={handleNewPartner}>
              <Plus className="mr-2 w-4 h-4" />
              Nouveau partenaire
            </Button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total</p>
                  <p className="text-2xl font-bold text-heading-color">{stats.total}</p>
                </div>
                <div className="p-3 bg-primary/10 rounded-full">
                  <Handshake className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Actifs</p>
                  <p className="text-2xl font-bold text-heading-color">{stats.actifs}</p>
                </div>
                <div className="p-3 bg-green-100 rounded-full">
                  <Building2 className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Nouveaux</p>
                  <p className="text-2xl font-bold text-heading-color">{stats.nouveaux}</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-full">
                  <Plus className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Internationaux</p>
                  <p className="text-2xl font-bold text-heading-color">{stats.internationaux}</p>
                </div>
                <div className="p-3 bg-purple-100 rounded-full">
                  <Globe className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">En négociation</p>
                  <p className="text-2xl font-bold text-heading-color">{stats.enNegociation}</p>
                </div>
                <div className="p-3 bg-orange-100 rounded-full">
                  <Filter className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search Input */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher un partenaire par nom, catégorie, ville..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Filters */}
              <div className="flex gap-3">
                <select 
                  className="px-3 py-2 border rounded-md text-sm"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">Tous les statuts</option>
                  <option value="actif">Actif</option>
                  <option value="inactif">Inactif</option>
                  <option value="en_negociation">En négociation</option>
                  <option value="suspendu">Suspendu</option>
                </select>

                <select 
                  className="px-3 py-2 border rounded-md text-sm"
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                >
                  <option value="all">Tous les types</option>
                  <option value="international">International</option>
                  <option value="gouvernemental">Gouvernemental</option>
                  <option value="prive">Privé</option>
                  <option value="ong">ONG</option>
                  <option value="autre">Autre</option>
                </select>

                <Button variant="outline" onClick={() => {
                  setSearchTerm("");
                  setStatusFilter("all");
                  setTypeFilter("all");
                }}>
                  <Filter className="mr-2 w-4 h-4" />
                  Réinitialiser
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Partners Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredPartners.map((partner) => (
            <Card key={partner.id} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Building2 className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg text-heading-color line-clamp-1">
                        {partner.nom}
                      </CardTitle>
                      <CardDescription className="flex items-center gap-2 mt-1">
                        {partner.categorie}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleViewPartner(partner.id)}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleEditPartner(partner.id)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Status and Type */}
                <div className="flex gap-2 flex-wrap">
                  {getStatusBadge(partner.statut)}
                  {getTypeBadge(partner.type)}
                </div>

                {/* Description */}
                {partner.description && (
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {partner.description}
                  </p>
                )}

                {/* Contact Info */}
                <div className="space-y-2">
                  {partner.email && (
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground truncate">{partner.email}</span>
                    </div>
                  )}
                  
                  {partner.telephone && (
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">{partner.telephone}</span>
                    </div>
                  )}
                  
                  {partner.website && (
                    <div className="flex items-center gap-2 text-sm">
                      <Globe className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground truncate">{partner.website}</span>
                    </div>
                  )}
                  
                  {partner.adresse?.ville && (
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">{partner.adresse.ville}</span>
                    </div>
                  )}
                </div>

                {/* Partnership Details */}
                <div className="pt-4 border-t">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Début de partenariat:</span>
                    <span className="font-medium">
                      {formatDate(partner.dateDebut)}
                    </span>
                  </div>
                  {partner.contacts && partner.contacts.length > 0 && (
                    <div className="flex justify-between items-center text-sm mt-1">
                      <span className="text-muted-foreground">Contacts:</span>
                      <span className="font-medium">
                        {partner.contacts.length}
                      </span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredPartners.length === 0 && partners.length === 0 && !loading && (
          <Card>
            <CardContent className="p-12 text-center">
              <Building2 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-heading-color mb-2">
                Aucun partenaire enregistré
              </h3>
              <p className="text-muted-foreground mb-4">
                Commencez par ajouter votre premier partenaire à la base de données.
              </p>
              <Button onClick={handleNewPartner}>
                <Plus className="mr-2 w-4 h-4" />
                Ajouter un partenaire
              </Button>
            </CardContent>
          </Card>
        )}

        {filteredPartners.length === 0 && partners.length > 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-heading-color mb-2">
                Aucun partenaire trouvé
              </h3>
              <p className="text-muted-foreground mb-4">
                Aucun partenaire ne correspond à vos critères de recherche.
              </p>
              <Button onClick={() => {
                setSearchTerm("");
                setStatusFilter("all");
                setTypeFilter("all");
              }}>
                Réinitialiser les filtres
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default Partners;