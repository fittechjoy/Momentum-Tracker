import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
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
