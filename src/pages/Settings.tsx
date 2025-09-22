import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Settings as SettingsIcon, 
  User, 
  Shield, 
  Bell, 
  Database,
  Users,
  Globe,
  Save
} from "lucide-react";

const Settings = () => {
  return (
    <Layout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-heading-color">Paramètres</h1>
            <p className="text-muted-foreground mt-1">
              Configuration et préférences du système RAMP-BENIN
            </p>
          </div>
          <Button className="bg-gradient-primary">
            <Save className="mr-2 w-4 h-4" />
            Sauvegarder
          </Button>
        </div>

        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="general">Général</TabsTrigger>
            <TabsTrigger value="profile">Profil</TabsTrigger>
            <TabsTrigger value="security">Sécurité</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="users">Utilisateurs</TabsTrigger>
            <TabsTrigger value="system">Système</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Globe className="w-5 h-5" />
                  <span>Paramètres généraux</span>
                </CardTitle>
                <CardDescription>
                  Configuration de base de l'application
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="org-name">Nom de l'organisation</Label>
                    <Input id="org-name" defaultValue="RAMP-BENIN" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="org-email">Email principal</Label>
                    <Input id="org-email" defaultValue="contact@ramp-benin.org" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="org-phone">Téléphone</Label>
                    <Input id="org-phone" defaultValue="+229 21 xx xx xx" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="org-address">Adresse</Label>
                    <Input id="org-address" defaultValue="Cotonou, Bénin" />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Mode maintenance</Label>
                      <p className="text-sm text-muted-foreground">
                        Désactiver temporairement l'accès au système
                      </p>
                    </div>
                    <Switch />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Sauvegarde automatique</Label>
                      <p className="text-sm text-muted-foreground">
                        Sauvegarde quotidienne des données
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="w-5 h-5" />
                  <span>Informations personnelles</span>
                </CardTitle>
                <CardDescription>
                  Gérez vos informations de profil
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="first-name">Prénom</Label>
                    <Input id="first-name" defaultValue="Admin" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last-name">Nom</Label>
                    <Input id="last-name" defaultValue="RAMP" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" defaultValue="admin@ramp-benin.org" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Téléphone</Label>
                    <Input id="phone" defaultValue="+229 97 xx xx xx" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="w-5 h-5" />
                  <span>Sécurité et accès</span>
                </CardTitle>
                <CardDescription>
                  Gérez la sécurité de votre compte
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Mot de passe actuel</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">Nouveau mot de passe</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirmer le mot de passe</Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Authentification à deux facteurs</Label>
                      <p className="text-sm text-muted-foreground">
                        Sécurité renforcée avec SMS ou application
                      </p>
                    </div>
                    <Badge className="bg-warning text-warning-foreground">Recommandé</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Sessions actives</Label>
                      <p className="text-sm text-muted-foreground">
                        Gérer les connexions actives
                      </p>
                    </div>
                    <Button variant="outline" size="sm">Voir les sessions</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bell className="w-5 h-5" />
                  <span>Préférences de notification</span>
                </CardTitle>
                <CardDescription>
                  Configurez vos notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Notifications email</Label>
                      <p className="text-sm text-muted-foreground">
                        Recevoir les alertes par email
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Notifications push</Label>
                      <p className="text-sm text-muted-foreground">
                        Notifications dans le navigateur
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Rapports hebdomadaires</Label>
                      <p className="text-sm text-muted-foreground">
                        Résumé des activités par email
                      </p>
                    </div>
                    <Switch />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Alertes projets</Label>
                      <p className="text-sm text-muted-foreground">
                        Notifications pour les échéances
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="w-5 h-5" />
                  <span>Gestion des utilisateurs</span>
                </CardTitle>
                <CardDescription>
                  Permissions et rôles des utilisateurs
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Enregistrement libre</Label>
                      <p className="text-sm text-muted-foreground">
                        Permettre l'auto-inscription
                      </p>
                    </div>
                    <Switch />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Validation manuelle</Label>
                      <p className="text-sm text-muted-foreground">
                        Valider les nouveaux comptes
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Sessions multiples</Label>
                      <p className="text-sm text-muted-foreground">
                        Autoriser plusieurs connexions
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="system" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Database className="w-5 h-5" />
                  <span>Configuration système</span>
                </CardTitle>
                <CardDescription>
                  Paramètres techniques et maintenance
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Version du système</Label>
                    <Input value="v1.0.0" disabled />
                  </div>
                  <div className="space-y-2">
                    <Label>Dernière sauvegarde</Label>
                    <Input value="15/03/2024 à 02:00" disabled />
                  </div>
                  <div className="space-y-2">
                    <Label>Espace de stockage</Label>
                    <Input value="2.1 GB / 10 GB utilisés" disabled />
                  </div>
                  <div className="space-y-2">
                    <Label>Utilisateurs actifs</Label>
                    <Input value="45 utilisateurs" disabled />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <Button variant="outline" className="w-full">
                    <Database className="mr-2 w-4 h-4" />
                    Lancer une sauvegarde manuelle
                  </Button>
                  
                  <Button variant="outline" className="w-full">
                    Télécharger les logs système
                  </Button>
                  
                  <Button variant="destructive" className="w-full">
                    Réinitialiser les données de test
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Settings;