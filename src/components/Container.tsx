import { ReactNode } from "react";

interface ContainerProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLElement>,
    HTMLElement
  > {
  children: ReactNode;
}

interface ContainerTitleProps {
  children: ReactNode;
}

export function ContainerTitle({ children }: ContainerTitleProps) {
  return (
    <h2 className="border-b border-white/20 font-semibold text-xl text-gray-300 h-max px-2">
      {children}
    </h2>
  );
}

export function Container({ children, ...props }: ContainerProps) {
  return (
    <section
      {...props}
      className={`flex flex-col p-2 w-1/2 h-full bg-slate-400/30 items-center rounded-md border border-white/20 ${
        props.className ? props.className : ""
      }`}
    >
      {children}
    </section>
  );
}
