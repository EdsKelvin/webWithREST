import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    // Recuperar dados do usuário do localStorage ao carregar
    const savedUser = localStorage.getItem('usuario');
    const savedToken = localStorage.getItem('token');

    if (savedUser && savedToken) {
      setUsuario(JSON.parse(savedUser));
      setToken(savedToken);
    }
    setCarregando(false);
  }, []);

  const login = (tokenJWT, dadosUsuario) => {
    localStorage.setItem('token', tokenJWT);
    localStorage.setItem('usuario', JSON.stringify(dadosUsuario));
    setToken(tokenJWT);
    setUsuario(dadosUsuario);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    setToken(null);
    setUsuario(null);
  };

  const estaAutenticado = !!token;

  return (
    <AuthContext.Provider value={{ usuario, token, carregando, estaAutenticado, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};
