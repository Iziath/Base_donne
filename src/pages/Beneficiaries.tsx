import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Plus, 
  Search, 
  Filter, 
  MapPin, 
  Phone, 
  Calendar,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  UserCheck
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const beneficiaries = [
  {
    id: 1,
    firstName: "Aminata",
    lastName: "Diallo",
    age: 34,
    gender: "Féminin",
    location: "Cotonou",
    phone: "+229 97 12 34 56",
    registrationDate: "15 Jan 2024",
    projects: ["AgriTech 2024", "Entrepreneuriat Féminin"],
    status: "Actif",
    category: "Agriculteur",
  },
  {
    id: 2,
    firstName: "Moussa",
    lastName: "Traoré",
    age: 28,
    gender: "Masculin",
    location: "Parakou",
    phone: "+229 96 87 65 43",
    registrationDate: "12 Jan 2024",
    projects: ["AgriTech 2024"],
    status: "Actif",
    category: "Jeune entrepreneur",
  },
  {
    id: 3,
    firstName: "Fatima",
    lastName: "Kone",
    age: 42,
    gender: "Féminin",
    location: "Porto-Novo",
    phone: "+229 95 23 45 67",
    registrationDate: "08 Jan 2024",
    projects: ["Santé pour Tous", "Éducation Communautaire"],
    status: "Actif",
    category: "Chef de communauté",
  },
  {
    id: 4,
    firstName: "Ibrahim",
    lastName: "Ouedraogo",
    age: 19,
    gender: "Masculin",
    location: "Natitingou",
    phone: "+229 94 78 90 12",
    registrationDate: "05 Jan 2024",
    projects: ["Éducation Communautaire"],
    status: "En formation",
    category: "Étudiant",
  },
  {
    id: 5,
    firstName: "Aïcha",
    lastName: "Sawadogo",
    age: 31,
    gender: "Féminin",
    location: "Bohicon",
    phone: "+229 93 56 78 90",
    registrationDate: "03 Jan 2024",
    projects: ["Entrepreneuriat Féminin"],
    status: "En attente",
    category: "Commerçante",
  },
];

const statusColors = {
  "Actif": "bg-success text-white",
  "En formation": "bg-info text-white",
  "En attente": "bg-warning text-white",
  "Inactif": "bg-muted text-muted-foreground",
};

const Beneficiaries = () => {
  return (
    <Layout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-heading-color">Gestion des Bénéficiaires</h1>
            <p className="text-muted-foreground mt-1">
              Base de données des bénéficiaires et suivi de leur participation
            </p>
          </div>
          <Button className="bg-gradient-primary">
            <Plus className="mr-2 w-4 h-4" />
            Nouveau bénéficiaire
          </Button>
        </div>

        {/* Filters and Search */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input 
                  placeholder="Rechercher un bénéficiaire..." 
                  className="pl-10"
                />
              </div>
              <Button variant="outline">
                <Filter className="mr-2 w-4 h-4" />
                Filtrer par statut
              </Button>
              <Button variant="outline">
                <UserCheck className="mr-2 w-4 h-4" />
                Exporter la liste
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Beneficiaries Table */}
        <Card>
          <CardHeader>
            <CardTitle>Liste des bénéficiaires</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Bénéficiaire</TableHead>
                  <TableHead>Informations</TableHead>
                  <TableHead>Projets</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {beneficiaries.map((beneficiary) => (
                  <TableRow key={beneficiary.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarFallback className="bg-primary text-primary-foreground">
                            {beneficiary.firstName[0]}{beneficiary.lastName[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">
                            {beneficiary.firstName} {beneficiary.lastName}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {beneficiary.category}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1 text-sm">
                        <div className="flex items-center space-x-1 text-muted-foreground">
                          <span>{beneficiary.age} ans • {beneficiary.gender}</span>
                        </div>
                        <div className="flex items-center space-x-1 text-muted-foreground">
                          <MapPin className="w-3 h-3" />
                          <span>{beneficiary.location}</span>
                        </div>
                        <div className="flex items-center space-x-1 text-muted-foreground">
                          <Phone className="w-3 h-3" />
                          <span>{beneficiary.phone}</span>
                        </div>
                        <div className="flex items-center space-x-1 text-muted-foreground">
                          <Calendar className="w-3 h-3" />
                          <span>Inscrit le {beneficiary.registrationDate}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        {beneficiary.projects.map((project, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {project}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={statusColors[beneficiary.status]}>
                        {beneficiary.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            Voir profil
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
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Beneficiaries;