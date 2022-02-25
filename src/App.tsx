import React, { useEffect, useState, useContext } from 'react';
import { Route, Routes, Outlet, Navigate } from 'react-router-dom';
import firebaseApp from './service/firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { LandingPage, DirectoryPage, CalendarPage, ProfilePage, PageNotFound } from './pages';
import { Header } from './components/layout';
import { Loading } from './components/elements';
import AppBar from './AppBar';

const auth = getAuth(firebaseApp);

function App() {
  // console.log(window.ipcRenderer);

  return (
    <AuthProvider>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/directory"
            element={
              <RequireAuth>
                <DirectoryPage />
              </RequireAuth>
            }
          />
          <Route
            path="/calendar/:id"
            element={
              <RequireAuth>
                <CalendarPage />
              </RequireAuth>
            }
          />
          <Route
            path="/profile/:id"
            element={
              <RequireAuth>
                <ProfilePage />
              </RequireAuth>
            }
          />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;

const AppLayout = () => {
  let auth = useAuth();

  return (
    <div className="flex flex-col min-h-screen bg-stone-700">
      {window.Main && (
        <div className="flex-none">
          <AppBar />
        </div>
      )}
      <header className="mb-2 md:mb-4 z-50 sticky top-0">
        <Header currentUser={auth.firebaseUser} firebaseLoading={auth.firebaseLoading} />
      </header>
      <main className="text-stone-100">
        <Outlet />
      </main>
    </div>
  );
};

interface AuthContextType {
  firebaseUser: string | null;
  firebaseLoading: boolean;
}

const AuthContext = React.createContext<AuthContextType>(null!);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [firebaseUser, setFirebaseUser] = useState<any>(null);
  const [firebaseLoading, setFirebaseLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        auth.currentUser?.getIdTokenResult().then(function ({ claims }) {
          setFirebaseUser(claims.user_id);
          setFirebaseLoading(false);
        });
      } else {
        setFirebaseUser(null);
        setFirebaseLoading(false);
      }
    });
  }, []);

  let value = { firebaseUser, firebaseLoading };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  let auth = useAuth();
  // console.log(auth);
  if (auth.firebaseLoading) {
    return <Loading />;
  }

  if (!auth.firebaseUser && !auth.firebaseLoading) {
    return <Navigate to="/" />;
  }

  return children;
};
