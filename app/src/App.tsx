import Navbar from './component/Navbar';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import ArticleList from './page/ArticleList';
import Footer from './component/Footer';
import ArticleEditor from './page/ArticleEditor';
import SignInPage from './page/SignInPage';
import { createContext, useState } from 'react';
import User from './model/user';
import { UserContextType } from './context/Types';
import SignOutPage from './page/SignOutPage';
import RegisterPage from './page/SignUpPage';


export const UserContext = createContext<UserContextType | null>(null);

const App = () => {
  const [user, setUser] = useState<User | undefined>(undefined);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Router>
        <div className="app">
          <Navbar />
          <div className="content container my-5">
            <Routes>
              <Route path="/" element={<ArticleList />} />
              <Route path="/new" element={<ArticleEditor />} />
              <Route path="/login" element={<SignInPage />} />
              <Route path="/logout" element={<SignOutPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </UserContext.Provider>
  );
}

export default App;