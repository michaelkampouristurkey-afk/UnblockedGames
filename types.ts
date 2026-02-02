
export type Category = 'Action' | 'Puzzle' | 'Arcade' | 'Sports' | 'Strategy' | 'Adventure' | 'All';

export interface Game {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  iframeUrl: string;
  category: Category;
  rating: number;
  plays: string;
}
