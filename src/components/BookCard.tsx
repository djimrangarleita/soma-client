export default function BookCard() {
  return (
    <div className="w-full min-w-sm space-y-2 bg-white shadow-lg flex items-center gap-x-3">
      <img
        className="block w-24 sm:mx-0 sm:shrink-0 border"
        src="https://via.placeholder.com/720x960"
        alt="Book"
      />
      <div className="space-y-2 text-left">
        <div className="space-y-0.5">
          <h4 className="text-lg text-black font-semibold">Erin Lindford</h4>
          <p className="text-gray-700">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates
            iure voluptatem possimus quas, reprehenderit, at consequatur
            officiis perspiciatis, magnam in nobis natus consequuntur? Tempore
            quam doloremque mollitia quasi sed debitis.
          </p>
        </div>
      </div>
    </div>
  )
}
