import { Phone, MessageCircle, Heart, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
  description: string;
  type: 'crisis' | 'emergency' | 'support' | 'services';
  available: string;
}

const emergencyContacts: EmergencyContact[] = [
  {
    id: '1',
    name: 'Emergency Services',
    phone: '911',
    description: 'Police, Fire, Medical Emergency',
    type: 'emergency',
    available: '24/7',
  },
  {
    id: '2',
    name: 'Crisis Hotline',
    phone: '988',
    description: 'Suicide & Crisis Lifeline',
    type: 'crisis',
    available: '24/7',
  },
  {
    id: '3',
    name: 'Homeless Services Hotline',
    phone: '211',
    description: 'Connect to local resources and services',
    type: 'services',
    available: '24/7',
  },
  {
    id: '4',
    name: 'Domestic Violence Hotline',
    phone: '1-800-799-7233',
    description: 'National domestic violence support',
    type: 'support',
    available: '24/7',
  },
];

const getContactIcon = (type: EmergencyContact['type']) => {
  switch (type) {
    case 'emergency':
      return Shield;
    case 'crisis':
      return Heart;
    case 'support':
      return MessageCircle;
    case 'services':
      return Phone;
    default:
      return Phone;
  }
};

const getContactVariant = (type: EmergencyContact['type']) => {
  switch (type) {
    case 'emergency':
      return 'urgent' as const;
    case 'crisis':
      return 'support' as const;
    case 'support':
      return 'success' as const;
    case 'services':
      return 'default' as const;
    default:
      return 'default' as const;
  }
};

const ContactCard = ({ contact }: { contact: EmergencyContact }) => {
  const Icon = getContactIcon(contact.type);
  const variant = getContactVariant(contact.type);

  const handleCall = () => {
    window.open(`tel:${contact.phone}`, '_self');
  };

  return (
    <Card className="mb-4">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Icon className="h-5 w-5" />
          {contact.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground">{contact.description}</p>
        
        <div className="flex items-center justify-between">
          <div>
            <p className="font-mono text-lg font-semibold">{contact.phone}</p>
            <p className="text-xs text-muted-foreground">Available {contact.available}</p>
          </div>
          
          <Button variant={variant} onClick={handleCall} className="gap-2">
            <Phone className="h-4 w-4" />
            Call Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const EmergencyContacts = () => {
  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">Emergency Contacts</h2>
        <p className="text-muted-foreground">
          Get immediate help when you need it most
        </p>
      </div>
      
      {emergencyContacts.map((contact) => (
        <ContactCard key={contact.id} contact={contact} />
      ))}
      
      <Card className="bg-muted/50">
        <CardContent className="p-4">
          <p className="text-sm text-muted-foreground text-center">
            <strong>Remember:</strong> If you're in immediate danger, call 911. 
            All hotlines listed here are free and confidential.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmergencyContacts;