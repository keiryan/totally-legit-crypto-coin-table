import {
  Container,
  OuterBar,
  InnerBar,
  NumberContainer,
} from "./styles.progress";

const NumberFormatter = (n) => {
  if (n === null) return "N/A";
  // return new Intl.NumberFormat("en-US", {
  //   maximumFractionDigits: 1,
  //   notation: "compact",
  //   compactDisplay: "short",
  // }).format(n); // This is for a simple rounded numbers.
  if (n < 1e3) return n;
  if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + "K";
  if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + "M";
  if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + "B";
  if (n >= 1e12) return +(n / 1e12).toFixed(1) + "T";
};


export default function ProgressBar({ max, progress }) {
  return (
    <Container title={((progress / max) * 100).toFixed(2) + "%"}>
      <NumberContainer>
        <abbr title={progress}>
          {NumberFormatter(progress)}
        </abbr>
        <abbr title={max}>{NumberFormatter(max)}</abbr>
      </NumberContainer>

      <OuterBar>
        <InnerBar progress={(progress / max) * 100} />
      </OuterBar>
    </Container>
  );
}
