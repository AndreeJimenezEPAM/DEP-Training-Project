import React from "react";
import { Container, IconContainer } from "./styles";
import AddIcon from "../../assets/icons/AddIcon";
import { Props } from "../../interfaces/CategoryButton/categoryButton.interface";

const AddCategoryButton: React.FC<Props> = ({ onClick, isFirst }) => {
  return (
    <Container onClick={onClick}>
      <IconContainer>
        <AddIcon />
      </IconContainer>
      <span>{isFirst ? "Add a list..." : "Add another list..."}</span>
    </Container>
  );
};

export default AddCategoryButton;