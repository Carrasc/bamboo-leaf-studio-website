export default function RootNotFound() {
  return (
    <html lang="en">
      <body className="flex min-h-screen items-center justify-center bg-black text-white">
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-bold">Page not found</h1>
          <a href="/" className="text-gray-400 underline hover:text-white">
            Go Home
          </a>
        </div>
      </body>
    </html>
  );
}
