import React from 'react'

function page() {
    const clients = [
  {
    img: "/icons/businessman.png",
    alt: "Client 1",
    name: "JAMES CORPUS ",
    description:
      "CloudInstaller helped us reduce deployment time by 60% and simplified app distribution across our teams.",
  },
  {
    img: "/icons/clerk-with-tie.png",
    alt: "Client 2",
    name: "DANIEL WALTER",
    description:
      "Thanks to CloudInstaller, our beta testing became seamless. No more sending APKs manually — everything is cloud-based now.",
  },
];
  return (

   <div className="pt- 5 relative isolate overflow-hidden bg-gray-900 py-16 sm:py-24 lg:py-32">
  <div className="mx-auto max-w-7xl px-6 lg:px-8">
    <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
      <div className="max-w-xl lg:max-w-lg">
        <h2 className="text-4xl font-semibold tracking-tight text-white">See What Our Users Say</h2>
        <p className="mt-4 text-lg text-gray-300">"Discover how teams simplify app installation and distribution with CloudInstaller."</p>
        <div className="mt-6 flex max-w-md gap-x-4">
          <label htmlFor="email-address" className="sr-only">Email address</label>
          <input id="email-address" type="email" name="email" required placeholder="Enter your email" autoComplete="email" className="min-w-0 flex-auto rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
          <button type="submit" className="flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Login</button>
        </div>
      </div>
     
       <dl className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:pt-2">
      {clients.map((client, index) => (
        <div key={index} className="flex flex-col items-start">
          <img
            src={client.img}
            alt={client.alt}
            className="w-16 h-16 rounded-md object-cover"
          />
          <dt className="mt-4 text-base font-semibold text-white">
            {client.name}
          </dt>
          <dd className="mt-2 text-base/7 text-gray-400">{client.description}</dd>
        </div>
      ))}
    </dl>
    </div>
  </div>
  <div aria-hidden="true" className="absolute top-0 left-1/2 -z-10 -translate-x-1/2 blur-3xl xl:-top-6">
    <div className ="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%) aspect-1155/678 w-288.75 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"></div>
  </div>
</div>

   
  )
}

export default page
