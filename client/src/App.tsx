import "./css/App.css";
import PostDescription from "./components/NewPost";

function App() {
  return (
    <div className="grid grid-cols-3 gap-4 ">
      <div className="bg-slate-500 collapse">
        what's up dev. it's left column
      </div>
      <div className="col-span-full md:col-span-1">
        <PostDescription />
      </div>
      <div className="bg-slate-700 collapse">
        what's up dev. it's right column
      </div>
    </div>
  );
}

export default App;
