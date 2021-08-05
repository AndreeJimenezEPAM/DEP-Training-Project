import React, { useState, useRef, useEffect } from "react";
import { Draggable } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";
import { useDashboard } from "../../context/DashboardContext";

import CloseIcon from "../../assets/icons/CloseIcon";
import useClickOutside from "../../hooks/useClickOutside";
import {
  Container,
  Title,
  Input,
  EditTitleButton,
  DeleteButton,
} from "./styles";

import { CardProps, NewCardProps } from "../../interfaces/Card/card.interface";

export const NewCard: React.FC<NewCardProps> = ({ onSuccess, onDismiss }) => {
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
      <Input
        autoFocus
        ref={ref as any}
        placeholder="Card title"
        rows={1}
        value={currentTitle}
        onChange={({ target }) => setCurrentTitle(target.value)}
        onKeyDown={onKeyDown}
      />
    </Container>
  );
};

const Card: React.FC<CardProps> = ({ title, id, categoryId, currentIndex }) => {
  const { updateCard, deleteCard } = useDashboard();
  const [currentTitle, setCurrentTitle] = useState(title);
  const [isEditing, setIsEditing] = useState(false);

  const ref = useRef<HTMLTextAreaElement>();

  useClickOutside(ref, () => {
    if (isEditing) {
      setIsEditing(false);
    }
  });

  useEffect(() => {
    if (isEditing) {
      ref?.current?.focus?.();
      ref?.current?.select?.();
    }
  }, [isEditing]);

  useEffect(() => {
    if (ref.current) {
      ref.current.style.height = ref.current.scrollHeight + "px";
    }
  }, [currentTitle]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (currentTitle) {
        setIsEditing(false);
        updateCard({ id, title: currentTitle }, categoryId);
      }
    }
  };

  return (
    <Draggable draggableId={id} index={currentIndex}>
      {(provided) => (
        <Container
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {!isEditing && (
            <>
              <EditTitleButton
                onClick={() => {
                  setIsEditing(true);
                }}
              />
              <Title>{title}</Title>
            </>
          )}
          {isEditing && (
            <Input
              ref={ref as any}
              rows={1}
              value={currentTitle}
              onChange={({ target }) => setCurrentTitle(target.value)}
              onKeyDown={onKeyDown}
            />
          )}
          <DeleteButton
            onClick={() => {
              deleteCard(categoryId, id);
            }}
          >
            <CloseIcon />
          </DeleteButton>
        </Container>
      )}
    </Draggable>
  );
};

export default Card;
