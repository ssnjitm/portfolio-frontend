import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const { pathname } = useLocation();

  const navItems = [
    { name: "Dashboard", path: "/admin" },
    { name: "Projects", path: "/admin/projects" },
    { name: "Skills", path: "/admin/skills" },
    { name: "Experience", path: "/admin/experience" },
    { name: "Contact", path: "/admin/contacts" },
  ];

  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>
      <ul className="space-y-3">
        {navItems.map(item => (
          <li key={item.name}>
            <Link
              to={item.path}
              className={`block px-4 py-2 rounded hover:bg-gray-700 ${
                pathname === item.path ? "bg-gray-700" : ""
              }`}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
