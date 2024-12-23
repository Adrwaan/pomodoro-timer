import { Container, ContainerTitle } from "./Container";

export default function TimerSection({ className }: { className?: string }) {
  return (
    <Container className={`w-full md:w-2/5 ${className ? className : ""}`}>
      <ContainerTitle>Tasks</ContainerTitle>
    </Container>
  );
}