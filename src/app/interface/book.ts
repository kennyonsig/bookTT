export interface Book {
  id: string;
  title: string;
  author: string;
  year: number;
  genre: string;
  description: string;
  isbn?: string;
  pages?: number;
  language?: string;
  publisher?: string;
  coverImage?: string;
  rating?: number;
}
