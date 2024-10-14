import { describe, it, expect } from 'vitest';
import { getTodoSchema } from './get-todo';


describe('getTodoSchema', () => {
  it('should validate a valid todo object', () => {
    const validTodo = {
      id: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
      title: 'Test Todo',
      description: 'This is a test todo',
      dueDate: '2024-10-15',
      status: 'pending',
    };

    const result = getTodoSchema.safeParse(validTodo);
    expect(result.success).toBe(true);
  });

  it('should fail if id is missing', () => {
    const invalidTodo = {
      title: 'Test Todo',
    };

    const result = getTodoSchema.safeParse(invalidTodo);
    expect(result.success).toBe(false);
  });

  it('should fail if title is empty', () => {
    const invalidTodo = {
      id: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
      title: '',
    };

    const result = getTodoSchema.safeParse(invalidTodo);
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe('Title is required');
  });

  it('should validate if description and dueDate are missing', () => {
    const validTodo = {
      id: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
      title: 'Test Todo',
    };

    const result = getTodoSchema.safeParse(validTodo);
    expect(result.success).toBe(true);
  });
});
