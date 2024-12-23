import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa6";
import { Container, ContainerTitle } from "./Container";
import { Button } from "./Button";
import Timer from "../core/Timer";
import { useCallback, useEffect, useState } from "react";

const timer = new Timer(10, 0);
let isPlaying = false;

function setLongBreak() {
  isPlaying = false;
  timer.setLongBreakTime();
}

function setResetTimer() {
  isPlaying = false;
  timer.resetTimer();
}

function setShortBreak() {
  isPlaying = false;
  timer.setShortBreakTime();
}

export default function TimerSection({ className }: { className?: string }) {
  const [seconds, setSeconds] = useState<number>(timer.seconds);
  const [minutes, setMinutes] = useState<number>(timer.minutes);

  const decreaseTime = useCallback(() => {
    if (isPlaying) {
      if (timer.seconds === 0 && timer.minutes === 0) {
        isPlaying = false;
        timer.decreaseOneSecond();
        setSeconds(timer.seconds);
        setMinutes(timer.minutes);
        console.log(timer.studySecQtd);
      } else {
        timer.decreaseOneSecond();
        setSeconds(timer.seconds);
        setMinutes(timer.minutes);
      }
    } else {
      setSeconds(timer.seconds);
      setMinutes(timer.minutes);
    }
  }, [setSeconds, setMinutes]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds(0);
      setMinutes(0);
      decreaseTime();
    }, 1000);

    return () => clearInterval(intervalId);
  });

  useEffect(() => {
    document.title = `${minutes < 10 ? `0${minutes}` : minutes}:${
      seconds < 10 ? `0${seconds}` : seconds
    } | Pomodoro Timer`;
  }, [minutes, seconds]);

  return (
    <Container className={className ? className : "w-full"}>
      <ContainerTitle>Timer</ContainerTitle>
      <div className="flex flex-col w-full h-full items-center px-2 py-3 gap-y-6">
        <div className="flex w-full h-full justify-between items-center px-3">
          <FaPlay
            className="hover:cursor-pointer hover:text-gray-400 text-gray-200 transition-colors duration-200 size-4 sm:size-6 md:size-4"
            onClick={() => (isPlaying = true)}
          />
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-200 ">{`${
            minutes < 10 ? `0${minutes}` : minutes
          }:${seconds < 10 ? `0${seconds}` : seconds}`}</h3>
          <FaPause
            className="hover:cursor-pointer hover:text-gray-400 text-gray-200 transition-colors duration-200 size-4 sm:size-6 md:size-4"
            size={30}
            onClick={() => (isPlaying = false)}
          />
        </div>
        <div className="px-2 w-full h-full flex flex-wrap gap-x-4 gap-y-2 justify-center">
          <Button onClick={setResetTimer}>Reset Timer</Button>
          <Button onClick={setShortBreak}>Short Break</Button>
          <Button onClick={setLongBreak}>Long Break</Button>
        </div>
      </div>
    </Container>
  );
}
