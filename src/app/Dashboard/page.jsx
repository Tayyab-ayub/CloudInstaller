"use client"
import React, { useEffect } from 'react'

function Page() {

    
    return (
        <div id="app" className="min-h-screen bg-gray-50 text-gray-800">
            {/* Content */}
            <main id="content" className="max-w-5xl mx-auto px-6 py-10 space-y-12">
                {/* Dashboard heading + line */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">
                        Dashboard for TAYYAB AYUB
                    </h1>
                    <div className="w-full border-t border-gray-300 mt-2"></div>
                </div>

                {/* Profile section */}
                <section id="profile">
                    <h2 className="text-lg font-semibold mb-4 border-b border-black-300 pb-2">Profile</h2>
                    <table className="w-full text-sm overflow-hidden">
                        <tbody>
                            <tr className="border-b">
                                <td className="p-3 font-medium">Account owner</td>
                                {/* In JSX it must be colSpan not colspan */}
                                <td colSpan={2} className="p-3 text-gray-600">
                                    TAYYAB AYUB (ayubtayyab55@gmail.com)
                                </td>
                            </tr>
                            <tr className="border-b">
                                <td className="p-3 font-medium">Publisher name</td>
                                <td className="p-3">
                                    <input
                                        type="text"
                                        className="w-full border rounded px-2 py-1 focus:ring focus:ring-indigo-300"
                                    />
                                </td>
                                <td className="p-3 text-indigo-600 cursor-pointer">
                                    Change publisher name
                                </td>
                            </tr>
                            <tr className="border-b">
                                <td className="p-3 font-medium">Plan</td>
                                <td className="p-3">AppHost Free</td>
                                <td className="p-3">
                                    <a href="/my/plans" className="text-indigo-600 hover:underline">
                                        View / change plans
                                    </a>
                                </td>
                            </tr>
                            <tr>
                                <td className="p-3 font-medium">Private API Key</td>
                                <td className="p-3 text-gray-500">(disabled)</td>
                                <td className="p-3">
                                    <a href="#" className="text-indigo-600 hover:underline">
                                        Generate key
                                    </a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </section>

                {/* My Apps Section */}
                <section id="my-apps">
                    <h2 className="text-lg font-semibold mb-2 border-b border-black-300 pb-2">My Apps</h2>
                    <p className="text-gray-600 mb-4">
                        You don't have any apps! Click the button below to add one.
                    </p>
                    <table id="apps" className="w-full mb-4"></table>
                    <div className="flex items-center text-indigo-600 font-medium cursor-pointer space-x-2 hover:text-indigo-800">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 448 512">
                            <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c..."></path>
                        </svg>
                        <button type="button" className="text-white bg-violet-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Add a new plan
                            <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                            </svg>
                        </button>
                    </div>

                    <p className="mt-2 text-gray-600">
                        You are using 0 of your 5 allotted apps. To get more, explore our{" "}
                        <a href="/my/plans" className="text-indigo-600 hover:underline">
                            service plans
                        </a>.
                    </p>
                </section>

                {/* Usage Section */}
                <section id="usage">
                    <h2 className="text-lg font-semibold mb-2 border-b border-black-300 pb-2">Usage</h2>
                    <p className="text-gray-600">
                        This month, your apps have been downloaded 0 times out of your limit of 50. To
                        increase your limit, explore our{" "}
                        <a href="/my/plans" className="text-indigo-600 hover:underline">
                            service plans
                        </a>.
                    </p>
                    <p className="mt-2 text-gray-600">
                        Detailed, per-app statistics are available when you sign up for one of our service plans.
                    </p>
                </section>

                {/* Features Section */}
                <section id="features">
                    <h2 className="text-lg font-semibold mb-2 border-b border-black-300 pb-2">Features</h2>
                    <p className="text-gray-600 mb-4">
                        Would you be interested in any of these features? Let us know!
                    </p>
                    <ul className="space-y-2 mb-4">
                        <li className="flex items-center space-x-2">
                            <span>👍</span>
                            <span>Integration with app build tools and frameworks</span>
                        </li>
                        <li className="flex items-center space-x-2">
                            <span>👍</span>
                            <span>More download stats and analytics</span>
                        </li>
                        <li className="flex items-center space-x-2">
                            <span>👍</span>
                            <span>Single-use share links for extra security and per-user tracking</span>
                        </li>
                    </ul>

                    <p className="text-gray-600">
                        AppHost users already voted the following suggestions into features:
                    </p>
                    <ul className="list-disc pl-5 text-gray-700 mt-2 space-y-1">
                        <li>Upload API for command-line or automated app uploads</li>
                        <li>Maintain access to previous app versions</li>
                        <li>Current-version/update API that apps can use to see if there's a newer version available</li>
                    </ul>
                </section>

                {/* Support Section */}
                <section id="support">
                    <h2 className="text-lg font-semibold mb-2">Support</h2>
                    <p className="text-gray-600">
                        Want to change your password? Click{" "}
                        <a href="#" className="text-indigo-600 hover:underline">here</a>.
                    </p>
                    <p className="text-gray-600">
                        For help and account inquiries,{" "}
                        <a href="mailto:support@appho.st" className="text-indigo-600 hover:underline">
                            send us an email
                        </a>.
                    </p>
                </section>
            </main>
        </div>
    )
}

export default Page
