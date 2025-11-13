import { Outlet, NavLink, useLocation } from "react-router-dom";
import ProfileDrop from "../../components/ProfileDrop";
import { useAuth } from "../../context/AuthProvider";

export default function EmployeePortalLayout() {
  const { profile } = useAuth();

  //Sidebar Styles
  const base =
    "block w-full text-left px-3 py-2 rounded transition leading-snug whitespace-normal break-words";
  const activeLink = `${base} bg-base-300 font-semibold`;
  const inactiveLink = `${base} text-base-content/70 hover:bg-base-200`;
  const linkStyle = ({ isActive }) => (isActive ? activeLink : inactiveLink);

  //Topbar Styles
  const location = useLocation();
  const pageTitles = {
    "/portal/dashboard": "Dashboard",
    "/portal/chat": "Chat with Holland",
    "/portal/cameras": "Patient Rooms",
  };
  const currentTitle = pageTitles[location.pathname] || "Employee Portal";

  return (
    <div className="min-h-screen grid grid-cols-[220px_1fr] grid-rows-[56px_1fr]">
      {/* Sidebar */}
      <aside className="sticky row-span-2 bg-base-200 p-4">
        <div className="flex h-full flex-col">
          {/* Brand */}
          <div className="flex items-center gap-2 px-2 py-1">
            <img
              src="/media/UNMC_emblem.png"
              className="h-15 w-auto"
              alt="UNMC"
            />
            <span className="text-2xl font-display-lemonlight">UNMC</span>
          </div>

          {/* Nav */}
          <nav className="mt-4 space-y-2">
            <NavLink to="/portal/dashboard" className={linkStyle}>
              Dashboard
            </NavLink>
            <NavLink to="/portal/chat" className={linkStyle}>
              Holland
            </NavLink>
            <NavLink to="/portal/cameras" className={linkStyle}>
              Cameras
            </NavLink>
          </nav>

          {/* Help pinned to bottom */}
          <div className="mt-auto pt-4 border-t">
            <NavLink to="/help" className={linkStyle}>
              Help
            </NavLink>
          </div>
        </div>
      </aside>

      {/* Topbar */}
      <header className="sticky col-start-2 flex items-center justify-between px-4 border-b bg-base-200">
        <h1 className="font-semibold text-2xl">{currentTitle}</h1>
        {/* replace with dropdown later */}
        <ProfileDrop
          name={profile?.full_name ? `${profile.full_name}` : ""}
          photoUrl="/media/guest_profile.jpg"
          onLogout={() => {
            // TODO: wire to your auth (e.g., supabase.auth.signOut())
            console.log("Log out clicked");
          }}
        />
      </header>

      {/* Main content */}
      <main className="col-start-2 p-4 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
