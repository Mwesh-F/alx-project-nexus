'use client';

import { useState } from 'react';

const PollsPage = () => {
  const question = 'Which is your favorite frontend framework?';
  const options = ['React', 'Vue', 'Angular', 'Svelte'];

  const [votes, setVotes] = useState(Array(options.length).fill(0));
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleVote = () => {
    if (selected === null) return;

    const newVotes = [...votes];
    newVotes[selected] += 1;
    setVotes(newVotes);
    setSubmitted(true);
  };

  return (
    <section className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">{question}</h1>

      {!submitted ? (
        <div className="space-y-4">
          {options.map((option, index) => (
            <label key={index} className="block cursor-pointer">
              <input
                type="radio"
                name="poll"
                value={index}
                checked={selected === index}
                onChange={() => setSelected(index)}
                className="mr-2"
              />
              {option}
            </label>
          ))}

          <button
            onClick={handleVote}
            disabled={selected === null}
            className="mt-4 bg-primary text-white px-6 py-2 rounded hover:bg-primary-dark disabled:opacity-50"
          >
            Submit Vote
          </button>
        </div>
      ) : (
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-center text-green-600">Thanks for voting!</h2>
          {options.map((option, index) => (
            <div key={index} className="flex justify-between items-center border-b py-1">
              <span>{option}</span>
              <span className="font-bold">{votes[index]} votes</span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default PollsPage;
