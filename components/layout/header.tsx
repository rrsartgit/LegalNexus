import Link from "next/link"

export default function Header() {
  return (
    <header className="bg-white shadow">
      <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          <Link href="/">My App</Link>
        </h1>
      </div>
    </header>
  )
}
