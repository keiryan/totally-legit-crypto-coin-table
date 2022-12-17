import axios from "axios";
import { useEffect, useState } from "react";
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
  NameAndIcon,
  SupplementaryLetters,
  FilterCaret,
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

function NameAndCaret({ handleSort, children, identity }) {
  return (
    <NameAndIcon id={identity} onClick={handleSort}>
      {children}
    </NameAndIcon>
  );
}

const CoinTable = ({ parentSetLoading }) => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);

  const getCoins = async (passedParams) => {
    const defaultParams = {
      vs_currency: "usd",
      order: "market_cap_desc",
      per_page: 50,
      page: 1,
      sparkline: true,
      price_change_percentage: "1h%2C24h%2C7d",
      ...passedParams,
    };
    const response = await axios(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${defaultParams.vs_currency}&order=${defaultParams.order}&per_page=${defaultParams.per_page}&page=${defaultParams.page}&sparkline=true&price_change_percentage=${defaultParams.price_change_percentage}`
    );
    setCoins([...response.data]);
    parentSetLoading(false);
    setLoading(false);
  };

  const handleSort = (params) => {
    setLoading(true);
    parentSetLoading(true);
    getCoins(params);
  };

  useEffect(() => {
    setTimeout(() => {
      getCoins();
    }, 2000);
  }, []);

  return loading ? (
    <LoadingBalls />
  ) : (
    <Table>
      <Thead>
        <TableRow top>
          <TableHead coinName>
            <NameAndIcon
              id="name"
              onClick={() => handleSort({ order: "market_cap_desc" })}
            >
              <RowNumber style={{ fontSize: "18px" }}>
                <Line />
              </RowNumber>
              Name <FilterCaret />
            </NameAndIcon>
          </TableHead>
          <TableHead>
            <NameAndCaret
              handleSort={() => handleSort({ order: "market_cap_asc" })}
              identity="price"
            >
              Price
            </NameAndCaret>
          </TableHead>
          <TableHead>
            <NameAndCaret handleSort={handleSort} identity="1h">
              1h
            </NameAndCaret>
          </TableHead>

          <TableHead>
            <NameAndCaret handleSort={handleSort} identity="24h">
              24h
            </NameAndCaret>
          </TableHead>
          <TableHead>
            <NameAndCaret handleSort={handleSort} identity="7d">
              7d
            </NameAndCaret>
          </TableHead>
          <TableHead>
            24h Vol / M<SupplementaryLetters>ar</SupplementaryLetters>k
            <SupplementaryLetters>e</SupplementaryLetters>t Cap{" "}
          </TableHead>
          <TableHead>
            Circ<SupplementaryLetters>ulating</SupplementaryLetters> / Total Sup
            <SupplementaryLetters>ply</SupplementaryLetters>{" "}
          </TableHead>
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
              <ProgressBar
                max={item.market_cap}
                progress={item.total_volume}
           
              />
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
  const [loading, setLoading] = useState(true);
  return (
    <ThemeProvider theme={theme}>
      <Container style={{ alignItems: loading ? "center" : "flex-start" }}>
        <CoinTable parentSetLoading={setLoading} />
      </Container>
    </ThemeProvider>
  );
}
