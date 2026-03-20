import jwt from 'jsonwebtoken'
import User from '../models/User.js'

export const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader) {
      return res.status(401).json({ msg: 'Token não fornecido' })
    }

    const parts = authHeader.split(' ')

    if (parts.length !== 2) {
      return res.status(401).json({ msg: 'Formato de token inválido' })
    }

    const [scheme, token] = parts

    if (scheme !== 'Bearer') {
      return res.status(401).json({ msg: 'Formato de token inválido' })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    const user = await User.findById(decoded.id).select('-senha')

    if (!user) {
      return res.status(401).json({ msg: 'Usuário não encontrado' })
    }

    req.user = {
      id: user._id.toString(),
      nome: user.nome,
      email: user.email,
      tipo: user.tipo
    }

    next()
  } catch (error) {
    return res.status(401).json({ msg: 'Token inválido' })
  }
}