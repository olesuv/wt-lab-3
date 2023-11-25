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
  const [editingPost, setEditingPost] = useState<number | null>(null);
  const [updatedValues, setUpdatedValues] = useState<IPost>({
    _id: 0,
    title: "",
    description: "",
    author: "",
    uploadDate: new Date(),
  });

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
        setPosts((prevPosts) => ({
          posts: prevPosts.posts.filter((post) => post._id !== postId),
        }));
      })
      .catch((error) => console.error(error));
  }

  async function updatePost(postId: number | null) {
    await axios
      .put(
        `${import.meta.env.VITE_AXIOS_BASE_URL}/posts/${postId}`,
        updatedValues
      )
      .then(() => {
        setPosts((prevPosts) => ({
          posts: prevPosts.posts.map((post) =>
            post._id === postId ? { ...post, ...updatedValues } : post
          ),
        }));
        setEditingPost(null);
        setUpdatedValues({
          _id: 0,
          title: "",
          description: "",
          author: "",
          uploadDate: new Date(),
        });
      })
      .catch((error) => console.error(error));
  }

  const handleUpdateClick = (postId: number, post: IPost) => {
    setEditingPost(postId);
    setUpdatedValues(post);
  };

  return (
    <div>
      <h1 className="text-center pb-7 text-3xl sm:text-md text-gray-600 font-semibold">
        Latest Nerdy Posts
      </h1>
      {posts.posts.map((post) => (
        <div key={post._id}>
          <ul>
            <li className="p-2.5">
              {editingPost === post._id ? (
                <>
                  <input
                    value={updatedValues.title}
                    onChange={(e) =>
                      setUpdatedValues({
                        ...updatedValues,
                        title: e.target.value,
                      })
                    }
                    className="block w-full text-xl text-gray-900 sm:text-md dark:bg-slate-800 dark:text-white !outline-none font-semibold"
                  />
                  <textarea
                    value={updatedValues.description}
                    onChange={(e) =>
                      setUpdatedValues({
                        ...updatedValues,
                        description: e.target.value,
                      })
                    }
                    className="block resize-none p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white !outline-none"
                  />
                  <input
                    value={updatedValues.author}
                    onChange={(e) =>
                      setUpdatedValues({
                        ...updatedValues,
                        author: e.target.value,
                      })
                    }
                    className="block w-full text-sm text-gray-900 dark:bg-slate-800 dark:text-white !outline-none"
                  />
                </>
              ) : (
                <>
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
                </>
              )}
            </li>
          </ul>

          <div className="grid grid-cols-2 gap-4">
            {editingPost === post._id ? (
              <>
                <div
                  onClick={() => updatePost(post._id)}
                  className="flex justify-center mx-auto rounded-full bg-teal-600/20 border border-teal-600 h-16 w-16"
                >
                  <p className="text-teal-600 text-center flex items-center justify-center h-full">
                    Update
                  </p>
                </div>
              </>
            ) : (
              <>
                <div
                  onClick={() => handleUpdateClick(post._id, post)}
                  className="flex justify-center mx-auto rounded-full bg-teal-600/20 border border-teal-600 h-16 w-16"
                >
                  <p className="text-teal-600 text-center flex items-center justify-center h-full">
                    Update
                  </p>
                </div>
                <div
                  onClick={() => removePost(post._id)}
                  className="flex justify-center mx-auto rounded-full bg-rose-600/20 border border-rose-600 h-16 w-16"
                >
                  <p className="text-rose-600 text-center flex items-center justify-center h-full">
                    Remove
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
