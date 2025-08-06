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
      </div>
    </div>
  );
}
