import { getTodoSchema } from './get-todo';
import { z } from 'zod';


export const listTodoSchema = z.object({
  todos: z.array(getTodoSchema), // Une liste de todos
  page: z.number().min(1).optional(), // Page actuelle
  limit: z.number().min(1).optional(), // Nombre d'éléments par page
  total: z.number().optional(), // Nombre total de todos
});

export type ListTodoDto = z.infer<typeof listTodoSchema>;
