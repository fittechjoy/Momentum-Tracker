import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebaseConfig";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import ErrorBoundary from "./components/ErrorBoundary";
import Login from "./components/Login";
import Signup from "./components/Signup";
import "./index.css";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="app">
      {user ? (
        <>
          <Navbar user={user} />
          <div className="container">
            <ErrorBoundary>
              <Dashboard user={user} />
            </ErrorBoundary>
          </div>
        </>
      ) : (
        <div className="container space-y-10">
          <Login />
          <Signup />
        </div>
      )}
    </div>
  );
}

export default App;
