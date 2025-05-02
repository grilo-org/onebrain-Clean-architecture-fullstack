'use client'

import { useState } from 'react'

import { PencilIcon, TrashIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { ConfirmDeleteModal } from '@/presentation/components/ConfirmDeleteModal'
import { useDeleteCustomer } from '@/presentation/hooks/useDeleteCustomer'
import { useQueryClient } from '@tanstack/react-query'

import { CustomerTableData } from './types'

export const CustomerTable = ({ data }: { data: CustomerTableData[] }) => {
  const router = useRouter()
  const queryClient = useQueryClient()

  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null)

  const { deleteCustomer, isPending: isDeleting } = useDeleteCustomer()

  const handleDelete = () => {
    if (selectedCustomerId) {
      deleteCustomer(selectedCustomerId, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['customers'] })
        },
      })
      setSelectedCustomerId(null)
    }
  }

  const isActionDisabled = isDeleting

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b">Name</th>
            <th className="px-4 py-2 border-b">Email</th>
            <th className="px-4 py-2 border-b">Phone</th>
            <th className="px-4 py-2 border-b">ZIP</th>
            <th className="px-4 py-2 border-b">City</th>
            <th className="px-4 py-2 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user) => (
            <tr key={user.id} className="hover:bg-gray-100">
              <td className="px-4 py-2 border-b text-center">{user.name}</td>
              <td className="px-4 py-2 border-b text-center">{user.email}</td>
              <td className="px-4 py-2 border-b text-center">{user.phone}</td>
              <td className="px-4 py-2 border-b text-center">{user.zipCode}</td>
              <td className="px-4 py-2 border-b text-center">{user.city}</td>
              <td className="px-4 py-2 border-b text-center">
                <div className="flex justify-center items-center gap-4">
                  <button
                    className="cursor-pointer text-black hover:text-gray-700"
                    onClick={() => router.push(`/edit-customer?id=${user.id}`)}
                  >
                    <PencilIcon className="w-4 h-4" />
                  </button>
                  <button
                    className="cursor-pointer text-black hover:text-gray-700"
                    onClick={() => setSelectedCustomerId(String(user.id))}
                    disabled={isActionDisabled}
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ConfirmDeleteModal
        isOpen={!!selectedCustomerId}
        onCancel={() => setSelectedCustomerId(null)}
        onConfirm={handleDelete}
      />
    </div>
  )
}
