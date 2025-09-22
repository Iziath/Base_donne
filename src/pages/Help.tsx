import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  HelpCircle, 
  Book, 
  Video, 
  MessageCircle, 
  Phone,
  Mail,
  Download,
  ExternalLink
} from "lucide-react";

const Help = () => {
  const helpCategories = [
    {
      title: "Guide de démarrage",
      description: "Premiers pas avec RAMP-BENIN",
      icon: Book,
      articles: 8,
      color: "bg-primary"
    },
    {
      title: "Gestion des projets",
      description: "Créer et suivre vos projets",
      icon: HelpCircle,
      articles: 12,
      color: "bg-secondary"
    },
    {
      title: "Rapports et analytics",
      description: "Générer des rapports efficaces",
      icon: Book,
      articles: 6,
      color: "bg-info"
    },
    {
      title: "Administration",
      description: "Paramètres et configuration",
      icon: Book,
      articles: 9,
      color: "bg-success"
    }
  ];

  const quickHelp = [
    {
      question: "Comment créer un nouveau projet ?",
      answer: "Accédez à la section Projets et cliquez sur 'Nouveau projet'. Remplissez les informations requises.",
      category: "Projets"
    },
    {
      question: "Comment inviter de nouveaux membres ?",
      answer: "Dans Équipe, cliquez sur 'Nouveau membre' et envoyez une invitation par email.",
      category: "Équipe"
    },
    {
      question: "Comment générer un rapport ?",
      answer: "Allez dans Rapports, sélectionnez le type et la période, puis cliquez sur 'Générer'.",
      category: "Rapports"
    },
    {
      question: "Comment modifier mes notifications ?",
      answer: "Rendez-vous dans Paramètres > Notifications pour personnaliser vos préférences.",
      category: "Paramètres"
    }
  ];

  return (
    <Layout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-heading-color">Centre d'aide</h1>
            <p className="text-muted-foreground mt-1">
              Documentation, tutoriels et support RAMP-BENIN
            </p>
          </div>
          <Button className="bg-gradient-primary">
            <MessageCircle className="mr-2 w-4 h-4" />
            Contacter le support
          </Button>
        </div>

        {/* Search */}
        <Card>
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input 
                placeholder="Rechercher dans l'aide..." 
                className="pl-10 text-lg py-6"
              />
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="p-6 text-center">
              <Video className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Tutoriels vidéo</h3>
              <p className="text-sm text-muted-foreground">
                Apprenez avec nos vidéos explicatives
              </p>
            </CardContent>
          </Card>
          
          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="p-6 text-center">
              <Download className="w-12 h-12 text-secondary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Manuel utilisateur</h3>
              <p className="text-sm text-muted-foreground">
                Téléchargez le guide complet PDF
              </p>
            </CardContent>
          </Card>
          
          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="p-6 text-center">
              <MessageCircle className="w-12 h-12 text-info mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Chat en direct</h3>
              <p className="text-sm text-muted-foreground">
                Assistance immédiate en ligne
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Help Categories */}
        <div>
          <h2 className="text-2xl font-bold text-heading-color mb-6">Catégories d'aide</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {helpCategories.map((category, index) => (
              <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 ${category.color} rounded-lg flex items-center justify-center`}>
                      <category.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{category.title}</CardTitle>
                      <CardDescription>{category.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary">{category.articles} articles</Badge>
                    <ExternalLink className="w-4 h-4 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Help / FAQ */}
        <div>
          <h2 className="text-2xl font-bold text-heading-color mb-6">Questions fréquentes</h2>
          <div className="space-y-4">
            {quickHelp.map((item, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-semibold text-heading-color">{item.question}</h3>
                        <Badge variant="outline">{item.category}</Badge>
                      </div>
                      <p className="text-muted-foreground">{item.answer}</p>
                    </div>
                    <HelpCircle className="w-5 h-5 text-muted-foreground mt-1" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Contact Support */}
        <Card>
          <CardHeader>
            <CardTitle>Besoin d'aide supplémentaire ?</CardTitle>
            <CardDescription>
              Notre équipe support est là pour vous aider
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-sm text-muted-foreground">support@ramp-benin.org</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-secondary" />
                <div>
                  <p className="font-medium">Téléphone</p>
                  <p className="text-sm text-muted-foreground">+229 21 xx xx xx</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <MessageCircle className="w-5 h-5 text-info" />
                <div>
                  <p className="font-medium">Chat</p>
                  <p className="text-sm text-muted-foreground">Lun-Ven 8h-17h</p>
                </div>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-border">
              <div className="flex items-center space-x-4">
                <Button>
                  <MessageCircle className="mr-2 w-4 h-4" />
                  Ouvrir un ticket
                </Button>
                <Button variant="outline">
                  <Download className="mr-2 w-4 h-4" />
                  Télécharger le manuel
                </Button>
                <Button variant="outline">
                  <Video className="mr-2 w-4 h-4" />
                  Voir les tutoriels
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Help;