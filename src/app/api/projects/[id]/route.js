import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Project from '@/models/Project';
import { authenticate } from '@/middleware/auth';

export async function PUT(request, { params }) {
  try {
    // Authenticate user
    const user = await authenticate(request);
    
    await dbConnect();
    const { id } = params;
    const body = await request.json();

    const project = await Project.findByIdAndUpdate(id, body, { new: true });
    
    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    return NextResponse.json(project);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 401 });
  }
}

export async function DELETE(request, { params }) {
  try {
    // Authenticate user
    const user = await authenticate(request);
    
    await dbConnect();
    const { id } = params;

    const project = await Project.findByIdAndDelete(id);
    
    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Project deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 401 });
  }
}