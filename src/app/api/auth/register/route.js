import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import { generateToken } from '@/lib/jwt';

export async function POST(request) {
  try {
    await dbConnect();
    const { name, email, password } = await request.json();

    // TEMPORARY: Comment out this check to allow registration
    // Check if admin already exists
    // const adminExists = await User.findOne({ role: 'admin' });
    // if (adminExists) {
    //   return NextResponse.json(
    //     { error: 'Admin user already exists. Registration is disabled.' },
    //     { status: 400 }
    //   );
    // }

    // Check if user exists with this email
    // const existingUser = await User.findOne({ email });
    // if (existingUser) {
    //   return NextResponse.json(
    //     { error: 'User with this email already exists' },
    //     { status: 400 }
    //   );
    // }

    // Create user
    // const user = await User.create({
    //   name,
    //   email,
    //   password,
    //   role: 'admin', // Make them admin
    // });

    // Generate token
    const token = generateToken(user._id);

    // Create response
    const response = NextResponse.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
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
    console.error('Register error:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}