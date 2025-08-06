import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* CrownVote Brand Section */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h3 className="text-3xl font-bold text-white mb-4">CrownVote</h3>
              <p className="text-gray-300 leading-relaxed max-w-md">
                CrownVote is Kenya's premier digital polling platform where citizens can participate in democratic processes, voice their opinions, and engage in meaningful discussions about national issues. From local community polls to national surveys, CrownVote connects Kenyans with the power to influence change.
              </p>
            </div>
          </div>

          {/* Explore Section */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Explore</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/polls/national" className="text-gray-300 hover:text-white transition-colors duration-200">
                  National Polls
                </Link>
              </li>
              <li>
                <Link href="/polls/county" className="text-gray-300 hover:text-white transition-colors duration-200">
                  County Polls
                </Link>
              </li>
              <li>
                <Link href="/polls/community" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Community Polls
                </Link>
              </li>
              <li>
                <Link href="/results/trending" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Trending Results
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Section */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Company</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white transition-colors duration-200">
                  About us
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/community" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Community
                </Link>
              </li>
              <li>
                <Link href="/press" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Press
                </Link>
              </li>
            </ul>
          </div>

          {/* Help Section */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Help</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/support" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Support
                </Link>
              </li>
              <li>
                <Link href="/help/voting" className="text-gray-300 hover:text-white transition-colors duration-200">
                  How to Vote
                </Link>
              </li>
              <li>
                <Link href="/help/create-poll" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Create a Poll
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-300 hover:text-white transition-colors duration-200">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Democratic Participation Notice */}
        <div className="mt-8 pt-8 border-t border-gray-700">
          <p className="text-gray-300 text-sm">
            Your voice matters in Kenya's democratic process.{" "}
            <Link href="/about/democracy" className="text-blue-400 hover:text-blue-300 underline">
              Learn more about civic engagement
            </Link>
          </p>
        </div>

        {/* Bottom Footer Links */}
        <div className="mt-6 pt-6 border-t border-gray-700">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="flex flex-wrap gap-6 text-sm">
              <Link href="/terms" className="text-gray-300 hover:text-white transition-colors duration-200">
                Terms of Service
              </Link>
              <Link href="/privacy" className="text-gray-300 hover:text-white transition-colors duration-200">
                Privacy Policy
              </Link>
              <Link href="/cookies" className="text-gray-300 hover:text-white transition-colors duration-200">
                Cookies Policy
              </Link>
              <Link href="/partners" className="text-gray-300 hover:text-white transition-colors duration-200">
                Partners
              </Link>
            </div>
            <div className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} CrownVote Kenya. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
