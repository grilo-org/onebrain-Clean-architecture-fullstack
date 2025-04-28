import Link from 'next/link'

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">404 - Página Não Encontrada</h1>
      <p className="text-gray-600 mb-6">A página que você está procurando não existe ou foi movida.</p>
      <Link href="/" className="text-blue-500 hover:underline">
        Voltar para a página inicial
      </Link>
    </div>
  )
}

export default NotFound
