import { useEffect, useState } from 'react'
import ErrorFallback from './components/ErrorFallback.tsx';
import { BrowserRouter as Router, Route, useParams } from 'react-router-dom';
import Card from './components/Card';
import ErrorThrower from './components/ErrorThrower.tsx';
import "./utils/monitoring.ts"
import './App.css'
import { faro, FaroErrorBoundary, FaroRoutes } from '@grafana/faro-react';
import initFaro from './utils/monitoring.ts';


function CardListPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [show, setShow] = useState(false);
  const [src, setSrc] = useState('');

  useEffect(() => {
    setLoading(true);
    const url = 'https://jsonplaceholder.typicode.com/users';
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch');
        faro.api.pushEvent('Request completed', { url });
        return res.json();
      })
      .then((data) => {
        setItems(data);
        setLoading(false);
      })
      .catch((err) => {
        faro.api.pushEvent('Request failed', { url });
        setError(err.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    // Simulate a recoverable error
    console.error(new Error("Simulated soft error from CardListPage"));
  }, []);

  

  useEffect(() => {
    const timer = setTimeout(() => {
      setSrc('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80');
    }, 5000);

    return () => clearTimeout(timer);
  }, []);
  
  if (loading) return (
    <div style={{ width: "400px", height: "400px" }}>
      This is loading
    </div>
  )
  if (error) return <div>Error: {error}</div>;
  
  setTimeout(() => {
    setShow(true)
  }, 4000) 


 
  return (
    <div>
      <h2>User List</h2>
      {show && (
        <img
          src={src}
          alt="Mountain landscape"
          width="1200"
          height="800"
          loading="eager"
          style={{ backgroundColor: '#ccc' }}
        />
      )}
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
    const url = `https://jsonplaceholder.typicode.com/users/${id}`
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch');
        faro.api.pushEvent('Request completed', { url });
        return res.json();
      })
      .then((data) => {
        setItem(data);
        setLoading(false);
      })
      .catch((err) => {
        faro.api.pushEvent('Request failed', { url });
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

initFaro();

function App() {
  return (
    <FaroErrorBoundary fallback={(error, resetError) => <ErrorFallback error={error} resetErrorBoundary={resetError} />}>
      <Router>
        <FaroRoutes>
          <Route path="/" element={<CardListPage />} />
          <Route path="/detail/:id" element={<CardDetailPage />} />
          <Route path="/error" element={<ErrorThrower />} />
        </FaroRoutes>
      </Router>
    </FaroErrorBoundary>
  )
}

export default App
