export interface CardProps {
  id: string;
  categoryId: string;
  title: string;
  currentIndex: number;
}

export interface NewCardProps {
  onSuccess: (id: string, title: string) => void;
  onDismiss: () => void;
}
