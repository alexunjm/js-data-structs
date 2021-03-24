import { NumberSorter } from "./components/bst";
import PrintTree from "./components/print-tree";

const bst = new NumberSorter();
let num: number;
for (let i = 0; i < 9; i++) {
  num = parseInt((Math.random() * 99).toFixed(0));
  bst.insert(num);
}

const root = bst.getRootNode() || { value: 0 };

function App() {
  return (
    <div className="App">
      <PrintTree node={root} />
    </div>
  );
}

export default App;
