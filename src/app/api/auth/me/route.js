import { NextResponse } from 'next/server';
import { authenticate } from '@/middleware/auth';

export async function GET(request) {
  try {
    const user = await authenticate(request);
    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Not authenticated' },
      { status: 401 }
    );
  }
}