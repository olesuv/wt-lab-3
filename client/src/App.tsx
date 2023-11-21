import "./css/App.css";
import { Key, createRef, useState } from "react";
import PostDescription from "./components/NewPost";
import LatestPosts from "./components/LatestPosts";

function App() {
  const [updatePosts, setUpdatePosts] = useState<Key | null | undefined>(null);
  const latestPostsRef = createRef<HTMLDivElement>();

  const handleUpdatePosts = () => {
    setUpdatePosts(Date.now());

    if (latestPostsRef.current) {
      latestPostsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="grid grid-cols-3 gap-4 ">
      <div className="bg-slate-500 collapse">
        {/* what's up dev. it's the left column */}
      </div>
      <div className="col-span-full md:col-span-1">
        <PostDescription onUpdatePosts={handleUpdatePosts} />
        <div ref={latestPostsRef}>
          <LatestPosts key={updatePosts} />
        </div>
      </div>
      <div className="bg-slate-700 collapse">
        {/* what's up dev. it's the right column */}
      </div>
    </div>
  );
}

export default App;
