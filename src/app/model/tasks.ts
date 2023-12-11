export interface Todo {
    id: number;
    title: string;
    description: string;
    status:TodoStatus;
    completed :Boolean
  }

export enum TodoStatus {
  OPEN = 'open',
  DONE ='done'
}  