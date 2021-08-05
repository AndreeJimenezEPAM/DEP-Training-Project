export interface Card {
  id: string;
  title: string;
}

export interface Category {
  id: string;
  title: string;
  cards: Card[];
}