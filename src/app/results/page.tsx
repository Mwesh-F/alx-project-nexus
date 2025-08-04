const ResultsPage = () => {
  return (
    <section className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4 text-center">Live Results</h1>
      <p className="text-gray-600 mb-8 text-center">
        Track votes in real-time and see who’s leading in each category.
      </p>

      {/* Placeholder for results */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-4 border rounded shadow text-center">
          <p className="font-semibold mb-2">Contestant Name</p>
          <p className="text-lg font-bold text-blue-600">45%</p>
        </div>
      </div>
    </section>
  );
};

export default ResultsPage;
