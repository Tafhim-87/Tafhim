import { NextResponse } from 'next/server';
import { generateToken } from '@/lib/jwt';

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    // Get admin credentials from environment
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    // Check if environment variables are set
    if (!adminEmail || !adminPassword) {
      return NextResponse.json(
        { error: 'Admin credentials not configured' },
        { status: 500 }
      );
    }

    // Validate credentials against environment variables
    if (email !== adminEmail || password !== adminPassword) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Generate token
    const token = generateToken();

    // Create response
    const response = NextResponse.json({
      success: true,
      user: {
        id: 'admin',
        name: process.env.ADMIN_NAME,
        email: adminEmail,
        role: 'admin',
      },
    });

    // Set cookie
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60, // 30 days
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}