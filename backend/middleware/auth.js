const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  try {
    // Buscar token do header Authorization
    const authHeader = req.header('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ 
        erro: 'Acesso negado. Token não fornecido.' 
      });
    }

    const token = authHeader.replace('Bearer ', '');

    // Verificar e decodificar o token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Anexar o ID do usuário ao request
    req.usuarioId = decoded.id;
    next();
  } catch (error) {
    res.status(401).json({ 
      erro: 'Token inválido ou expirado.' 
    });
  }
};

module.exports = auth;
