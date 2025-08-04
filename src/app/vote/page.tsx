// src/app/vote/page.tsx
export default function VotePage() {
  return (
    <main className="p-4 max-w-3xl mx-auto">
      <h1 className="text-3xl font-semibold mb-4">Vote for Your Favorite Topic</h1>
      <p className="text-gray-700 mb-6">
        Help us understand what topics matter most to you. Select one or more topics from the list below and submit your vote.
      </p>

      <form className="space-y-4">
        <fieldset className="space-y-2">
          <legend className="text-lg font-medium text-gray-800">Topics</legend>
          <div>
            <input type="checkbox" id="html" name="topics" value="html" className="mr-2" />
            <label htmlFor="html">HTML & CSS</label>
          </div>
          <div>
            <input type="checkbox" id="javascript" name="topics" value="javascript" className="mr-2" />
            <label htmlFor="javascript">JavaScript</label>
          </div>
          <div>
            <input type="checkbox" id="react" name="topics" value="react" className="mr-2" />
            <label htmlFor="react">React</label>
          </div>
          <div>
            <input type="checkbox" id="nextjs" name="topics" value="nextjs" className="mr-2" />
            <label htmlFor="nextjs">Next.js</label>
          </div>
          <div>
            <input type="checkbox" id="tailwind" name="topics" value="tailwind" className="mr-2" />
            <label htmlFor="tailwind">Tailwind CSS</label>
          </div>
        </fieldset>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit Vote
        </button>
      </form>
    </main>
  );
}
