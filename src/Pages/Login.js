export default function Login() {
    return (
<div class="flex h-screen flex-col justify-center px-6 py-12 lg:px-8 bg-neutral-100">
  <div class="sm:mx-auto sm:w-full sm:max-w-sm bg-white px-8 pb-6 border border-gray-300 rounded-xl">
    {/* <img class="mx-auto h-10 w-auto" src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" /> */}
    <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>

  <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form class="space-y-6" action="#" method="POST">
      <div>
        <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
        <div class="mt-2">
          <input id="email" name="email" type="email" autocomplete="email" required class="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-zinc-400 sm:text-sm sm:leading-6" />
        </div>
      </div>

      <div>
        <div class="mt-2">
          <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
        </div>
        <div class="mt-2">
          <input id="password" name="password" type="password" autocomplete="current-password" required class="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-zinc-400 sm:text-sm sm:leading-6" />
          <div class="text-sm mt-3">
            <a href="#" class="font-semibold text-indigo-500 hover:text-indigo-400">Forgot password?</a>
          </div>
        </div>
      </div>

      <div>
        <button type="submit" class="flex w-full justify-center rounded-md bg-zinc-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-zinc-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:bg-zinc-600">Sign in</button>
      </div>
    </form>
  </div>
  </div>
  </div>
    )
}