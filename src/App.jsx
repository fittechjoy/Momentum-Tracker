import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebaseConfig";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import ErrorBoundary from "./components/ErrorBoundary";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 px-4 md:px-8 py-6">
      {user ? (
        <>
          <Navbar user={user} />
          <div className="p-6">
            <ErrorBoundary>
              <Dashboard user={user} />
            </ErrorBoundary>
          </div>
        </>
      ) : (
        <div className="p-6 space-y-10">
          <Login />
          <Signup />
        </div>
      )}
    </div>
  );
}

export default App;
