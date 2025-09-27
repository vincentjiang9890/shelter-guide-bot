import { MapPin, Home, Utensils, Heart, Phone, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Resource {
  id: string;
  name: string;
  type: 'shelter' | 'food' | 'healthcare' | 'services';
  address: string;
  phone?: string;
  hours: string;
  distance: string;
  available: boolean;
}

const mockResources: Resource[] = [
  {
    id: '1',
    name: 'Downtown Emergency Shelter',
    type: 'shelter',
    address: '123 Main St, Downtown',
    phone: '(555) 123-4567',
    hours: '24/7',
    distance: '0.3 mi',
    available: true,
  },
  {
    id: '2',
    name: 'Community Food Bank',
    type: 'food',
    address: '456 Oak Ave',
    phone: '(555) 234-5678',
    hours: 'Mon-Fri 9AM-5PM',
    distance: '0.5 mi',
    available: true,
  },
  {
    id: '3',
    name: 'Free Health Clinic',
    type: 'healthcare',
    address: '789 Pine St',
    phone: '(555) 345-6789',
    hours: 'Tue, Thu 8AM-4PM',
    distance: '0.7 mi',
    available: true,
  },
  {
    id: '4',
    name: 'Social Services Center',
    type: 'services',
    address: '321 Elm St',
    phone: '(555) 456-7890',
    hours: 'Mon-Fri 8AM-6PM',
    distance: '1.2 mi',
    available: true,
  },
];

const getResourceIcon = (type: Resource['type']) => {
  switch (type) {
    case 'shelter':
      return Home;
    case 'food':
      return Utensils;
    case 'healthcare':
      return Heart;
    case 'services':
      return Phone;
    default:
      return MapPin;
  }
};

const getResourceColor = (type: Resource['type']) => {
  switch (type) {
    case 'shelter':
      return 'urgent';
    case 'food':
      return 'support';
    case 'healthcare':
      return 'success';
    case 'services':
      return 'default';
    default:
      return 'default';
  }
};

const ResourceCard = ({ resource }: { resource: Resource }) => {
  const Icon = getResourceIcon(resource.type);
  const colorScheme = getResourceColor(resource.type);

  return (
    <Card className="mb-4 hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Icon className="h-5 w-5" />
            {resource.name}
          </CardTitle>
          {resource.available ? (
            <Badge variant="outline" className="bg-success/10 text-success border-success/20">
              Available
            </Badge>
          ) : (
            <Badge variant="outline" className="bg-muted">
              Full
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span>{resource.address}</span>
          <Badge variant="outline" className="ml-auto">{resource.distance}</Badge>
        </div>
        
        {resource.phone && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Phone className="h-4 w-4" />
            <span>{resource.phone}</span>
          </div>
        )}
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>{resource.hours}</span>
        </div>
        
        <div className="flex gap-2 pt-2">
          <Button size="sm" className="flex-1">
            Get Directions
          </Button>
          {resource.phone && (
            <Button size="sm" variant="outline">
              Call
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const ResourceMap = () => {
  return (
    <div className="h-full flex flex-col">
      {/* Map Placeholder */}
      <div className="h-64 bg-muted rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10" />
        <div className="text-center z-10">
          <MapPin className="h-12 w-12 text-primary mx-auto mb-2" />
          <p className="text-muted-foreground text-sm">
            Interactive map will show here
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Displaying resources within 2 miles
          </p>
        </div>
      </div>
      
      {/* Resource List */}
      <div className="flex-1 overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Nearby Resources</h3>
          <Badge variant="outline">{mockResources.length} locations</Badge>
        </div>
        
        {mockResources.map((resource) => (
          <ResourceCard key={resource.id} resource={resource} />
        ))}
      </div>
    </div>
  );
};

export default ResourceMap;