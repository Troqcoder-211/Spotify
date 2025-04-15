import { Home, Music2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="h-screen bg-neutral-900 flex items-center justify-center">
      <div className="text-center space-y-8 px-4">
        {/* Large animated musical note */}
        <div className="flex justify-center animate-bounce">
          <Music2 className="h-24 w-24 text-emerald-500" />
        </div>

        {/* Error message */}
        <div className="space-y-4">
          <h1 className="text-7xl font-bold text-white">404</h1>
          <h2 className="text-2xl font-semibold text-white">Page not found</h2>
          <p className="text-neutral-400 max-w-md mx-auto">
            Looks like this track got lost in the shuffle. Let's get you back to
            the music.
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
          <button
            onClick={() => navigate(-1)}
            className="bg-neutral-800 hover:bg-neutral-700 text-white border border-neutral-700 px-6 py-2 rounded-md w-full sm:w-auto transition duration-200"
          >
            Go Back
          </button>
          <button
            onClick={() => navigate("/")}
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-md w-full sm:w-auto flex items-center justify-center transition duration-200"
          >
            <Home className="mr-2 h-4 w-4" />
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
