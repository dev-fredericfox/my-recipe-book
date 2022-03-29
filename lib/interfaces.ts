export interface ModifiedFeed {
  posts: Post[];
}
export interface Post {
  author: Author;
  authorID: number;
  category: Category;
  categoryID: number;
  content: string;
  coverimg: string;
  createdAt: Date;
  id: number;
  published: boolean;
  title: string;
  updatedAt: Date;
  ingredients: Ingredients[]
}
export interface Author {
  name: string;
}

export interface Ingredients {
  amount: string,
  emoji: string,
  ingredient: string,
  unit: string
}

export interface Category {
  id: number;
  name: string;
  categoryEmoji: string;
  categoryimg: string | null;
  createdAt: number;
  updatedAt: number;
  posts: Post[];
}

