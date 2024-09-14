import { useDebounce } from '@uidotdev/usehooks'
import React, { useMemo, useState } from 'react'
import backgroundImage from '../assets/backgroundImage.jpg'
import { Button, TodoItem, TodoModal } from '../components'
import { useAuthContext } from '../context'
import { useTodo } from '../hooks'

export const TodoPage: React.FC = () => {
  const authContext = useAuthContext()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [editTodoData, setEditTodoData] = useState<TODO>()
  const { todos, addTodo, deleteTodo, editTodo, toggleDone } = useTodo()

  const openAddTodoModal = () => setIsModalVisible(true)
  const closeModal = () => {
    setIsModalVisible(false)
    setEditTodoData(undefined)
  }

  const [searchQuery, setSearchQuery] = useState('')
  const debouncedSearchQuery = useDebounce(searchQuery, 300)

  const filteredTodos = useMemo(() => {
    return debouncedSearchQuery.length === 0
      ? todos
      : todos.filter(
          (todo: TODO) =>
            todo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            todo.description.toLowerCase().includes(searchQuery.toLowerCase()),
        )
  }, [debouncedSearchQuery, todos])

  if (!authContext?.isAuthenticated) {
    return <p>Please log in to view your todos.</p>
  }

  return (
    <>
      <div className="w-full bg-white rounded-lg shadow-md h-full">
        <div className="relative">
          <img src={backgroundImage} alt="background image" className="h-50 object-cover h-48 w-full rounded-t-md" />
          <div className="absolute inset-0 flex p-16 mx-10">
            <h2 className="text-white text-4xl font-bold">ToDo</h2>
          </div>
          <div className="mx-auto absolute inset-28">
            <div className="relative flex items-center space-x-4">
              <input
                type="search"
                id="search"
                className="block w-full p-4 text-sm border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:text-white focus:outline-none"
                placeholder="Search...."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button label="Add" onClick={openAddTodoModal} />
            </div>
          </div>
          <div className="bg-white max-w-full p-10 z-10 relative mx-auto rounded-xl h-full overflow-auto">
            {filteredTodos.length > 0 ? (
              filteredTodos.map((todo: TODO) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  handleDelete={deleteTodo}
                  toggleStatus={toggleDone}
                  handleEdit={() => {
                    setEditTodoData(todo)
                    setIsModalVisible(true)
                  }}
                />
              ))
            ) : (
              <p>No matching todos found.</p>
            )}
          </div>
        </div>
      </div>
      {isModalVisible && (
        <TodoModal onClose={closeModal} onCreate={addTodo} onEdit={editTodo} editingTodo={editTodoData} />
      )}
    </>
  )
}
