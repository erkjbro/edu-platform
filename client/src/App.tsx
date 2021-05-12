import { useState, useEffect } from 'react';

const App = () => {
  const [msg, setMsg] = useState<string>('');
  const [data, setData] = useState<any>({});

  useEffect(() => {
    (async () => {
      const response = await fetch('http://localhost:5000/');
      const { message, data } = await response.json();
      setMsg(message);
      setData({
        ...data,
      });
    })();
  }, []);

  return (
    <div>
      <h1>EDU Platform</h1>
      {msg && <span>{msg}</span>}
      <br />
      {data && <span>{Object.values(data)}</span>}
    </div>
  );
};

export default App;
