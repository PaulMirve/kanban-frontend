import { Subtask } from "./Subtask";

export type Task = {
  id: number;
  title: string;
  description: string;
  subtasks: Subtask[];
  column: number;
};
