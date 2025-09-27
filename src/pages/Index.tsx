import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessageCircle, MapPin, Phone, Heart } from 'lucide-react';
import ChatInterface from '@/components/ChatInterface';
import ResourceMap from '@/components/ResourceMap';
import EmergencyContacts from '@/components/EmergencyContacts';
import heroImage from '@/assets/hero-community-support.jpg';

const Index = () => {
  const [activeTab, setActiveTab] = useState('chat');

  return (
    <div className="min-h-screen bg-gradient-calm">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-sm border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                <Heart className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold">SafeConnect</h1>
                <p className="text-sm text-muted-foreground">Community Support Assistant</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative h-48 bg-gradient-primary overflow-hidden">
        <img 
          src={heroImage} 
          alt="Community support and resources" 
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-primary/80" />
        <div className="absolute inset-0 flex items-center justify-center text-center text-white px-4">
          <div>
            <h2 className="text-2xl font-bold mb-2">You're Not Alone</h2>
            <p className="text-white/90 max-w-md">
              Find shelter, food, healthcare, and support services in your area. 
              We're here to help you connect with the resources you need.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="chat" className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              Chat Help
            </TabsTrigger>
            <TabsTrigger value="map" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Find Services
            </TabsTrigger>
            <TabsTrigger value="emergency" className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              Emergency
            </TabsTrigger>
          </TabsList>

          <Card className="min-h-[500px]">
            <TabsContent value="chat" className="h-full m-0">
              <ChatInterface />
            </TabsContent>
            
            <TabsContent value="map" className="h-full m-0 p-4">
              <ResourceMap />
            </TabsContent>
            
            <TabsContent value="emergency" className="h-full m-0 p-4">
              <EmergencyContacts />
            </TabsContent>
          </Card>
        </Tabs>
      </div>

      {/* Footer */}
      <footer className="bg-card border-t mt-8">
        <div className="container mx-auto px-4 py-6 text-center">
          <p className="text-sm text-muted-foreground">
            SafeConnect is here to help you find support and resources. 
            All services are confidential and judgment-free.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
