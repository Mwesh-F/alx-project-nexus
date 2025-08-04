'use client';

import { useEffect, useState } from 'react';

// Sample poll data
const pollData = [
  {
    id: 'frontend',
    question: 'Which is your favorite frontend framework?',
    options: ['React', 'Vue', 'Angular', 'Svelte'],
  },
  {
    id: 'mobile',
    question: 'Which is your preferred mobile framework?',
    options: ['React Native', 'Flutter', 'Swift', 'Kotlin'],
  },
];

const PollsPage = () => {
  const [votes, setVotes] = useState<{ [key: string]: number[] }>({});
  const [selected, setSelected] = useState<{ [key: string]: number | null }>({});
  const [submittedPolls, setSubmittedPolls] = useState<string[]>([]);

  // Load votes and submissions from localStorage
  useEffect(() => {
    const storedVotes = localStorage.getItem('votes');
    const storedSubmitted = localStorage.getItem('submittedPolls');

    if (storedVotes) setVotes(JSON.parse(storedVotes));
    if (storedSubmitted) setSubmittedPolls(JSON.parse(storedSubmitted));
  }, []);

  // Save votes and submittedPolls to localStorage on change
  useEffect(() => {
    localStorage.setItem('votes', JSON.stringify(votes));
    localStorage.setItem('submittedPolls', JSON.stringify(submittedPolls));
  }, [votes, submittedPolls]);

  const handleVote = (pollId: string) => {
    const selectedIndex = selected[pollId];
    if (selectedIndex === null || selectedIndex === undefined) return;

    const pollVotes = votes[pollId] || Array(pollData.find(p => p.id === pollId)!.options.length).fill(0);
    const updatedVotes = [...pollVotes];
    updatedVotes[selectedIndex] += 1;

    setVotes(prev => ({ ...prev, [pollId]: updatedVotes }));
    setSubmittedPolls(prev => [...prev, pollId]);
  };

  const getTotalVotes = (arr: number[]) => arr.reduce((a, b) => a + b, 0);

  return (
    <section className="max-w-3xl mx-auto p-6 space-y-8">
      {pollData.map((poll) => {
        const isSubmitted = submittedPolls.includes(poll.id);
        const pollVotes = votes[poll.id] || Array(poll.options.length).fill(0);
        const total = getTotalVotes(pollVotes);

        return (
          <div key={poll.id} className="border p-4 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">{poll.question}</h2>

            {!isSubmitted ? (
              <div className="space-y-4">
                {poll.options.map((option, index) => (
                  <label key={index} className="block cursor-pointer">
                    <input
                      type="radio"
                      name={`poll-${poll.id}`}
                      checked={selected[poll.id] === index}
                      onChange={() =>
                        setSelected((prev) => ({
                          ...prev,
                          [poll.id]: index,
                        }))
                      }
                      className="mr-2"
                    />
                    {option}
                  </label>
                ))}
                <button
                  onClick={() => handleVote(poll.id)}
                  disabled={selected[poll.id] === null || selected[poll.id] === undefined}
                  className="mt-2 bg-primary text-white px-6 py-2 rounded hover:bg-primary-dark disabled:opacity-50"
                >
                  Submit Vote
