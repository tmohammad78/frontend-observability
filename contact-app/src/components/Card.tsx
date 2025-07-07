import { useNavigate } from 'react-router-dom';

interface CardProps {
  id: string | number;
  title: string;
  description: string;
}
import { withFaroProfiler } from '@grafana/faro-react';


const Card = ({ id, title, description }: CardProps) => {
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

export default withFaroProfiler(Card);