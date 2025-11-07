import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this-in-production';
const JWT_EXPIRE = '30d';

export function generateToken() {
  // Generate token with admin payload
  return jwt.sign({ 
    id: 'admin',
    name: process.env.ADMIN_NAME,
    email: process.env.ADMIN_EMAIL,
    role: 'admin'
  }, JWT_SECRET, {
    expiresIn: JWT_EXPIRE,
  });
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw new Error('Invalid token');
  }
}