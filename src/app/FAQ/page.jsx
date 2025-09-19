"use client"
import React from 'react'
import {useState} from 'react'

function page() {

const faqs = [
  {
    question: "How can I reset my password?",
    answer:
      "To reset your password, go to the login page, click on 'Forgot Password,' enter your email, and follow the link sent to reset your password.",
  },
  {
    question: "How do I update my billing information?",
    answer:
      "Go to your account settings, select 'Billing,' and update your credit card or payment method information.",
  },
  {
    question: "How can I contact customer support?",
    answer:
      "You can contact support via the 'Help Center' in your dashboard or by emailing support@yourdomain.com.",
  },
  {
    question: "How do I delete my account?",
    answer:
      "Navigate to account settings, scroll down to 'Delete Account,' and follow the confirmation steps.",
  },
];


  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <h2 className="text-4xl font-manrope text-center font-bold text-gray-900 leading-[3.25rem]">
            Frequently asked questions
          </h2>
        </div>

        <div className="accordion-group">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`accordion border border-solid border-gray-300 p-4 rounded-xl transition duration-500 ${
                openIndex === index
                  ? "bg-indigo-50 border-indigo-600"
                  : "bg-white"
              } mb-8 lg:p-4`}
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="accordion-toggle group inline-flex items-center justify-between text-left text-lg font-normal leading-8 text-gray-900 w-full transition duration-500 hover:text-indigo-600"
              >
                <h5>{faq.question}</h5>
                {openIndex === index ? (
                  // Minus icon
                  <svg
                    className="w-6 h-6 text-indigo-600"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M6 12H18"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  // Plus icon
                  <svg
                    className="w-6 h-6 text-gray-900 group-hover:text-indigo-600"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M6 12H18M12 18V6"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </button>

              {openIndex === index && (
                <div className="accordion-content mt-4">
                  <p className="text-base text-gray-900 font-normal leading-6">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

  


export default page
