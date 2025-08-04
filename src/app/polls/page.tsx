const PollsPage = () => {
  return (
    <section className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4 text-center">Vote for Your Favorite Contestant</h1>
      <p className="text-gray-600 mb-8 text-center">
        Select your preferred contestant and cast your vote. One vote per category.
      </p>

      {/* Placeholder for voting cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* VotingCard component(s) will go here in future */}
        <div className="p-4 border rounded shadow text-center">
          <p className="font-semibold">Contestant Name</p>
          <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Vote
          </button>
        </div>
      </div>
    </section>
  );
};

export default PollsPage;
