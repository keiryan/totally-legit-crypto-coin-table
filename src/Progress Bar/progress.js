import { Container, OuterBar, InnerBar } from "./styles.progress";

export default function ProgressBar({ max, progress }) {
  return (
    <Container title={(progress / max) * 100 + '%'}>
      <OuterBar>
        <InnerBar progress={(progress / max) * 100} />
      </OuterBar>
    </Container>
  );
}
