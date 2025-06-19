const Header = () => {
  return (
    <header className="bg-white shadow p-4 flex justify-between items-center">
      <h2 className="text-xl font-semibold">Admin Dashboard</h2>
      <button className="text-sm bg-red-500 text-white px-3 py-1 rounded">Logout</button>
    </header>
  );
};

export default Header;
