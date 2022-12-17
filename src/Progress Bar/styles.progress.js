import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const NumberContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const OuterBar = styled.div`
  height: 10px;
  max-width: 200px;
  overflow: hidden;
  background-color: #111;
  border-radius: 50px;
`;

export const InnerBar = styled.div`
  height: 100%;
  width: ${({ progress }) => progress}%;
  background-color: ${({ theme }) => theme.primary};
`;
