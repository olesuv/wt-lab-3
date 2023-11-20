import { useState } from "react";
import axios from "axios";

interface INewPostProps {
  onUpdatePosts: () => void;
}

export default function PostDescription({ onUpdatePosts }: INewPostProps) {
  const [error, setError] = useState("");

  async function handleCreatePost() {
    const title = (document.getElementById("title") as HTMLInputElement).value;
    const description = (
      document.getElementById("description") as HTMLTextAreaElement
    ).value;
    const author = (document.getElementById("author") as HTMLInputElement)
      .value;

    await axios
      .post(`${import.meta.env.VITE_AXIOS_BASE_URL}/posts/create`, null, {
        params: { title, description, author },
      })
      .then((response) => {
        if (response.status === 200) {
          onUpdatePosts();
        }
      })
      .catch((error) => setError(error.response.data.error));
  }

  return (
    <div className="p-4 flex flex-col justify-center items-center h-screen">
      <input
        type="text"
        id="title"
        placeholder="Default title"
        className="block w-full p-2.5 text-xl text-gray-900 sm:text-md dark:bg-slate-800 dark:text-white !outline-none font-semibold"
      />
      <textarea
        id="description"
        rows={5}
        className="block resize-none p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white !outline-none"
        placeholder="Your minds..."
      />
      <input
        type="text"
        id="author"
        placeholder="John Doe"
        className="block w-full p-2.5 text-base text-gray-900 sm:text-md dark:bg-slate-800 dark:text-white !outline-none"
      />
      {error && (
        <div className="w-full dark:text-white text-sm text-center font-semibold mb-2 p-2.5 bg-rose-600 rounded-lg border-transparent">
          {error}
        </div>
      )}
      <button
        type="button"
        onClick={handleCreatePost}
        className="text-white font-semibold bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br  shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 rounded-lg text-sm px-5 py-2.5 text-center mt-2 mr-0 ml-auto"
      >
        Create new post
      </button>
    </div>
  );
}
