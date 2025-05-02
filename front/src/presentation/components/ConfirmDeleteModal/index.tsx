'use client'

import { FC } from 'react'

import { ConfirmDeleteModalProps } from './types'

export const ConfirmDeleteModal: FC<ConfirmDeleteModalProps> = ({ isOpen, onCancel, onConfirm }) => {
  if (!isOpen) {
    return null
  }

  return (
    <div className="fixed inset-0 bg-transparent backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-sm w-full text-center">
        <h2 className="text-lg font-semibold mb-4">Tem certeza que deseja deletar este customer?</h2>
        <div className="flex justify-center gap-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded bg-red-500 hover:bg-red-600 text-white font-semibold"
          >
            Deletar
          </button>
        </div>
      </div>
    </div>
  )
}
