import styled from "styled-components";

export const Container = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #1A1A2B;
  color: #fff;
  width: 272px;
  max-width: 272px;
  min-width: 272px;
  border-radius: 3px;
  padding: 8px;
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
  margin-right: 12px;
  user-select: none;
  transition: all 85ms ease-in;
  cursor: pointer;

  &:hover,
  &:focus {
    outline: none;
    background-color: #272741;
  }
`;

export const IconContainer = styled.div`
  margin-right: 4px;
  opacity: 0.8;
  display: flex;
`;
