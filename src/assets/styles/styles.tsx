import styled from "styled-components";

export const Dashboard = styled.div`
  position: relative;
  flex: 1;
  box-sizing: border-box;
  display: flex;
  flex-wrap: nowrap;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 12px;
  margin-bottom: 12px;
  overflow: auto;

  ::-webkit-scrollbar {
    height: 10px;
  }

  ::-webkit-scrollbar-track {
    background: #0367a3;
    border-radius: 3px;
    margin: 12px;
  }

  ::-webkit-scrollbar-thumb {
    background: #72a4c7;
    border-radius: 3px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #72a4c7;
  }

  ::-webkit-scrollbar:vertical {
    display: none;
  }

  ::-webkit-scrollbar-corner {
    display: none;
  }
`;

export const Header = styled.header`
  height: 50px;
  width: 100%;
  background-color: #15131f;
  margin-bottom: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px;
  color: #fff;
  font-size: 26px;
`;

export const HeaderText = styled.header`
  margin-left: 10px;
`;

export const List = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: flex-start;
  height: 100%;
`;
