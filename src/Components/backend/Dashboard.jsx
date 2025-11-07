"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    link: '',
    category: 'Web Development',
    technologies: '',
    featured: false,
  });

  const router = useRouter();

  useEffect(() => {
    checkAuth();
    fetchProjects();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/auth/me');
      const data = await response.json();
      
      if (response.ok) {
        setUser(data.user);
      } else {
        router.push('/login');
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      router.push('/login');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/login');
      router.refresh();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/projects');
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const handleFileUpload = async (file) => {
    setUploading(true);
    try {
      const uploadFormData = new FormData();
      uploadFormData.append('image', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: uploadFormData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Upload failed');
      }

      if (result.success) {
        setFormData(prev => ({ ...prev, image: result.url }));
        return result.url;
      } else {
        throw new Error(result.error || 'Upload failed');
      }
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Upload failed: ' + error.message);
      return null;
    } finally {
      setUploading(false);
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file (JPEG, PNG, GIF, etc.)');
        return;
      }

      // Validate file size
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }

      await handleFileUpload(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.title || !formData.description || !formData.link) {
      alert('Please fill in all required fields');
      return;
    }

    if (!formData.image) {
      alert('Please upload a project image');
      return;
    }
    
    try {
      const url = isEditing 
        ? `/api/projects/${currentProject._id}`
        : '/api/projects';
      
      const method = isEditing ? 'PUT' : 'POST';
      
      const projectData = {
        ...formData,
        technologies: formData.technologies.split(',').map(tech => tech.trim()).filter(tech => tech !== ''),
      };

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(projectData),
      });

      if (response.ok) {
        resetForm();
        fetchProjects();
        alert(isEditing ? 'Project updated successfully!' : 'Project added successfully!');
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save project');
      }
    } catch (error) {
      console.error('Error saving project:', error);
      alert('Error saving project: ' + error.message);
    }
  };

  const handleEdit = (project) => {
    setCurrentProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      image: project.image,
      link: project.link,
      category: project.category,
      technologies: project.technologies.join(', '),
      featured: project.featured,
    });
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this project?')) {
      try {
        const response = await fetch(`/api/projects/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          fetchProjects();
          alert('Project deleted successfully!');
        } else {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to delete project');
        }
      } catch (error) {
        console.error('Error deleting project:', error);
        alert('Error deleting project: ' + error.message);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      image: '',
      link: '',
      category: 'Web Development',
      technologies: '',
      featured: false,
    });
    setIsEditing(false);
    setCurrentProject(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Project Dashboard</h1>
            <p className="text-gray-400">Welcome back, {user.name}</p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition-colors"
          >
            Logout
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-900 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-400">Total Projects</h3>
            <p className="text-3xl font-bold mt-2">{projects.length}</p>
          </div>
          <div className="bg-gray-900 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-400">Featured Projects</h3>
            <p className="text-3xl font-bold mt-2">
              {projects.filter(project => project.featured).length}
            </p>
          </div>
          <div className="bg-gray-900 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-400">Web Development</h3>
            <p className="text-3xl font-bold mt-2">
              {projects.filter(project => project.category === 'Web Development').length}
            </p>
          </div>
        </div>

        {/* Project Form */}
        <div className="bg-gray-900 p-6 rounded-lg mb-8">
          <h2 className="text-2xl font-bold mb-4">
            {isEditing ? 'Edit Project' : 'Add New Project'}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Project Title *
                </label>
                <input
                  type="text"
                  placeholder="Enter project title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Project Image *
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white focus:outline-none focus:border-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                  disabled={uploading}
                  required={!formData.image}
                />
                {uploading && (
                  <div className="flex items-center mt-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                    <span className="text-blue-400 text-sm">Uploading...</span>
                  </div>
                )}
                <span className="text-xs text-gray-400 mt-1 block">
                  Max 5MB • JPEG, PNG, GIF, WebP
                </span>
              </div>
            </div>

            {/* Image Preview */}
            {formData.image && (
              <div className="flex items-center space-x-4 p-3 bg-gray-800 rounded">
                <Image
                  src={formData.image}
                  alt="Project Image"
                  width={100}
                  height={100}
                  className="object-cover rounded"
                />
                <div>
                  <span className="text-green-400 block">✓ Image selected</span>
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, image: '' }))}
                    className="text-red-400 text-sm hover:underline mt-1"
                  >
                    Remove image
                  </button>
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Project Description *
              </label>
              <textarea
                placeholder="Describe your project..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white focus:outline-none focus:border-blue-500 h-24"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Project Link *
                </label>
                <input
                  type="url"
                  placeholder="https://example.com"
                  value={formData.link}
                  onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                  className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="Web Development">Web Development</option>
                  <option value="Mobile App">Mobile App</option>
                  <option value="UI/UX Design">UI/UX Design</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Technologies
              </label>
              <input
                type="text"
                placeholder="React, Next.js, Node.js, MongoDB (comma separated)"
                value={formData.technologies}
                onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="featured"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                className="mr-2 w-4 h-4 text-blue-600 bg-gray-800 border-gray-700 rounded focus:ring-blue-500 focus:ring-2"
              />
              <label htmlFor="featured" className="text-gray-300">
                Mark as Featured Project
              </label>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={uploading}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-2 rounded transition-colors flex items-center"
              >
                {uploading && (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                )}
                {uploading ? 'Uploading...' : (isEditing ? 'Update Project' : 'Add Project')}
              </button>
              
              {isEditing && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded transition-colors"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Projects List */}
        <div className="bg-gray-900 p-6 rounded-lg">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">All Projects ({projects.length})</h2>
            <div className="flex gap-2">
              <button
                onClick={fetchProjects}
                className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded text-sm transition-colors"
              >
                Refresh
              </button>
            </div>
          </div>
          
          {projects.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">📁</div>
              <h3 className="text-xl font-semibold text-gray-300 mb-2">No projects yet</h3>
              <p className="text-gray-500">Get started by adding your first project above.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <div key={project._id} className="bg-gray-800 p-4 rounded-lg hover:bg-gray-750 transition-colors">
                  <div className="relative">
                    <Image
                      src={project.image}
                      alt={project.title}
                      width={400}
                      height={200}
                      className="w-full h-48 object-cover rounded"
                    />
                    {project.featured && (
                      <span className="absolute top-2 right-2 bg-yellow-600 text-white px-2 py-1 rounded text-xs font-semibold">
                        Featured
                      </span>
                    )}
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2 line-clamp-1">{project.title}</h3>
                  <p className="text-gray-400 mb-2 line-clamp-2 text-sm">{project.description}</p>
                  
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-blue-400 bg-blue-900/30 px-2 py-1 rounded">
                      {project.category}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(project.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.technologies.slice(0, 3).map((tech, index) => (
                      <span key={index} className="bg-gray-700 px-2 py-1 rounded text-xs">
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="bg-gray-700 px-2 py-1 rounded text-xs">
                        +{project.technologies.length - 3} more
                      </span>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(project)}
                      className="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-2 rounded text-sm flex-1 transition-colors"
                    >
                      Edit
                    </button>
                    
                    <button
                      onClick={() => handleDelete(project._id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded text-sm flex-1 transition-colors"
                    >
                      Delete
                    </button>
                    
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded text-sm flex-1 text-center transition-colors"
                    >
                      View
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;