import { verifyToken } from '@/lib/jwt';

export async function authenticate(req) {
  try {
    const token = req.cookies.get('token')?.value || 
                  req.headers.get('authorization')?.replace('Bearer ', '');
    
    if (!token) {
      throw new Error('No token provided');
    }

    const decoded = verifyToken(token);
    
    // Verify the token was issued for our admin
    if (decoded.email !== process.env.ADMIN_EMAIL) {
      throw new Error('Invalid token');
    }
    
    return decoded;
  } catch (error) {
    throw new Error('Not authorized');
  }
}