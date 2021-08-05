import React, { useMemo, useCallback, useContext } from "react";
import { Card, Category } from "../interfaces/types";
import { Context } from "../interfaces/context.interface"
import {
  updateCategoryById,
  addCardToCategory,
  updateCardById,
  deleteCategoryById,
  deleteCardById
} from "../utils/utilsList";
import useLocalStorage from "../hooks/useLocalStorage";

const DashboardContext = React.createContext<Context | undefined>(undefined);

const DashboardProvider: React.FC = ({ children }) => {
  const [categories, setCategories] = useLocalStorage<Category[]>("Dashboard", []);

  const addCategory = useCallback(
    (id: string, title: string) => {
      setCategories([...categories, { id, title, cards: [] }]);
    },
    [setCategories, categories]
  );

  const updateCategory = useCallback(
    (id: string, title: string) => {
      setCategories(updateCategoryById(categories, { id, title }));
    },
    [setCategories, categories]
  );

  const deleteCategory = useCallback(
    (id: string) => {
      setCategories(deleteCategoryById(categories, id));
    },
    [setCategories, categories]
  );

  const addCard = useCallback(
    (newCard: Card, categoryId: string) => {
      setCategories(addCardToCategory(categories, categoryId, newCard));
    },
    [setCategories, categories]
  );

  const updateCard = useCallback(
    (newCard: Card, categoryId: string) => {
      setCategories(updateCardById(categories, categoryId, newCard));
    },
    [setCategories, categories]
  );

  const deleteCard = useCallback(
    (categoryId: string, cardId: string) => {
      setCategories(deleteCardById(categories, categoryId, cardId));
    },
    [setCategories, categories]
  );

  const defaultValue = useMemo(
    () => ({
      categories,
      setCategories,
      addCategory,
      updateCategory,
      deleteCategory,
      addCard,
      updateCard,
      deleteCard
    }),
    [
      categories,
      setCategories,
      addCategory,
      updateCategory,
      deleteCategory,
      addCard,
      updateCard,
      deleteCard
    ]
  );
  return (
    <DashboardContext.Provider value={defaultValue}>
      {children}
    </DashboardContext.Provider>
  );
};

function useDashboard() {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error(`useDashboard must be used within a DashboardProvider`);
  }
  return context;
}

export { DashboardProvider, useDashboard };
