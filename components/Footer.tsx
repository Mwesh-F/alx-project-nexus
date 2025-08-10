import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#F5F5F5] pt-10 pb-2 px-4 mt-16 border-t border-gray-200">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 pb-6">
        {/* Brand & Social */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[#FF5A5F] text-2xl">{/* crown icon */}
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M3 17l3.5-7 5.5 7 5.5-7L21 17" stroke="#FF5A5F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="3.5" cy="10.5" r="1.5" fill="#FF5A5F"/><circle cx="12" cy="7" r="1.5" fill="#FF5A5F"/><circle cx="20.5" cy="10.5" r="1.5" fill="#FF5A5F"/></svg>
            </span>
            <span className="font-bold text-lg text-[#FF5A5F]">CrownVote</span>
          </div>
          <p className="text-gray-600 text-sm mb-4">Transparent voting platform for Miss Kenya Pageants. Empowering voters and organizers with real-time results.</p>
          <div className="flex gap-3 text-gray-500 text-xl">
            <a href="#" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
            <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
            <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
            <a href="#" aria-label="YouTube"><i className="fab fa-youtube"></i></a>
          </div>
        </div>
        {/* Quick Links */}
        <div>
          <div className="font-bold mb-2">Quick Links</div>
          <ul className="text-gray-700 text-sm space-y-1">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/polls">Vote Now</Link></li>
            <li><Link href="/results">Live Results</Link></li>
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>
        {/* Resources */}
        <div>
          <div className="font-bold mb-2">Resources</div>
          <ul className="text-gray-700 text-sm space-y-1">
            <li><Link href="#">How Voting Works</Link></li>
            <li><Link href="#">Pageant Calendar</Link></li>
            <li><Link href="#">Organizer Dashboard</Link></li>
            <li><Link href="#">FAQ</Link></li>
            <li><Link href="#">Support</Link></li>
          </ul>
        </div>
        {/* Contact & Legal */}
        <div>
          <div className="font-bold mb-2">Contact Us</div>
          <div className="text-gray-700 text-sm mb-2">Nairobi, Kenya</div>
          <div className="text-gray-700 text-sm mb-2">+254 712 345 678</div>
          <div className="text-gray-700 text-sm mb-4">info@crownvote.co.ke</div>
          <div className="font-bold mb-1">Legal</div>
          <ul className="text-gray-700 text-sm space-y-1">
            <li><Link href="#">Terms of Service</Link></li>
            <li><Link href="#">Privacy Policy</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-300 my-2" />
      <div className="text-center text-gray-500 text-xs pb-2">
        © 2025 CrownVote. All rights reserved. Empowering transparent pageant voting across Kenya.
      </div>
    </footer>
  );
}
