export interface Service {
  id: string;
  title: string;
  description: string;
  benefits: string[];
  iconName: string;
  price?: string;
}

export interface BeforeAfterProject {
  id: string;
  title: string;
  description: string;
  category: string;
  beforeUrl: string;
  afterUrl: string;
  servicesApplied: string[];
  presetFilter?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  description?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  imageUrl: string;
  expertise: string[];
  isCore: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  company: string;
  review: string;
  rating: number;
  avatarUrl?: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  company: string;
  email: string;
  whatsapp: string;
  projectType: string;
  message: string;
  files?: { name: string; data: string }[];
  date: string;
}

export interface SampleRequest {
  id: string;
  name: string;
  email: string;
  whatsapp: string;
  message: string;
  beforeUrl: string;
  date: string;
  status: string;
}

export interface WebsiteSettings {
  phone: string;
  email: string;
  facebook: string;
  instagram: string;
  behance: string;
  fiverr: string;
  address: string;
  businessHours: string;
  responseTime: string;
  metaTitle: string;
  metaDescription: string;
}
