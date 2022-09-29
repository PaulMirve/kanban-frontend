export type Subtask = {
  id: number;
  description: string;
  completed: boolean;
  task: number;
};

export type SubtaskRequest = {
  description: string;
  task: number;
};
