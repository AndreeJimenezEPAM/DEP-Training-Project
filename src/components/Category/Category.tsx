import React, { useState, useEffect, useRef, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import { Draggable, Droppable } from "react-beautiful-dnd";

import Card, { NewCard } from "../Card/Card";
import useClickOutside from "../../hooks/useClickOutside";
import AddIcon from "../../assets/icons/AddIcon";
import { useDashboard } from "../../context/DashboardContext";
import CloseIcon from "../../assets/icons/CloseIcon";

import { CategoryProps, NewCategoryProps } from "../../interfaces/Category/category.interface";

import {
  Container,
  Header,
  CardList,
  Title,
  Button,
  Input,
  EditTitleButton,
  IconContainer,
  DeleteButton
} from "./styles";

export const NewCategory: React.FC<NewCategoryProps> = ({ onSuccess, onDismiss }) => {
  const [currentTitle, setCurrentTitle] = useState("");

  const ref = useRef<HTMLTextAreaElement>();

  useClickOutside(ref, () => {
    onDismiss();
  });

  useEffect(() => {
    if (ref.current) {
      ref.current.style.height = ref.current.scrollHeight + "px";
    }
  }, [currentTitle]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (currentTitle) {
        onSuccess(uuidv4(), currentTitle);
      }
    }
  };

  return (
    <Container>
      <Header>
        <Title>{currentTitle}</Title>
        <Input
          autoFocus
          isEditing
          placeholder="Category List Title"
          ref={ref as any}
          rows={1}
          value={currentTitle}
          onChange={({ target }) => setCurrentTitle(target.value)}
          onKeyDown={onKeyDown}
        />
      </Header>
    </Container>
  );
};

let cardListRef: HTMLDivElement | null = null;

const Category: React.FC<CategoryProps> = ({ id, title, cards, currentIndex }) => {
  const { updateCategory, deleteCategory, addCard } = useDashboard();
  const [currentTitle, setCurrentTitle] = useState(title);
  const [isEditing, setIsEditing] = useState(false);
  const [isAddingCard, setIsAddingCard] = useState(false);
  const ref = useRef<HTMLTextAreaElement>();

  const cardListRefCallback = useCallback((node: HTMLDivElement | null) => {
    if (node !== null) {
      cardListRef = node;
    }
  }, []);

  useClickOutside(ref, () => {
    if (isEditing) {
      setIsEditing(false);
    }
  });

  useEffect(() => {
    if (isEditing) {
      ref?.current?.focus?.();
      ref?.current?.select?.();
    } else {
      ref?.current?.blur?.();
    }
  }, [isEditing]);

  useEffect(() => {
    if (ref.current) {
      ref.current.style.height = ref.current.scrollHeight + "px";
    }
  }, [currentTitle]);

  useEffect(() => {
    if (cardListRef) {
      cardListRef.scrollTop = cardListRef.scrollHeight;
    }
  }, [isAddingCard]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setIsEditing(false);
      updateCategory(id, currentTitle);
    }
  };

  const onNewCardDissmiss = () => {
    setIsAddingCard(false);
  };

  const onNewCardSuccess = (cardId: string, title: string) => {
    addCard({ id: cardId, title }, id);
    setIsAddingCard(false);
  };

  return (
    <Draggable draggableId={id} index={currentIndex}>
      {(provided) => (
        <Container
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Header>
            <Title>{currentTitle}</Title>
            {!isEditing && (
              <>
                <EditTitleButton
                  onClick={() => {
                    setIsEditing(true);
                  }}
                />
              </>
            )}
            <Input
              isEditing={isEditing}
              ref={ref as any}
              rows={1}
              value={currentTitle}
              onChange={({ target }) => setCurrentTitle(target.value)}
              onKeyDown={onKeyDown}
            />
            <DeleteButton onClick={() => deleteCategory(id)}>
              <CloseIcon />
            </DeleteButton>
          </Header>
          <Droppable droppableId={id} type="card">
            {(provided) => (
              <CardList
                ref={(realRef) => {
                  provided.innerRef(realRef);
                  cardListRefCallback(realRef);
                }}
                {...provided.droppableProps}
              >
                {cards.map((card, index) => (
                  <Card
                    categoryId={id}
                    currentIndex={index}
                    key={card.id}
                    id={card.id}
                    title={card.title}
                  />
                ))}
                {isAddingCard && (
                  <NewCard
                    onSuccess={onNewCardSuccess}
                    onDismiss={onNewCardDissmiss}
                  />
                )}
                {provided.placeholder}
              </CardList>
            )}
          </Droppable>
          {!isAddingCard && (
            <Button onClick={() => setIsAddingCard(true)}>
              <IconContainer>
                <AddIcon />
              </IconContainer>
              <span>Add a Card...</span>
            </Button>
          )}
        </Container>
      )}
    </Draggable>
  );
};

export default Category;
