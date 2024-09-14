import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Button } from '../button/Button'

const validationSchema = Yup.object({
  title: Yup.string()
    .min(3, 'Title must be at least 3 characters long')
    .max(25, 'Title is too long')
    .required('Title is required'),
  description: Yup.string()
    .max(50, 'Description must be shorter than 60 characters')
    .required('Description is required'),
})

interface TodoModalProps {
  onClose: () => void
  editingTodo?: TODO
  onEdit?: (id: number, title: string, description: string) => void
  onCreate?: (title: string, description: string) => void
}

export function TodoModal({ onClose, editingTodo, onCreate, onEdit }: TodoModalProps) {
  const formik = useFormik({
    initialValues: {
      title: editingTodo?.title || '',
      description: editingTodo?.description || '',
    },
    validationSchema,
    onSubmit: (values) => {
      if (editingTodo) {
        onEdit?.(editingTodo.id, values.title, values.description)
      } else {
        onCreate?.(values.title, values.description)
      }
      onClose()
    },
  })

  return (
    <>
      <div className="h-screen w-screen fixed left-0 top-0 bg-black opacity-40 z-50"></div>
      <div className="h-screen w-screen fixed left-0 top-0 flex justify-center items-center z-50">
        <div className="h-auto w-5/12 shadow-md rounded-md bg-white p-6">
          <h2 className="text-2xl font-bold mb-4">Add New Todo</h2>

          <form onSubmit={formik.handleSubmit}>
            <div className="mb-4">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                id="title"
                name="title"
                type="text"
                className={`mt-1 block w-full p-2 border ${
                  formik.touched.title && formik.errors.title ? 'border-red-500' : 'border-gray-300'
                } rounded-md shadow-sm focus:outline-none`}
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.title && formik.errors.title && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.title}</p>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                className={`mt-1 block w-full p-2 border ${
                  formik.touched.description && formik.errors.description ? 'border-red-500' : 'border-gray-300'
                } rounded-md shadow-sm focus:outline-none`}
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.description && formik.errors.description && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.description}</p>
              )}
            </div>

            <div className="flex justify-end gap-4">
              {editingTodo ? <Button label="Update" type="submit" /> : <Button label="Create" type="submit" />}
              <Button label="Cancel" onClick={onClose} variant="secondary" />
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
