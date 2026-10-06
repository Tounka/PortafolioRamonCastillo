import './App.css';
import { PaginaPrincipal } from './Paginas/PaginaPrincipal';
import ClickSpark from './ComponentesGenerales/ClickSpark';

function App() {
  return (
    <div className="App">
        <ClickSpark
          sparkColor="#fcb71c"
          sparkSize={12}
          sparkRadius={22}
          sparkCount={8}
          duration={420}
          extraScale={1.1}
        />
        <PaginaPrincipal />
    </div>
  );
}

export default App;
