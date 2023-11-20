import { useEffect, useRef, useState } from "react";
import axios from "axios";

interface IPost {
  _id: number;
  title: string;
  description: string;
  author: string;
  uploadDate: Date;
}

interface TPosts {
  posts: IPost[];
}

export default function LatestPosts() {
  const [posts, setPosts] = useState<TPosts>({ posts: [] });

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_AXIOS_BASE_URL}/posts`
      );
      const sortedPosts = response.data.sort(
        (a, b) =>
          new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime()
      );
      setPosts({ posts: sortedPosts });
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  }

  return (
    <div>
      <h1 className="text-center pb-7 text-3xl sm:text-mdtext-gray-900 text-gray-400 font-semibold">
        Latest Nerdy Posts
      </h1>
      <ul>
        {posts.posts.map((post) => (
          <li key={post._id} className="p-2.5">
            <p className="text-xl dark:bg-slate-800 dark:text-white font-semibold">
              {post.title}
            </p>
            <p className="text-sm dark:bg-slate-800 dark:text-white">
              {post.description}
            </p>
            <p className="text-sm underline dark:bg-slate-800 dark:text-white">
              {post.author}
            </p>
            <p className="text-sm underline dark:bg-slate-800 dark:text-white">
              {new Date(post.uploadDate).toLocaleDateString("en-GB")}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
