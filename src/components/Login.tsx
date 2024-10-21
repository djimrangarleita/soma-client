export default function Login() {
  return (
    <div className="flex items-center justify-center">
      <form className="bg-white shadow-lg rounded-lg px-8 pt-8 pb-10 mb-4 w-full">
        <div className="flex justify-center mb-4">
          <img
            src="https://images.unsplash.com/photo-1633410189542-36d96e3762b8?q=80&w=1760&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Company Logo"
            className="w-36"
          />
        </div>

        <h2 className="text-center text-2xl font-bold text-gray-800 mb-4">
          Welcome Back!
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Please enter your credentials to access your account.
        </p>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-blue-200"
            id="email"
            type="email"
            placeholder="Email"
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-blue-200"
            id="password"
            type="password"
            placeholder="Password"
            required
          />
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="remember"
              className="mr-2 leading-tight"
            />
            <label className="text-gray-700 text-sm" htmlFor="remember">
              Remember Me
            </label>
          </div>
          <a
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            href="#"
          >
            Forgot Password?
          </a>
        </div>

        <div className="flex justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            type="submit"
          >
            Login
          </button>
        </div>

        <p className="text-center text-gray-600 text-xs mt-4">
          Don't have an account?{' '}
          <a href="/sign-up" className="text-blue-500 hover:underline">
            Sign Up
          </a>
        </p>
      </form>
    </div>
  )
}
