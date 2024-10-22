export default function Components() {
  return (
    <>
      <br className="space-y-4" />
      <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md flex items-center gap-x-4">
        <button className="py-2 px-5 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-75">
          Save changes
        </button>
        <button className="border border-blue-500 text-blue-500 text-sm font-semibold px-5 py-2 rounded-md hover:border-transparent hover:bg-blue-500 hover:text-white flex items-center focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-75">
          Save changes
        </button>
      </div>
      <br className="space-y-4" />
      <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md flex items-center gap-x-4">
        <div className="shrink-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="fill-none size-10 stroke-slate-500 stroke-[1.5]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
            />
          </svg>
        </div>
        <div>
          <div className="text-xl font-medium text-black">ChitChat</div>
          <p className="text-slate-500">You have a new message!</p>
        </div>
      </div>
    </>
  )
}
