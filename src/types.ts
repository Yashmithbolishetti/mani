export interface Appointment {
  id: string;
  fullName: string;
  mobileNumber: string;
  email: string;
  preferredDate: string;
  preferredTime: string;
  serviceRequired: string;
  beautyConcern: string;
  specialRequests: string;
  status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
  createdAt: string;
}

export interface GalleryItem {
  id: string;
  imageUrl: string;
  category: 'Interior' | 'Treatments' | 'Hair' | 'Makeup' | 'Bridal' | 'Customers';
  title: string;
  createdAt: string;
}

export interface BeforeAfterItem {
  id: string;
  beforeUrl: string;
  afterUrl: string;
  serviceName: string;
  description: string;
  createdAt: string;
}

export interface Testimonial {
  id: string;
  name: string;
  avatarUrl: string;
  rating: number;
  text: string;
  service: string;
  isVerified: boolean;
}

export interface PackageItem {
  id: string;
  name: string;
  price: string;
  duration: string;
  description: string;
  features: string[];
  benefits: string;
  isPopular?: boolean;
}
