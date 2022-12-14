import styled from "styled-components";
import { colors } from "../styles.app";

export const Container = styled.div``;

export const OuterBar = styled.div`
  height: 10px;
  max-width: 200px;
  overflow: hidden;
  background-color: #111;
  border-radius: 50px;
`;

export const InnerBar = styled.div`
  height: 100%;
  width: ${(props) => props.progress}%;
  background-color: ${props => props.theme.primary};
`;
