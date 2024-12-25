import { ThemeProvider } from "./components/ThemeProvider";
import TasksSection from "./components/TasksSection";
import TimerSection from "./components/TimerSection";

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="ui-theme">
      <main
        id="main"
        className="w-5/6 md:w-3/5 h-4/5 md:h-3/5 backdrop-blur-lg rounded-lg flex flex-col items-center p-5 border border-white/20"
      >
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-200 border-b border-white/20 px-4 pb-1 text-center">
          Pomodoro Timer
        </h1>
        <div className="w-full h-full flex flex-col md:flex-row px-2 py-4 justify-between gap-4">
          <TimerSection />
          <TasksSection />
        </div>
      </main>
    </ThemeProvider>
  );
}
