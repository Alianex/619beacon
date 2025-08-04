
export interface Shelter {
  name: string;
  address: string;
  phone: string;
  services: string[];
  description: string;
  hours: string;
  latitude: number;
  longitude: number;
}

export interface MindfulnessTip {
  title: string;
  tip: string;
}

export interface VeteranProgram {
  name: string;
  description: string;
}

export interface VeteranServiceCategory {
  category: string;
  description: string;
  programs: VeteranProgram[];
}

export interface AnalyzedFeedback {
  category: 'Bug Report' | 'Feature Request' | 'Data Correction' | 'Compliment' | 'General';
  summary: string;
  priority: 'Low' | 'Medium' | 'High';
}

export interface TransportationProvider {
  providerName: string;
  description: string;
  contact: string;
  website: string;
  eligibility: string;
}

export interface GroundingSource {
  uri: string;
  title: string;
}
