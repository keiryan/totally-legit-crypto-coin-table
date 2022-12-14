import styled from "styled-components";

export const Base = styled.div`
  display: flex;
`;

export const Container = styled(Base)`
  width: 100vw;
  height: 100vh;
  background-color: #000;
  justify-content: center;
  padding: 20px;
  overflow-y: auto;
  font-family: "Poppins", sans-serif;
`;

export const Table = styled.table`
  border-radius: 4px;
  color: #fff;
  width: 100%;
  min-width: 300px;
  max-width: 1350px;
  overflow: hidden;
  padding: 10px;
  font-size: 14px;
  border-collapse: collapse;
`;

export const Thead = styled.thead``;

export const TableHead = styled.th`
  padding: 16px 20px;
  background-color: #1c1c1c;
  text-align: left;
`;

export const CoinNameAndIcon = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  gap: 12px;
`;

export const TableBody = styled.tbody``;

export const RowNumber = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.primary};
  border: 1px solid ${(props) => props.theme.primary};
  min-width: 24px;
  min-height: 24px;
  font-size: calc(80%);
  font-weight: bold;
  border-radius: 2px;
  text-align: center;
  margin-right: 20px;
`;

export const TableRow = styled.tr`
  background-color: ${(props) =>
    props.rowColor % 2 === 0 ? "#161616" : "#1c1c1c"};
  transition: all 0.2s ease-in-out;
  :hover {
    cursor: pointer;
    background-color: ${(props) => !props.top && "#ffa81f41"};
  }
`;

export const TableData = styled.td`
  padding: 20px;
  display: ${(props) => (props.coinName ? "flex" : "table-cell")};
  align-items: center;
  gap: 12px;
`;

export const NameAndSymbol = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Symbol = styled.span`
  color: #919191;
  font-size: 12px;
`;

export const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #1c1c1c;
  width: 34px;
  height: 34px;
  overflow: hidden;
  padding: 4px;
  border-radius: 4px;
`;

export const StyledImage = styled.img`
  max-width: 100%;
`;

export const ChartContiner = styled.div`
  max-height: 40px;
  max-width: 100px;
`;

export function Line() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="8"
      height="1"
      fill="none"
      viewBox="0 0 8 1"
    >
      <rect width="8" height="1" fill="#FFBA49" rx="0.5"></rect>
    </svg>
  );
}
