'use client'

import { useEffect, useState, use } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { fetchAPI } from '@/lib/api'
import { Board } from '@repo/types'

export default function BoardDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  // Unwrap params using React.use()
  const { id } = use(params)

  const [board, setBoard] = useState<Board | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAPI(`/board/${id}`)
      .then(setBoard)
      .catch((err) => {
        console.error('Failed to fetch board:', err)
        alert('게시글을 불러올 수 없습니다.')
        router.push('/board')
      })
      .finally(() => setLoading(false))
  }, [id, router])

  const handleDelete = async () => {
    if (!confirm('정말 삭제하시겠습니까?')) return
    try {
      await fetchAPI(`/board/${id}`, { method: 'DELETE' })
      router.push('/board')
    } catch (err) {
      console.error('Failed to delete board:', err)
      alert('삭제에 실패했습니다.')
    }
  }

  if (loading) return <div className="p-8">Loading...</div>
  if (!board) return null

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-6">
        <Link href="/board" className="text-gray-500 hover:underline mb-4 inline-block">
          &larr; 목록으로
        </Link>
        <h1 className="text-3xl font-bold mb-2">{board.title}</h1>
        <div className="text-gray-500 text-sm">
          작성일: {new Date(board.createdAt).toLocaleString()} | ID: {board.id}
        </div>
      </div>

      <div className="border-t border-b py-8 min-h-[200px] whitespace-pre-wrap">
        {board.content}
      </div>

      <div className="mt-6 flex justify-end gap-2">
        <Link
          href={`/board/${id}/edit`}
          className="px-4 py-2 border rounded hover:bg-gray-50 bg-white"
        >
          수정
        </Link>
        <button
          onClick={handleDelete}
          className="px-4 py-2 border border-red-200 text-red-600 rounded hover:bg-red-50 bg-white"
        >
          삭제
        </button>
      </div>
    </div>
  )
}
