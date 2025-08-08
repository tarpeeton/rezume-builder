export interface IUserProfileSchema {
  fullName: string;
  position: string;
  phone: string;
  email: string;
  photo: string | File;
  location: string;
  siteLink: string;
  socialLinks: {
    id: string;
    url: string;
    icon: string;
  }[];
  skills: {
    id: string;
    text: string;
  }[];
  languages: {
    id: string;
    text: string;
    level: string;

  }[];
  about: string;
  workExperience: {
    id: string;
    position: string;
    company: string;
    description: string;
    startDate: string;
    endDate: string;
  }[];
  education: {
    id: string;
    name: string;
    position: string;
    startDate: string;
    endDate: string;
  }[];
  sertificates: {
    id: string;
    name: string;
    description: string
  }[];
}
