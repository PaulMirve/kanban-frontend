import { Task } from "./Task";

export const ColumnColors = {
  0: "#49C4E5",
  1: "#8471F2",
  2: "#67E2AE",
  3: "#ef233c",
  4: "#ffd60a",
};

export type Column = {
  id: number;
  name: string;
  tasks: Task[];
  color: number;
};
