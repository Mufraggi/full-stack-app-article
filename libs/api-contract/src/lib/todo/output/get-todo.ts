import { z } from 'zod';


export const getTodoSchema = z.object({
  id: z.string().uuid().nonempty("ID is required"),
  title: z.string().nonempty("Title is required"),
  description: z.string().optional(),
  dueDate: z.string().optional(),
  status: z.string().optional(),
});

export type GetTodoDto = z.infer<typeof getTodoSchema>;
