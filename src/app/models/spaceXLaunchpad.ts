export interface Images {
  large: string[];
}

export interface SpaceXLounchpad {
  images: Images;
  name: string;
  full_name: string;
  locality: string;
  region: string;
  latitude: number;
  longitude: number;
  launch_attempts: number;
  launch_successes: number;
  rockets: string[];
  timezone: string;
  launches: any[];
  status: string;
  details: string;
  id: string;
}
