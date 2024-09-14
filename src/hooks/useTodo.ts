import { useEffect, useState } from 'react'
import { storageService } from '../services'

const TODO_KEY = 'todos'

export function useTodo() {
  const [todos, setTodos] = useState<TODO[]>([])

  useEffect(() => {
    const todos = storageService.get<TODO[]>(TODO_KEY) || []
    setTodos(todos)
  }, [])

  useEffect(() => {
    localStorage.setItem(TODO_KEY, JSON.stringify(todos))
  }, [todos])

  const addTodo = (title: string, description: string) => {
    setTodos([
      ...todos,
      {
        id: Date.now(),
        title,
        description,
        done: false,
      },
    ])
  }

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todos) => todos.id !== id))
  }

  const editTodo = (id: number, title: string, description: string) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, title, description } : todo)))
  }

  const toggleDone = (id: number) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo)))
  }

  return { todos, addTodo, deleteTodo, editTodo, toggleDone }
}
