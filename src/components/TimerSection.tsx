import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa6";
import { Container, ContainerTitle } from "./Container";
import { Button } from "./Button";

function ResetButton() {
  return <Button>Reset Timer</Button>;
}

function ShortBreakButton() {
  return <Button>Short Break</Button>;
}

function LongBreakButton() {
  return <Button>Long Break</Button>;
}

export default function TimerSection({ className }: { className?: string }) {
  return (
    <Container className={className ? className : ""}>
      <ContainerTitle>Timer</ContainerTitle>
      <div className="flex flex-col w-full h-full items-center px-2 py-3 gap-y-6">
        <div className="flex w-full h-full justify-around items-center">
          <FaPlay color="#ffffffbb" size={30} />
          <h3 className="text-6xl font-semibold text-gray-200">25:00</h3>
          <FaPause color="#ffffffbb" size={30} />
        </div>
        <div className="px-2 w-full h-full flex flex-wrap gap-x-4 gap-y-2 justify-center">
          <ResetButton />
          <ShortBreakButton />
          <LongBreakButton />
        </div>
      </div>
    </Container>
  );
}
