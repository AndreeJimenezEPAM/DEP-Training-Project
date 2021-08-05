import React, { useState } from "react";
import {
  DragDropContext,
  DropResult,
  Droppable,
  DraggableLocation
} from "react-beautiful-dnd";
import "./assets/styles/styles";

import { reorderList, switchCards } from "./utils/utilsList";

import Category, { NewCategory } from "./components/Category/Category";
import AddCategoryButton from "./components/AddCategoryButton/AddCategoryButton";
import { useDashboard } from "./context/DashboardContext";

import { Category as CategoryInterface } from "./interfaces/types";
import { Dashboard, Header, HeaderText, List } from "./assets/styles/styles";
import CodeIcon from "./assets/icons/CodeIcon";

const AddNewCategory: React.FC = () => {
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const { categories, addCategory } = useDashboard();

  const cancelCategoryAddition = () => {
    setIsAddingCategory(false);
  };

  const addNewCategory = (id: string, title: string) => {
    addCategory(id, title);
    setIsAddingCategory(false);
  };

  if (isAddingCategory) {
    return (
      <NewCategory onSuccess={addNewCategory} onDismiss={cancelCategoryAddition} />
    );
  }

  return (
    <AddCategoryButton
      isFirst={categories?.length === 0}
      onClick={() => setIsAddingCategory(true)}
    />
  );
};

export default function App() {
  const { categories, setCategories, deleteCategory, deleteCard } = useDashboard();

  const onCardDrag = (result: DropResult) => {
    const sourceCategoryIndex = categories.findIndex(
      (category) => category.id === result.source.droppableId
    );
    const sourceCardIndex = result.source.index;

    const destinationCategoryIndex = categories.findIndex(
      (category) => category.id === result.destination?.droppableId
    );
    const destinationCardIndex = (result.destination as DraggableLocation)
      .index;

    setCategories(() =>
      switchCards(
        categories,
        sourceCategoryIndex,
        sourceCardIndex,
        destinationCategoryIndex,
        destinationCardIndex
      )
    );
  };

  const onCategoryDrag = (result: DropResult) => {
    setCategories(
      reorderList<CategoryInterface>(
        categories,
        result.source.index,
        (result.destination as DraggableLocation).index
      )
    );
  };

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }

    if (destination.droppableId === "category-trash") {
      deleteCategory(draggableId);
      return;
    }

    if (destination.droppableId === "card-trash") {
      const cardId = draggableId;
      const categoryId = source.droppableId;
      deleteCard(categoryId, cardId);
      return;
    }

    if (type === "card") {
      onCardDrag(result);
      return;
    }

    if (type === "category") {
      onCategoryDrag(result);
      return;
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Header>
        <CodeIcon/>
        <HeaderText>DEP Training</HeaderText>
      </Header>
      <Dashboard>
        <Droppable droppableId="Dashboard" direction="horizontal" type="category">
          {(provided) => (
            <List ref={provided.innerRef} {...provided.droppableProps}>
              {categories.map((category, index) => (
                <Category
                  currentIndex={index}
                  key={category.id}
                  id={category.id}
                  title={category.title}
                  cards={category.cards}
                />
              ))}
              {provided.placeholder}
            </List>
          )}
        </Droppable>
        <div>
          <AddNewCategory />
        </div>
      </Dashboard>
    </DragDropContext>
  );
}
