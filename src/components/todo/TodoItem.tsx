import React from 'react'
import { FiCheckCircle, FiCircle, FiEdit2, FiX } from 'react-icons/fi'

interface TodoItemProps {
  todo: TODO
  handleDelete: (id: number) => void
  toggleStatus: (id: number) => void
  handleEdit: () => void
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo, handleDelete, toggleStatus, handleEdit }) => {
  return (
    <div className="border rounded mb-2 flex items-center h-20">
      <button onClick={() => toggleStatus(todo.id)} className="mr-2 border-r border-neutral-200 px-6 h-full">
        {todo.done ? <FiCheckCircle size={20} className="text-green-600" /> : <FiCircle size={20} />}
      </button>
      <div className="grow px-2">
        <h3 className={`font-bold ${todo.done ? 'line-through' : ''}`}>{todo.title}</h3>
        <p className="text-sm text-neutral-800">{todo.description}</p>
      </div>
      <div className="flex gap-2 pr-4">
        <button className="mr-2" onClick={handleEdit}>
          <FiEdit2 />
        </button>
        <button onClick={() => handleDelete(todo.id)}>
          <FiX />
        </button>
      </div>
    </div>
  )
}
