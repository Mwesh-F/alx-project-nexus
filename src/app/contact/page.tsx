// src/app/contact/page.tsx

const ContactPage = () => {
  return (
    <section className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4 text-center">Contact Us</h1>
      <p className="text-gray-700 mb-6 text-center">
        Have a question, suggestion, or feedback? We'd love to hear from you!
      </p>

      <form className="space-y-4">
        <div>
          <label className="block mb-1 font-semibold">Name</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring focus:border-blue-400"
            placeholder="Your full name"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Email</label>
          <input
            type="email"
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring focus:border-blue-400"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Message</label>
          <textarea
            rows={4}
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring focus:border-blue-400"
            placeholder="Type your message here..."
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-primary text-white px-6 py-2 rounded hover:bg-primary-dark transition duration-300"
        >
          Send Message
        </button>
      </form>
    </section>
  );
};

export default ContactPage;
