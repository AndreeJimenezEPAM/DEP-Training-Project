import { Card as CardInterface } from "../types";

export interface CategoryProps {
  id: string;
  title: string;
  cards: CardInterface[];
  currentIndex: number;
}

export interface NewCategoryProps {
  onSuccess: (id: string, title: string) => void;
  onDismiss: () => void;
}
