'use client';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white py-8 px-2">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-5xl font-extrabold text-[#FF5A5F] text-center mb-4 mt-6">
          About CrownVote
        </h1>
        <p className="text-xl text-gray-700 text-center mb-10">
          Transforming pageant voting in Kenya with transparency, fairness, and
          digital innovation.
        </p>
        <div className="flex flex-col md:flex-row gap-10 items-start">
          {/* Left: Mission and Values */}
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Our Mission</h2>
            <p className="text-gray-700 mb-4">
              At CrownVote, we believe that beauty pageants should be judged with
              complete transparency and fairness. Our platform was created to
              revolutionize how votes are cast and counted in the Miss Kenya pageant
              ecosystem, ensuring that every voice is heard and every vote matters.
            </p>
            <p className="text-gray-700 mb-6">
              We're committed to eliminating bias and bringing integrity to the pageant
              voting process through our secure digital platform. By leveraging
              technology, we've created a system that is accessible to all Kenyans,
              regardless of their location.
            </p>
            {/* Values Card */}
            <div className="bg-[#FFE5E5] rounded-xl p-6 shadow mb-4">
              <h3 className="text-xl font-bold text-[#FF5A5F] mb-4 flex items-center">
                <span className="mr-2">Our Values</span>
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-[#FF5A5F] text-lg mr-2 mt-1">✔️</span>
                  <div>
                    <span className="font-semibold text-[#FF5A5F]">Transparency</span>
                    <div className="text-gray-700 text-sm">
                      We provide real-time results and open voting processes that anyone
                      can verify.
                    </div>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-[#FF5A5F] text-lg mr-2 mt-1">✔️</span>
                  <div>
                    <span className="font-semibold text-[#FF5A5F]">Fairness</span>
                    <div className="text-gray-700 text-sm">
                      Our system ensures equal opportunity for all contestants, free from
                      manipulation.
                    </div>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-[#FF5A5F] text-lg mr-2 mt-1">✔️</span>
                  <div>
                    <span className="font-semibold text-[#FF5A5F]">Innovation</span>
                    <div className="text-gray-700 text-sm">
                      We continuously improve our platform to enhance the voting
                      experience.
                    </div>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-[#FF5A5F] text-lg mr-2 mt-1">✔️</span>
                  <div>
                    <span className="font-semibold text-[#FF5A5F]">Inclusivity</span>
                    <div className="text-gray-700 text-sm">
                      We make pageant voting accessible to all Kenyans across the
                      country.
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          {/* Right: Image */}
          <div className="flex-1 flex justify-center items-start">
            <img
              src="/voting-kenya.jpg"
              alt="Voting Kenya"
              className="rounded-xl shadow-lg w-full max-w-md object-cover"
            />
          </div>
        </div>
        {/* Impact Section */}
        <div className="bg-[#FCFCFC] rounded-2xl shadow mt-12 p-8">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-900">
            Our Impact on Miss Kenya Pageants
          </h2>
          <div className="flex flex-col md:flex-row justify-center items-center gap-10 mb-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-extrabold text-[#FF5A5F] mb-1">250K+</div>
              <div className="text-gray-700 text-sm md:text-base">Votes cast through our platform</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-extrabold text-[#FF5A5F] mb-1">47</div>
              <div className="text-gray-700 text-sm md:text-base">Counties participating</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-extrabold text-[#FF5A5F] mb-1">5</div>
              <div className="text-gray-700 text-sm md:text-base">Years of transforming pageant voting</div>
            </div>
          </div>
          <hr className="my-6 border-gray-200" />
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Historical Impact</h3>
              <p className="text-gray-700 mb-2">
                When CrownVote launched in 2018, the Miss Kenya pageant was facing criticism over voting transparency. In our first year, we increased voter participation by 300% and restored public confidence in the results.
              </p>
              <p className="text-gray-700">
                Our platform has since become the gold standard for pageant voting across Kenya, with contestants and organizers alike praising the fairness and accessibility of our system.
              </p>
            </div>
            {/* Testimonial Card */}
            <div className="flex-1 bg-[#F7F7F7] rounded-xl shadow p-6">
              <div className="flex items-center mb-3">
                <img
                  src="/amina-wanjiku.jpg"
                  alt="Amina Wanjiku"
                  className="w-12 h-12 rounded-full object-cover mr-3 border-2 border-[#FF5A5F]"
                />
                <div>
                  <div className="font-semibold text-gray-900">Amina Wanjiku</div>
                  <div className="text-sm text-gray-500">Miss Kenya 2020</div>
                </div>
              </div>
              <div className="text-gray-700 italic text-sm">
                "CrownVote transformed my Miss Kenya experience. The transparent voting gave me confidence that my win was truly supported by Kenyans across the country. It's revolutionized how pageants operate."
              </div>
            </div>
          </div>
        </div>
        {/* Meet Our Team Section */}
        <div className="mt-16">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 text-gray-900">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {/* Team Member 1 */}
            <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-center">
              <img
                src="/james-mwangi.jpg"
                alt="James Mwangi"
                className="w-32 h-32 rounded-xl object-cover mb-4"
              />
              <div className="text-lg font-bold text-gray-900">James Mwangi</div>
              <div className="text-sm text-[#FF5A5F] font-semibold mb-2">CEO &amp; Founder</div>
              <p className="text-gray-700 text-sm text-center mb-3">
                Former pageant organizer with a vision to bring transparency to the industry through technology.
              </p>
              <div className="flex gap-3">
                <a href="#" aria-label="LinkedIn" className="text-gray-400 hover:text-[#FF5A5F]"><i className="fab fa-linkedin"></i></a>
                <a href="#" aria-label="Twitter" className="text-gray-400 hover:text-[#FF5A5F]"><i className="fab fa-twitter"></i></a>
              </div>
            </div>
            {/* Team Member 2 */}
            <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-center">
              <img
                src="/wanjiku-njeri.jpg"
                alt="Wanjiku Njeri"
                className="w-32 h-32 rounded-xl object-cover mb-4"
              />
              <div className="text-lg font-bold text-gray-900">Wanjiku Njeri</div>
              <div className="text-sm text-[#FF5A5F] font-semibold mb-2">CTO</div>
              <p className="text-gray-700 text-sm text-center mb-3">
                Tech innovator with expertise in building secure voting systems and real-time analytics platforms.
              </p>
              <div className="flex gap-3">
                <a href="#" aria-label="GitHub" className="text-gray-400 hover:text-[#FF5A5F]"><i className="fab fa-github"></i></a>
              </div>
            </div>
            {/* Team Member 3 */}
            <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-center">
              <img
                src="/daniel-ochieng.jpg"
                alt="Daniel Ochieng"
                className="w-32 h-32 rounded-xl object-cover mb-4"
              />
              <div className="text-lg font-bold text-gray-900">Daniel Ochieng</div>
              <div className="text-sm text-[#FF5A5F] font-semibold mb-2">Marketing Director</div>
              <p className="text-gray-700 text-sm text-center mb-3">
                Digital marketing specialist focused on expanding CrownVote’s reach across all Kenyan counties.
              </p>
              <div className="flex gap-3">
                <a href="#" aria-label="LinkedIn" className="text-gray-400 hover:text-[#FF5A5F]"><i className="fab fa-linkedin"></i></a>
              </div>
            </div>
            {/* Team Member 4 */}
            <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-center">
              <img
                src="/aisha-mohamed.jpg"
                alt="Aisha Mohamed"
                className="w-32 h-32 rounded-xl object-cover mb-4"
              />
              <div className="text-lg font-bold text-gray-900">Aisha Mohamed</div>
              <div className="text-sm text-[#FF5A5F] font-semibold mb-2">Community Manager</div>
              <p className="text-gray-700 text-sm text-center mb-3">
                Former Miss Mombasa who now bridges the gap between pageant contestants and the voting platform.
              </p>
              <div className="flex gap-3">
                <a href="#" aria-label="Instagram" className="text-gray-400 hover:text-[#FF5A5F]"><i className="fab fa-instagram"></i></a>
              </div>
            </div>
          </div>
        </div>

        {/* Vision for the Future Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">Our Vision for the Future</h2>
            <p className="text-gray-700 mb-4">
              CrownVote is committed to expanding our platform across all pageant ecosystems in Kenya. We envision a future where every beauty competition in the country—from local county pageants to national events—utilizes our transparent voting technology.
            </p>
            <p className="text-gray-700 mb-4">
              <span className="font-semibold">By 2025, we aim to:</span>
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li className="flex items-start"><span className="text-[#FF5A5F] mr-2">➔</span>Partner with all 47 county pageants to create a unified voting experience</li>
              <li className="flex items-start"><span className="text-[#FF5A5F] mr-2">➔</span>Launch a mobile app to further increase accessibility for voters</li>
              <li className="flex items-start"><span className="text-[#FF5A5F] mr-2">➔</span>Introduce AI-powered analytics to help contestants improve their performance</li>
              <li className="flex items-start"><span className="text-[#FF5A5F] mr-2">➔</span>Expand to neighboring East African countries, starting with Uganda and Tanzania</li>
            </ul>
          </div>
          <div className="flex justify-center">
            <img
              src="/africa-map.png"
              alt="Africa Map"
              className="rounded-2xl shadow-lg w-full max-w-xs object-cover"
            />
          </div>
        </div>

        {/* Join Our Journey & Digital Engagement Commitment */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Join Our Journey Card */}
          <div className="bg-[#FFE5E5] rounded-xl p-6 shadow flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold text-[#FF5A5F] mb-2">Join Our Journey</h3>
              <p className="text-gray-700 mb-4">
                We're always looking for partners, investors, and team members who share our vision for transparent pageant voting.
              </p>
            </div>
            <a
              href="/contact"
              className="text-[#FF5A5F] font-semibold hover:underline mt-2"
            >
              Contact Us
            </a>
          </div>
          {/* Digital Engagement Commitment */}
          <div className="bg-white rounded-xl p-6 shadow">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Our Digital Engagement Commitment</h3>
            <p className="text-gray-700 mb-4">
              CrownVote is dedicated to creating an engaging digital experience that connects pageant contestants with voters across Kenya. We leverage technology to:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <span className="text-[#FF5A5F] text-2xl mt-1">📱</span>
                <div>
                  <div className="font-semibold text-gray-900">Mobile Accessibility</div>
                  <div className="text-gray-700 text-sm">Optimized for all devices to ensure everyone can vote</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#FF5A5F] text-2xl mt-1">⏱️</span>
                <div>
                  <div className="font-semibold text-gray-900">Real-time Results</div>
                  <div className="text-gray-700 text-sm">Live updates keep audiences engaged throughout the competition</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#FF5A5F] text-2xl mt-1">🛡️</span>
                <div>
                  <div className="font-semibold text-gray-900">Secure Voting</div>
                  <div className="text-gray-700 text-sm">Advanced security measures prevent fraud and ensure integrity</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#FF5A5F] text-2xl mt-1">🤝</span>
                <div>
                  <div className="font-semibold text-gray-900">Community Building</div>
                  <div className="text-gray-700 text-sm">Creating connections between contestants and supporters</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-5xl mx-auto mt-16 mb-12">
          <div className="bg-[#FCFCFC] rounded-2xl shadow p-8">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-900">
              Frequently Asked Questions
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <div className="mb-6">
                  <div className="font-semibold text-gray-900 mb-1">How do I vote in the Miss Kenya pageant?</div>
                  <div className="text-gray-700 text-sm">
                    To vote, create an account on CrownVote, navigate to the active polls section, and follow the instructions to cast your vote for your favorite contestant.
                  </div>
                </div>
                <div className="mb-6">
                  <div className="font-semibold text-gray-900 mb-1">How can I become a contestant?</div>
                  <div className="text-gray-700 text-sm">
                    For information about becoming a contestant, please contact the Miss Kenya organization directly at contestants@misskenya.co.ke.
                  </div>
                </div>
                <div className="mb-6">
                  <div className="font-semibold text-gray-900 mb-1">Can I change my vote after submitting?</div>
                  <div className="text-gray-700 text-sm">
                    No, once your vote is submitted, it cannot be changed. Please review your selection carefully before confirming your vote.
                  </div>
                </div>
              </div>
              <div>
                <div className="mb-6">
                  <div className="font-semibold text-gray-900 mb-1">Can I vote multiple times?</div>
                  <div className="text-gray-700 text-sm">
                    Our voting system allows one vote per registered user per day. This ensures fairness while still allowing supporters to show continued support.
                  </div>
                </div>
                <div className="mb-6">
                  <div className="font-semibold text-gray-900 mb-1">How quickly will I receive a response to my inquiry?</div>
                  <div className="text-gray-700 text-sm">
                    We aim to respond to all inquiries within 24-48 hours during business days. For urgent matters, please call our support line.
                  </div>
                </div>
                <div className="mb-6">
                  <div className="font-semibold text-gray-900 mb-1">Is CrownVote free to use?</div>
                  <div className="text-gray-700 text-sm">
                    Yes, CrownVote is free for all voters and contestants. Our mission is to make pageant voting accessible and transparent for everyone.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Our Location Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 text-gray-900">
            Our Location
          </h2>
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <iframe
              title="CrownVote Office Location"
              src="https://www.google.com/maps/place/Westlands+Business+Park/@-1.2692028,36.8073297,17z/data=!3m1!4b1!4m6!3m5!1s0x182f173bc3ef9e25:0xf27a160c394bcdee!8m2!3d-1.2692028!4d36.8099046!16s%2Fg%2F11gg6zv3z8?entry=ttu&g_ep=EgoyMDI1MDgwMy4wIKXMDSoASAFQAw%3D%3D"
              width="100%"
              height="350"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">
            Ready to Experience CrownVote?
          </h2>
          <a
            href="/contact"
            className="text-[#FF5A5F] font-semibold hover:underline text-lg"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
}
