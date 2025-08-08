			
import Image from 'next/image';
import Link from 'next/link';


export default function HomePage() {
	return (
		<div className="min-h-screen bg-white flex flex-col">


			{/* Banner */}
			<div className="bg-[#FF5A5F] text-white text-center py-2 text-xs font-medium">
				Miss Kenya 2023 voting is now open! Cast your vote before June 30th
			</div>

			{/* Hero Section */}
			<section className="relative w-full h-[340px] md:h-[420px] flex items-center justify-center">
				<Image src="/hero-bg.jpg" alt="Miss Kenya Hero" fill priority className="object-cover object-center z-0" />
				<div className="absolute inset-0 bg-black bg-opacity-40 z-10" />
				<div className="relative z-20 text-center text-white px-4 max-w-2xl mx-auto">
					<h1 className="text-2xl md:text-4xl font-extrabold mb-4 drop-shadow-lg">Transparent Voting for Miss Kenya Pageants</h1>
					<p className="mb-6 text-base md:text-lg font-medium drop-shadow-lg">
						CrownVote brings integrity and excitement to pageant voting with our secure, real-time platform designed specifically for Kenya’s beauty pageants.
					</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<Link href="/signin">
							<button className="bg-[#FF5A5F] hover:bg-[#E31C5F] text-white px-6 py-3 rounded-lg font-bold text-base shadow">Vote Now</button>
						</Link>
						<Link href="/about">
							<button className="bg-white text-[#FF5A5F] hover:bg-[#FFD6D6] px-6 py-3 rounded-lg font-bold text-base shadow">Learn More</button>
						</Link>
					</div>
				</div>
			</section>



			{/* Why Choose CrownVote Section */}
			<section className="py-16 px-4 bg-white">
				<div className="max-w-2xl mx-auto text-center">
					<h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-4">Why Choose CrownVote?</h2>
					<p className="text-gray-700 mb-10">Our platform revolutionizes pageant voting in Kenya with transparency, security, and engagement at its core.</p>
				</div>
				<div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
					{/* Real-Time Results */}
					<div className="flex flex-col items-center text-center">
						<span className="bg-[#FF5A5F] bg-opacity-10 rounded-full p-4 mb-4">
							<svg className="w-8 h-8 text-[#FF5A5F]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 3v18h18M9 17V9m4 8V5m4 12v-4" /></svg>
						</span>
						<h3 className="font-bold text-lg mb-2">Real-Time Results</h3>
						<p className="text-gray-600 text-sm">Watch voting happen live with our transparent counting system that updates in real-time, ensuring complete fairness.</p>
					</div>
					{/* Secure Voting */}
					<div className="flex flex-col items-center text-center">
						<span className="bg-[#FF5A5F] bg-opacity-10 rounded-full p-4 mb-4">
							<svg className="w-8 h-8 text-[#FF5A5F]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 11c0-1.657-1.343-3-3-3s-3 1.343-3 3v2a3 3 0 006 0v-2zm6 2v-2a6 6 0 10-12 0v2a6 6 0 0012 0z" /></svg>
						</span>
						<h3 className="font-bold text-lg mb-2">Secure Voting</h3>
						<p className="text-gray-600 text-sm">Our platform uses advanced security measures to prevent fraud and ensure each vote is legitimate and counted correctly.</p>
					</div>
					{/* Contestant Profiles */}
					<div className="flex flex-col items-center text-center">
						<span className="bg-[#FF5A5F] bg-opacity-10 rounded-full p-4 mb-4">
							<svg className="w-8 h-8 text-[#FF5A5F]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m9-5a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
						</span>
						<h3 className="font-bold text-lg mb-2">Contestant Profiles</h3>
						<p className="text-gray-600 text-sm">Get to know each contestant with detailed profiles, photos, and videos before casting your important vote.</p>
					</div>
				</div>
			</section>

			{/* How CrownVote Works Section */}
			<section className="py-16 px-4 bg-[#FFF3F0]">
				<div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
					{/* Left: Steps */}
					<div className="flex-1">
						<h2 className="text-3xl font-extrabold text-gray-900 mb-4">How CrownVote Works</h2>
						<p className="text-gray-700 mb-8">Our platform makes voting simple, secure, and transparent for pageant fans across Kenya.</p>
						<ol className="space-y-6">
							<li className="flex items-start gap-4">
								<span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#FF5A5F] text-white flex items-center justify-center font-bold text-lg">1</span>
								<div>
									<span className="font-bold">Create an Account</span>
									<p className="text-gray-600 text-sm">Sign up with your phone number for quick verification and secure access.</p>
								</div>
							</li>
							<li className="flex items-start gap-4">
								<span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#FF5A5F] text-white flex items-center justify-center font-bold text-lg">2</span>
								<div>
									<span className="font-bold">Browse Contestants</span>
									<p className="text-gray-600 text-sm">View detailed profiles of all contestants competing in the pageant.</p>
								</div>
							</li>
							<li className="flex items-start gap-4">
								<span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#FF5A5F] text-white flex items-center justify-center font-bold text-lg">3</span>
								<div>
									<span className="font-bold">Cast Your Vote</span>
									<p className="text-gray-600 text-sm">Vote for your favorite contestant securely through our platform.</p>
								</div>
							</li>
							<li className="flex items-start gap-4">
								<span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#FF5A5F] text-white flex items-center justify-center font-bold text-lg">4</span>
								<div>
									<span className="font-bold">Track Results</span>
									<p className="text-gray-600 text-sm">Watch real-time results as votes are tallied transparently.</p>
								</div>
							</li>
						</ol>
						<div className="mt-10">
							<Link href="/signin">
								<button className="bg-[#FF5A5F] hover:bg-[#E31C5F] text-white px-8 py-3 rounded-lg font-bold text-base shadow">Start Voting Now</button>
							</Link>
						</div>
					</div>
					{/* Right: Illustration */}
					<div className="flex-1 flex justify-center">
						<div className="relative w-[400px] h-[320px]">
							<Image src="/phone.png" alt="How CrownVote Works" fill className="object-contain rounded-xl shadow-lg" />
						</div>
					</div>
				</div>
			</section>
      {/* Current Miss Kenya Contestants Section */}
			<section className="py-16 px-4 bg-white">
				<div className="max-w-4xl mx-auto text-center mb-10">
					<h2 className="text-3xl font-extrabold text-gray-900 mb-2">Current Miss Kenya Contestants</h2>
					<p className="text-gray-600">Meet the beautiful and talented women competing for the crown this year.</p>
				</div>
				<div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
					{/* Contestant 1 */}
					<div className="flex flex-col items-center">
						<div className="w-full aspect-[3/4] rounded-xl overflow-hidden mb-4">
							<Image src="/miss2.jpg" alt="Amara Ochieng" width={300} height={400} className="object-cover w-full h-full" />
						</div>
						<div className="font-bold text-lg">Amara Ochieng</div>
						<div className="text-gray-500 text-sm mb-3">Nairobi County</div>
						<Link href="/signin">
							<button className="bg-[#FF5A5F] hover:bg-[#E31C5F] text-white px-8 py-2 rounded-lg font-bold text-base shadow">Vote Now</button>
						</Link>
					</div>
					{/* Contestant 2 */}
					<div className="flex flex-col items-center">
						<div className="w-full aspect-[3/4] rounded-xl overflow-hidden mb-4">
							<Image src="/miss4.jpg" alt="Zuri Wambui" width={300} height={400} className="object-cover w-full h-full" />
						</div>
						<div className="font-bold text-lg">Zuri Wambui</div>
						<div className="text-gray-500 text-sm mb-3">Mombasa County</div>
						<Link href="/signin">
							<button className="bg-[#FF5A5F] hover:bg-[#E31C5F] text-white px-8 py-2 rounded-lg font-bold text-base shadow">Vote Now</button>
						</Link>
					</div>
					{/* Contestant 3 */}
					<div className="flex flex-col items-center">
						<div className="w-full aspect-[3/4] rounded-xl overflow-hidden mb-4">
							<Image src="/miss5.jpg" alt="Nia Kimani" width={300} height={400} className="object-cover w-full h-full" />
						</div>
						<div className="font-bold text-lg">Nia Kimani</div>
						<div className="text-gray-500 text-sm mb-3">Kisumu County</div>
						<Link href="/signin">
							<button className="bg-[#FF5A5F] hover:bg-[#E31C5F] text-white px-8 py-2 rounded-lg font-bold text-base shadow">Vote Now</button>
						</Link>
					</div>
					{/* Contestant 4 */}
					<div className="flex flex-col items-center">
						<div className="w-full aspect-[3/4] rounded-xl overflow-hidden mb-4">
							<Image src="/miss6.jpg" alt="Imani Njeri" width={300} height={400} className="object-cover w-full h-full" />
						</div>
						<div className="font-bold text-lg">Imani Njeri</div>
						<div className="text-gray-500 text-sm mb-3">Nakuru County</div>
						<Link href="/signin">
							<button className="bg-[#FF5A5F] hover:bg-[#E31C5F] text-white px-8 py-2 rounded-lg font-bold text-base shadow">Vote Now</button>
						</Link>
					</div>
				</div>
				<div className="flex justify-center">
					<Link href="/polls">
						<button className="bg-gray-200 text-[#FF5A5F] px-10 py-3 rounded-lg font-bold text-base" style={{ cursor: 'pointer' }}>View All Contestants</button>
					</Link>
				</div>
			</section>
      {/* What People Are Saying Section */}
			<section className="py-16 px-4 bg-[#FFE3DD]">
				<div className="max-w-3xl mx-auto text-center mb-10">
					<h2 className="text-3xl font-extrabold text-gray-900 mb-2">What People Are Saying</h2>
					<p className="text-gray-700">Hear from pageant organizers, contestants, and voters who have experienced the CrownVote difference.</p>
				</div>
				<div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
					{/* Testimonial 1 */}
					<div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
						<Image src="/james-mwangi.jpg" alt="James Mwangi" width={64} height={64} className="rounded-full mb-3 object-cover" />
						<div className="font-bold text-lg">James Mwangi</div>
						<div className="text-gray-500 text-sm mb-3">Miss Nairobi Organizer</div>
						<p className="text-gray-700 text-sm mb-4">"CrownVote has transformed how we run our pageant voting. The transparency has eliminated controversies, and engagement has increased by 300% since we started using the platform."</p>
						<div className="flex gap-1">
							<span className="text-[#FF5A5F] text-xl">★</span>
							<span className="text-[#FF5A5F] text-xl">★</span>
							<span className="text-[#FF5A5F] text-xl">★</span>
							<span className="text-[#FF5A5F] text-xl">★</span>
							<span className="text-[#FF5A5F] text-xl">★</span>
						</div>
					</div>
					{/* Testimonial 2 */}
					<div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
						<Image src="/aisha-mohamed.jpg" alt="Sophia Akinyi" width={64} height={64} className="rounded-full mb-3 object-cover" />
						<div className="font-bold text-lg">Sophia Akinyi</div>
						<div className="text-gray-500 text-sm mb-3">Miss Kenya 2022</div>
						<p className="text-gray-700 text-sm mb-4">"Winning through CrownVote gave my victory legitimacy. The transparent voting process meant everyone could see the results in real-time, making my crowning moment even more special."</p>
						<div className="flex gap-1">
							<span className="text-[#FF5A5F] text-xl">★</span>
							<span className="text-[#FF5A5F] text-xl">★</span>
							<span className="text-[#FF5A5F] text-xl">★</span>
							<span className="text-[#FF5A5F] text-xl">★</span>
							<span className="text-[#FF5A5F] text-xl">★</span>
						</div>
					</div>
					{/* Testimonial 3 */}
					<div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
						<Image src="/daniel-ochieng.JPG" alt="Daniel Omondi" width={64} height={64} className="rounded-full mb-3 object-cover" />
						<div className="font-bold text-lg">Daniel Omondi</div>
						<div className="text-gray-500 text-sm mb-3">Pageant Voter</div>
						<p className="text-gray-700 text-sm mb-4">"I love being able to vote for my favorite contestants and see the results instantly. The contestant profiles helped me make informed decisions about who truly deserved my vote."</p>
						<div className="flex gap-1">
							<span className="text-[#FF5A5F] text-xl">★</span>
							<span className="text-[#FF5A5F] text-xl">★</span>
							<span className="text-[#FF5A5F] text-xl">★</span>
							<span className="text-[#FF5A5F] text-xl">★</span>
							<span className="text-[#FF5A5F] text-xl">★</span>
						</div>
					</div>
				</div>
			</section>
      {/* Latest News & Updates Section */}
			<section className="py-16 px-4 bg-white">
				<div className="max-w-3xl mx-auto text-center mb-10">
					<h2 className="text-3xl font-extrabold text-gray-900 mb-2">Latest News & Updates</h2>
					<p className="text-gray-700">Stay informed about pageant events, voting dates, and contestant highlights.</p>
				</div>
				<div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
					{/* News 1 */}
					<div className="bg-white rounded-xl shadow p-0 flex flex-col">
						<div className="w-full h-48 rounded-t-xl overflow-hidden">
							<Image src="/miss10.jpg" alt="Miss Kenya 2023 Talent Showcase Highlights" width={400} height={192} className="object-cover w-full h-full" />
						</div>
						<div className="p-6 flex-1 flex flex-col">
							<div className="text-[#FF5A5F] font-semibold text-sm mb-1">June 15, 2025</div>
							<div className="font-bold text-lg mb-2">Miss Kenya 2025 Talent Showcase Highlights</div>
							<div className="text-gray-600 text-sm mb-4 flex-1">The contestants amazed the audience with their diverse talents, from traditional dance to contemporary performances.</div>
							<a href="#" className="text-[#FF5A5F] font-bold text-sm flex items-center gap-1 hover:underline">Read More <span className="text-lg">→</span></a>
						</div>
					</div>
					{/* News 2 */}
					<div className="bg-white rounded-xl shadow p-0 flex flex-col">
						<div className="w-full h-48 rounded-t-xl overflow-hidden">
							<Image src="/miss11.jpg" alt="Behind the Scenes: Preparing for the Crown" width={400} height={192} className="object-cover w-full h-full" />
						</div>
						<div className="p-6 flex-1 flex flex-col">
							<div className="text-[#FF5A5F] font-semibold text-sm mb-1">June 10, 2025</div>
							<div className="font-bold text-lg mb-2">Behind the Scenes: Preparing for the Crown</div>
							<div className="text-gray-600 text-sm mb-4 flex-1">Get an exclusive look at how contestants prepare for the biggest night of the pageant season.</div>
							<a href="#" className="text-[#FF5A5F] font-bold text-sm flex items-center gap-1 hover:underline">Read More <span className="text-lg">→</span></a>
						</div>
					</div>
					{/* News 3 */}
					<div className="bg-white rounded-xl shadow p-0 flex flex-col">
						<div className="w-full h-48 rounded-t-xl overflow-hidden">
							<Image src="/miss13.jpg" alt="CrownVote Launches Community Outreach Program" width={400} height={192} className="object-cover w-full h-full" />
						</div>
						<div className="p-6 flex-1 flex flex-col">
							<div className="text-[#FF5A5F] font-semibold text-sm mb-1">June 5, 2025</div>
							<div className="font-bold text-lg mb-2">CrownVote Launches Community Outreach Program</div>
							<div className="text-gray-600 text-sm mb-4 flex-1">Our team is visiting communities across Kenya to ensure everyone can participate in the voting process.</div>
							<a href="#" className="text-[#FF5A5F] font-bold text-sm flex items-center gap-1 hover:underline">Read More <span className="text-lg">→</span></a>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
      