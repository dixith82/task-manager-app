export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <h1 className="text-3xl font-bold">Task Manager Dashboard</h1>
      <p className="mt-2 text-gray-600">
        Frontend Developer Intern Assignment
      </p>
      <div className="mt-6 space-x-4">
        <a
          href="/login"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          Login
        </a>
        <a
          href="/dashboard"
          className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
        >
          Dashboard
        </a>
      </div>
      <div className="mt-8 p-4 bg-gray-100 rounded">
        <h2 className="text-xl font-semibold">Backend API</h2>
        <p className="mt-2">
          <code className="bg-gray-200 px-2 py-1 rounded">
            https://task-manager-backend-six-delta.vercel.app
          </code>
        </p>
      </div>
    </main>
  );
}