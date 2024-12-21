import TasksSection from "./components/TasksSection";
import TimerSection from "./components/TimerSection";

export default function App() {
  return (
    <main
      id="main"
      className="w-3/5 h-3/5 backdrop-blur-lg rounded-lg flex flex-col items-center p-5 border border-white/20"
    >
      <h1 className="text-3xl font-semibold text-gray-200 border-b border-white/20 px-4 pb-1">
        Pomodoro Timer
      </h1>
      <div className="w-full h-full flex p-8 justify-between">
        <TimerSection />
        <TasksSection />
      </div>
    </main>
  );
}
