import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 px-4 md:px-8 py-6">
      <Navbar />
      <div className="p-6">
       <ErrorBoundary>
        <Dashboard />
        </ErrorBoundary> 
      </div>
    </div>
  );
}

export default App;
