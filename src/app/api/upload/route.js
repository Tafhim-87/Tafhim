import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('image');
    
    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'Only image files are allowed' }, { status: 400 });
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: 'File size must be less than 5MB' }, { status: 400 });
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create unique filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const filename = `project-${uniqueSuffix}${path.extname(file.name)}`;
    const uploadDir = path.join(process.cwd(), 'public/uploads', filename);

    // Save file
    await writeFile(uploadDir, buffer);

    // Return file URL
    const fileUrl = `/uploads/${filename}`;

    return NextResponse.json({ 
      success: true,
      message: 'File uploaded successfully',
      filename: filename,
      url: fileUrl,
      originalName: file.name,
      size: file.size
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ 
      success: false,
      error: 'Upload failed: ' + error.message 
    }, { status: 500 });
  }
}