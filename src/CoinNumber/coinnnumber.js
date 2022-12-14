import { Number, Up, Down } from "./styles.coinnumber";

export default function CoinNumber({ number }) {
  return (
    <Number title={number} number={number}>
      {number.toFixed(2)}%
      {number > 0 ? <Up /> : <Down />}
    </Number>
  );
}
