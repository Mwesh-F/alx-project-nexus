export interface Contestant {
  id: string;
  name: string;
  bio: string;
  photoUrl: string;
  votes: number;
  rating?: number;
}