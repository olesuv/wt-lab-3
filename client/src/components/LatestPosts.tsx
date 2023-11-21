import { useEffect, useState } from "react";
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
        (a: { uploadDate: string }, b: { uploadDate: string }) =>
          new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime()
      );
      setPosts({ posts: sortedPosts });
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  }

  async function removePost(postId: number | null) {
    await axios
      .delete(`${import.meta.env.VITE_AXIOS_BASE_URL}/posts/${postId}`)
      .then(() => {
        // Remove the deleted post from the state
        setPosts((prevPosts) => ({
          posts: prevPosts.posts.filter((post) => post._id !== postId),
        }));
      })
      .catch((error) => console.error(error));
  }

  // async function updatePost(postId: number | null, updatedData: IPost) {
  //   await axios
  //     .put(
  //       `${import.meta.env.VITE_AXIOS_BASE_URL}/posts/${postId}`,
  //       updatedData
  //     )
  //     .then(() => {
  //       // Update the post in the state
  //       setPosts((prevPosts) => ({
  //         posts: prevPosts.posts.map((post) =>
  //           post._id === postId ? { ...post, ...updatedData } : post
  //         ),
  //       }));
  //     })
  //     .catch((error) => console.error(error));
  // }

  return (
    <div>
      <h1 className="text-center pb-7 text-3xl sm:text-md text-gray-600 font-semibold">
        Latest Nerdy Posts
      </h1>
      {posts.posts.map((post) => (
        <div key={post._id}>
          <ul>
            <li className="p-2.5">
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
          </ul>

          <div className="grid grid-cols-2 gap-4">
            <div className="relative flex items-center justify-center">
              <div
                // onClick={() => updatePost(post._id, { title: "loh" })}
                className="rounded-full bg-teal-600/20 border border-teal-600 h-16 w-16"
              >
                <p className="text-teal-600 text-center flex items-center justify-center h-full">
                  Update
                </p>
              </div>
            </div>
            <div className="relative flex items-center justify-center">
              <div
                onClick={() => removePost(post._id)}
                className="rounded-full bg-rose-600/20 border border-rose-600 h-16 w-16"
              >
                <p className="text-rose-600 text-center flex items-center justify-center h-full">
                  Remove
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
