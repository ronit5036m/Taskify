import { Facebook, Github, Instagram, Mail, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="w-full border-t border-t-zinc-300 bg-white text-gray-600">
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col sm:flex-row justify-between items-center text-sm">
        <p className="text-center sm:text-left font-medium">
          © {new Date().getFullYear()}{" "}
          <span className="text-blue-600 font-semibold z-0">Taskify</span>. All
          rights reserved.
        </p>

        <div className="mt-2 sm:mt-0 flex gap-4">
          <Link className="hover:text-blue-500 transition-colors">
            <Facebook size={18} />
          </Link>
          <Link className="hover:text-blue-500 transition-colors">
            <Instagram size={18} />
          </Link>
          <Link className="hover:text-blue-500 transition-colors">
            <Twitter size={18} />
          </Link>
        </div>
      </div>
    </footer>
  );
}
