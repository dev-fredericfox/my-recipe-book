export interface ModifiedFeed {
  feed: Feed[];
}
export interface Feed {
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
}
export interface Author {
  name: string;
}

export interface Category {
  name: string;
}
