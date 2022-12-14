import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { ThemeProvider } from "styled-components";
import "./App.css";
import {
  Container,
  Table,
  TableHead,
  Thead,
  TableBody,
  TableRow,
  TableData,
  RowNumber,
  ImageContainer,
  StyledImage,
  NameAndSymbol,
  Symbol,
  Line,
  ChartContiner,
  CoinNameAndIcon,
} from "./styles.app.js";
import CoinNumber from "./CoinNumber/coinnnumber.js";
import ProgressBar from "./Progress Bar/progress.js";
import LoadingBalls from "./Loading Balls/loadingballs.js";
import SmartChart from "./Chart/chart.js";
import ChartReducer from "./utils/chartreducer";

export const theme = {
  primary: "#FFBA49",
};

const fiatSymbol = "$";

const CoinTable = ({ coins }) => {
  const [expanded, setExpanded] = useState({ expanded: false });

  const handleClick = () => {
    setExpanded({ expanded: !expanded.expanded });
  };

  const reference = useRef();

  return (
    <Table ref={reference} expanded={expanded}>
      <Thead>
        <TableRow top>
          <TableHead coinName>
            <CoinNameAndIcon>
              <RowNumber onClick={handleClick} style={{ fontSize: "18px" }}>
                <Line />
              </RowNumber>
              Name
            </CoinNameAndIcon>
          </TableHead>
          <TableHead>Price</TableHead>
          <TableHead>1h</TableHead>
          <TableHead>24h</TableHead>
          <TableHead>7d</TableHead>
          <TableHead>24h Vol / Market Cap </TableHead>
          <TableHead>Circulating / Total Sup </TableHead>
          <TableHead>last 7 days</TableHead>
        </TableRow>
      </Thead>
      <TableBody>
        {coins.map((item, index) => (
          <TableRow rowColor={index} key={item.id}>
            <TableData coinName>
              <RowNumber rowNumber={index + 1}>{index + 1}</RowNumber>
              <ImageContainer>
                <StyledImage src={item.image} alt={item.name} />
              </ImageContainer>
              <NameAndSymbol>
                {item.name}
                <Symbol>{item.symbol.toUpperCase()}</Symbol>
              </NameAndSymbol>
            </TableData>
            <TableData>
              {fiatSymbol}
              {item.current_price}
            </TableData>
            <TableData>
              <CoinNumber
                number={item.price_change_percentage_1h_in_currency}
              />
            </TableData>
            <TableData>
              <CoinNumber
                number={item.price_change_percentage_24h_in_currency}
              />
            </TableData>
            <TableData>
              <CoinNumber
                number={item.price_change_percentage_7d_in_currency}
              />
            </TableData>
            <TableData>
              <ProgressBar max={item.market_cap} progress={item.total_volume} />
            </TableData>
            <TableData>
              {" "}
              <ProgressBar
                max={item.total_supply}
                progress={item.circulating_supply}
              />
            </TableData>
            <TableData>
              <ChartContiner>
                <SmartChart
                  chartType="SmallLine"
                  data={ChartReducer(item.sparkline_in_7d.price)}
                />
              </ChartContiner>
            </TableData>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default function App() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);

  const getCoins = async () => {
    const response = await axios(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d"
    );
    setCoins(response.data);
    setLoading(false);
  };

  useEffect(() => {
    setTimeout(() => {
      getCoins();
    }, 2000);
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <Container style={{ alignItems: loading ? "center" : "flex-start" }}>
        {loading ? <LoadingBalls /> : <CoinTable coins={coins} />}
      </Container>
    </ThemeProvider>
  );
}
