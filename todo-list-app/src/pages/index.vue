<template>
  <div>
    <h1>Todos</h1>

    <!-- Form to create a new todo -->
    <form @submit.prevent="createTodo">
      <input v-model="newTodo.title" placeholder="Title" required />
      <input v-model="newTodo.description" placeholder="Description" />
      <input v-model="newTodo.dueDate" type="date" />
      <button type="submit">Create Todo</button>
    </form>

    <!-- Error message -->
    <p v-if="error" style="color: red">{{ error }}</p>

    <!-- List of todos -->
    <ul v-if="todos.length">
      <li v-for="todo in todos" :key="todo.id">
        {{ todo.title }} - {{ todo.status }}
        <p v-if="todo.description">{{ todo.description }}</p>
        <p v-if="todo.dueDate">Due: {{ todo.dueDate }}</p>
      </li>
    </ul>
    <p v-else>No todos found.</p>

    <!-- Pagination -->
    <div v-if="todos.length">
      <button @click="changePage(-1)" :disabled="page === 1">Previous</button>
      <span>Page {{ page }} of {{ Math.ceil(total / limit) }}</span>
      <button
        @click="changePage(1)"
        :disabled="page >= Math.ceil(total / limit)"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';

interface Todo {
  id: string;
  title: string;
  description?: string;
  dueDate?: string;
  status: string;
}

interface TodosResponse {
  todos: Todo[];
  total: number;
}

interface CreateTodoResponse {
  todoId: string;
}

const todos = ref<Todo[]>([]);
const total = ref(0);
const page = ref(1);
const limit = ref(10);
const error = ref('');

const newTodo = reactive({
  title: '',
  description: '',
  dueDate: '',
});

// Function to fetch todos
const fetchTodos = async () => {
  error.value = '';
  try {
    const data = await $fetch<TodosResponse>(`/api/todos`, {
      method: 'GET',
      baseURL: 'http://localhost:3000',
      params: { page: page.value, limit: limit.value },
    });
    console.log(data);
    todos.value = data.todos || [];
    total.value = data.total || 0;
  } catch (e) {
    console.error('Error fetching todos:', e);
    error.value = 'Failed to load todos. Please try again.';
    todos.value = [];
    total.value = 0;
  }
};

// Function to create a new todo
const createTodo = async () => {
  error.value = '';
  try {
    const data = await $fetch<CreateTodoResponse>('/api/todos', {
      baseURL: 'http://localhost:3000',
      method: 'POST',
      body: newTodo,
    });
    console.log('Todo created with ID:', data.todoId);

    // Reset form and refetch todos
    Object.assign(newTodo, { title: '', description: '', dueDate: '' });
    await fetchTodos();
  } catch (e) {
    console.error('Error creating todo:', e);
    error.value = 'Failed to create todo. Please try again.';
  }
};

// Function to change page
const changePage = (direction: number) => {
  page.value += direction;
  fetchTodos();
};

// Fetch todos on component mount
fetchTodos();
</script>
