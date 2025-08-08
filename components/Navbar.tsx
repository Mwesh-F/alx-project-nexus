"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
	{ name: 'Home', href: '/' },
	{ name: 'Polls', href: '/polls' },
	{ name: 'Results', href: '/results' },
	{ name: 'About', href: '/about' },
	{ name: 'Contact', href: '/contact' },
];

export default function Navbar() {
	const pathname = usePathname();
	return (
		<nav className="bg-[#FF5A5F] h-14 px-6 w-full fixed top-0 left-0 z-50 bg-opacity-90 flex items-center">
			<div className="flex items-center w-full max-w-7xl mx-auto">
				{/* Logo */}
				<Link href="/" className="flex items-center mr-8 shrink-0">
					<img src="/logo.png" alt="CrownVote Logo" className="h-8 w-auto" />
				</Link>
				{/* Nav Items */}
				<ul className="flex flex-1 justify-start gap-8">
					{navItems.map((item) => (
						<li key={item.name}>
							<Link
								href={item.href}
								className={`text-white font-bold text-base px-2 py-1 transition-all duration-200 ${
									pathname === item.href ? 'underline underline-offset-4' : ''
								}`}
							>
								{item.name}
							</Link>
						</li>
					))}
				</ul>
				{/* Auth Buttons */}
				   <div className="flex gap-3 ml-auto">
					   <Link href="/polls">
						   <button className="bg-[#FF5A5F] text-white px-5 py-1.5 rounded font-semibold hover:bg-[#E31C5F] text-base shadow-sm">
							   Vote Now
						   </button>
					   </Link>
				   </div>
			</div>
		</nav>
	);
}
