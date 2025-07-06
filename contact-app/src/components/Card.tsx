import React from 'react';
import { useNavigate } from 'react-router-dom';

interface CardProps {
  id: string | number;
  title: string;
  description: string;
}

const Card: React.FC<CardProps> = ({ id, title, description }) => {
  const navigate = useNavigate();

  return (
    <div
      className="card"
      style={{ border: '1px solid #ccc', borderRadius: 8, padding: 16, margin: 8, cursor: 'pointer' }}
      onClick={() => navigate(`/detail/${id}`)}
    >
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default Card; 