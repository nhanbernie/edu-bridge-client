import Link from "next/link";
import "tailwindcss/tailwind.css"; // Ensure Tailwind CSS is imported

const AdminLayout: React.FC = ({ children }) => {
  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="flex items-center justify-between px-4 bg-white shadow-md">
        <div className="flex items-center">
          <img src="/logo.svg" alt="Logo" className="h-6 mr-2" />
          <h1 className="text-xl font-semibold m-0">EDUCATION.co</h1>
        </div>
        <div className="flex items-center">
          <button className="mr-4">
            <svg
              className="h-6 w-6 text-gray-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          <button className="mr-4">
            <svg
              className="h-6 w-6 text-gray-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9s-4-2-4-9a6 6 0 0012-4 6 6 0 006-6z" />
            </svg>
          </button>
          <div className="relative">
            <img src="/user-avatar.svg" alt="User Avatar" className="h-10 w-10 rounded-full" />
          </div>
        </div>
      </header>

      {/* Sider (Sidebar) */}
      <aside className="w-64 bg-white shadow-md hidden md:block">
        <nav className="p-4">
          <ul>
            <li className="mb-2">
              <Link
                href="/profile"
                className="flex items-center p-2 text-gray-600 hover:text-blue-500"
              >
                <svg
                  className="h-6 w-6 mr-2"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                Profile
              </Link>
            </li>
            {/* Add more menu items as needed */}
          </ul>
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-grow p-4 md:ml-64">{children}</main>
    </div>
  );
};

export default AdminLayout;
