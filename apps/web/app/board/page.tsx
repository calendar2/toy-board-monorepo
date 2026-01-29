'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchAPI } from '../../lib/api';
import { Board } from '@repo/types';

export default function BoardListPage() {
  const [boards, setBoards] = useState<Board[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAPI('/board')
      .then(setBoards)
      .catch((err) => console.error('Failed to fetch boards:', err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">게시판</h1>
        <Link
          href="/board/create"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          글쓰기
        </Link>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="p-4 w-16">ID</th>
              <th className="p-4">제목</th>
              <th className="p-4 w-48">작성일</th>
            </tr>
          </thead>
          <tbody>
            {boards.length === 0 ? (
              <tr>
                <td colSpan={3} className="p-4 text-center text-gray-500">
                  게시글이 없습니다.
                </td>
              </tr>
            ) : (
              boards.map((board) => (
                <tr key={board.id} className="border-b last:border-0 hover:bg-gray-50">
                  <td className="p-4">{board.id}</td>
                  <td className="p-4">
                    <Link href={`/board/${board.id}`} className="hover:underline text-blue-600">
                      {board.title}
                    </Link>
                  </td>
                  <td className="p-4 text-gray-500 text-sm">
                    {new Date(board.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
