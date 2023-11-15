export default function PostDescription() {
  return (
    <div className="p-4 flex flex-col justify-center items-center h-screen">
      <input
        type="text"
        id="title"
        placeholder="Default title"
        className="block w-full p-2.5 text-xl text-gray-900 sm:text-md dark:bg-slate-800 dark:text-white !outline-none font-semibold"
      ></input>
      <textarea
        id="description"
        rows={5}
        className="block resize-none p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white !outline-none"
        placeholder="Your minds..."
      ></textarea>
      <input
        type="text"
        id="author"
        placeholder="John Doe"
        className="block w-full p-2.5 text-base text-gray-900 sm:text-md dark:bg-slate-800 dark:text-white !outline-none"
      ></input>
      <button
        type="button"
        className="text-white font-semibold bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br  shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 rounded-lg text-sm px-5 py-2.5 text-center mt-2 mr-0 ml-auto"
      >
        Create new post
      </button>
    </div>
  );
}
