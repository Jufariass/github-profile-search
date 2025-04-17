import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    setError(null);
    setUserData(null);

    try {
      const response = await axios.get(`https://api.github.com/users/${searchQuery}`);

      if (response.status === 200) {
        setUserData(response.data);
      }
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setError('Perfil não encontrado');
      } else {
        setError('Erro ao buscar perfil. Tente novamente.');
      }
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        {/* Logo e título */}
        <div className="header-content">
          <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="GitHub Logo" className="logo" />
          <h1 className="title"> Perfil GitHub</h1>
        </div>

        {/* Campo de busca */}
        <div className="search-wrapper">
          <input
            type="text"
            className="search-bar"
            placeholder="Digite um usuário do Github"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="search-button" onClick={handleSearch}>
            Buscar
          </button>
        </div>

        {/* Mensagem de erro */}
        {error && <p className="error-message">{error}</p>}

        {/* Dados do usuário */}
        {userData && !error && (
  <div className="user-info">
    <img
      src={userData.avatar_url}
      alt="Avatar do usuário"
      className="user-avatar"
    />
    <h2>{userData.name || userData.login}</h2>
    <p>{userData.bio ? userData.bio : 'Este usuário não possui uma bio.'}</p>
  </div>
   )}
    </header>

    <footer className="footer">
  Desenvolvido por <span className="copyright">©</span> por Julia Araújo Farias– {new Date().getFullYear()}
</footer>

    </div>
  )}

export default App;
