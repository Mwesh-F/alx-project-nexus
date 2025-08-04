import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="w-full py-4 px-6 bg-primary text-white shadow-md flex justify-between items-center">
      <Link href="/" className="text-xl font-bold">CrownVote</Link>
      <ul className="flex gap-6 text-sm font-medium">
        <li><Link href="/">Home</Link></li>
        <li><Link href="/vote">Vote</Link></li>
        <li><Link href="/results">Results</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
