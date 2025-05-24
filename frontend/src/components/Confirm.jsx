import Spinner from "./Spinner"

function Confirm({ isOpen, isLoading, message, onConfirm, onCancel }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-30 bg-black/50 flex items-center justify-center">
      <div className="bg-white text-green-900 p-6 rounded">
        <p className="mb-5 text-lg">{message}</p>
        <div className="flex justify-between mt-2">
          <button
            disabled={isLoading}
            onClick={onCancel}
            className="bg-green-500 text-white py-2 px-4 rounded"
            type="button"
          >
            No
          </button>
          <button
            disabled={isLoading}
            onClick={onConfirm}
            className="bg-red-500 text-white py-2 px-4 rounded"
            type="button"
          >
            {isLoading ? <Spinner size={4} type="secondary" /> : "Yes"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Confirm
