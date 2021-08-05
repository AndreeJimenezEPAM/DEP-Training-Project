import { Card, Category } from "./types";

export interface Context {
  categories: Category[];
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
  addCategory: (id: string, title: string) => void;
  updateCategory: (id: string, title: string) => void;
  deleteCategory: (id: string) => void;
  addCard: (newCard: Card, categoryId: string) => void;
  updateCard: (newCard: Card, categoryId: string) => void;
  deleteCard: (categoryId: string, cardId: string) => void;
}