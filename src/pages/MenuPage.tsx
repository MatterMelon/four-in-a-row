import { useNavigate } from 'react-router';

function MenuPage() {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Menu page</h1>
      <button onClick={() => navigate('/game')}>Начать игру</button>
    </div>
  );
}

export default MenuPage;
