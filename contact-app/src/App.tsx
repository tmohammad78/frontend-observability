import { useEffect, useState } from 'react'
import './App.css'
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';
import { onErrorCallback } from './utils/onErrorCallback.ts';
import ErrorFallback from './components/ErrorFallback.tsx';
import { initVitalsMonitoring } from './utils/monitorVitals.ts';
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';
import Card from './components/Card';
import ErrorThrower from './components/ErrorThrower.tsx';

function CardListPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then((data) => {
        setItems(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>User List</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {items.map((item) => (
          <Card
            key={item.id}
            id={item.id}
            title={item.name}
            description={item.email}
          />
        ))}
      </div>
    </div>
  );
}

function CardDetailPage() {
  const { id } = useParams();
  const [item, setItem] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then((data) => {
        setItem(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!item) return <div>No data found.</div>;

  return (
    <div style={{ maxWidth: 400, margin: '40px auto', border: '1px solid #ccc', borderRadius: 8, padding: 24 }}>
      <h2>{item.name}</h2>
      <p><strong>Email:</strong> {item.email}</p>
      <p><strong>Username:</strong> {item.username}</p>
      <p><strong>Phone:</strong> {item.phone}</p>
      <p><strong>Website:</strong> {item.website}</p>
      <p><strong>Company:</strong> {item.company?.name}</p>
      <p><strong>Address:</strong> {item.address?.street}, {item.address?.city}</p>
    </div>
  );
}

function App() {
  useEffect(() => {
    initVitalsMonitoring();
  }, []);

  return (
    <ReactErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={onErrorCallback}
    >
      <Router>
        <Routes>
          <Route path="/" element={<CardListPage />} />
          <Route path="/detail/:id" element={<CardDetailPage />} />
          <Route path="/error" element={<ErrorThrower />} />
        </Routes>
      </Router>
    </ReactErrorBoundary>
  )
}

export default App
