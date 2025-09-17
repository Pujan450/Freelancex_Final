import React from 'react';
import { useParams } from 'react-router-dom';
import { projects } from '../../data.js'; // Make sure the path is correct

const Project = () => {
  const { id } = useParams();
  const projectId = parseInt(id);
  const project = projects.find(p => p.id === projectId);

  if (!project) {
    return <div>Project not found!</div>;
  }

  return (
    <div className="project-page">
      <h1>Project Details: {project.cat}</h1>
      <img src={project.img} alt={project.cat} style={{ width: '100%', maxWidth: '800px' }}/>
      <p>By: {project.username}</p>
      {/* Add more details here */}
    </div>
  );
};

export default Project;