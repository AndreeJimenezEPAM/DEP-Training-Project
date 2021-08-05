import { Card, Category } from "../interfaces/types";

export function updateCategoryById(
  categories: Category[],
  updatedCategory: Omit<Category, "cards">
) {
  return categories.map((category) =>
    category.id === updatedCategory.id
      ? { ...category, title: updatedCategory.title }
      : category
  );
}

export function addCardToCategory(
  categories: Category[],
  categoryId: string,
  newCard: Card
) {
  return categories.map((category) =>
    category.id === categoryId
      ? {
          ...category,
          cards: [...category.cards, newCard]
        }
      : category
  );
}

export function deleteCategoryById(categories: Category[], categoryId: string) {
  return categories.filter((category) => category.id !== categoryId);
}

export function updateCardById(
  categories: Category[],
  categoryId: string,
  newCard: Card
) {
  return categories.map((category) =>
    category.id === categoryId
      ? {
          ...category,
          cards: category.cards.map((card) =>
            card.id === newCard.id ? newCard : card
          )
        }
      : category
  );
}

export function deleteCardById(
  categories: Category[],
  categoryId: string,
  cardId: string
) {
  return categories.map((category) =>
    category.id === categoryId
      ? {
          ...category,
          cards: category.cards.filter((card) => card.id !== cardId)
        }
      : category
  );
}

export function reorderList<T>(
  list: T[],
  startIndex: number,
  endIndex: number
) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
}

export const switchCards = (
  categories: Category[],
  sourceCategoryIndex: number,
  sourceCardIndex: number,
  destinationCategoryIndex: number,
  destinationCardIndex: number
) => {
  const card = { ...categories[sourceCategoryIndex].cards[sourceCardIndex] };

  if (sourceCategoryIndex === destinationCategoryIndex) {
    return categories.map((category, index) =>
      index === sourceCategoryIndex
        ? {
            ...category,
            cards: reorderList<Card>(
              category.cards,
              sourceCardIndex,
              destinationCardIndex
            )
          }
        : category
    );
  }

  return categories.map((category, index) => {
    if (index === sourceCategoryIndex) {
      return {
        ...category,
        cards: category.cards.filter(
          (_, cardIndex) => cardIndex !== sourceCardIndex
        )
      };
    }
    if (index === destinationCategoryIndex) {
      const temp = [...category.cards];
      temp.splice(destinationCardIndex, 0, card);

      return {
        ...category,
        cards: temp
      };
    }
    return category;
  });
};
