import "./App.css";
import { Slider } from "./components/Slider";

function App() {
  return (
    <div className="page">
      <div style={{width: 250}}>
      <Slider type="Discreet" subtype="Single" onChange={() => {}} />
      </div>
    </div>
  );
}

export default App;
