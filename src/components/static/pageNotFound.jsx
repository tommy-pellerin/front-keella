import { Link } from "react-router-dom"
function PageNotFound() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <div className="border border-purple-500 rounded-lg p-40 bg-white">
        <h1 className="text-8xl font-bold text-center">404</h1>
        <br />
        <h2 className="text-3xl">Page not found</h2>
        <br />
        <Link to="/" className="button-primary-large">Retourer à l&apos;acceuil</Link>
      </div>
    </div>
  
  )
}

export default PageNotFound