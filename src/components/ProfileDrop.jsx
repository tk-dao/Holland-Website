import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

export default function ProfileDrop({
  name = "Guest",
  photoUrl = "/media/guest_profile.jpg",
  className = "",
}) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const onLogout = async (e) => {
    e.preventDefault();
    try {
      await logout();
    } finally {
      navigate("/login", { replace: true });
    }
  };
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Name is plain text OUTSIDE the dropdown trigger */}
      <span className="hidden sm:inline text-[18px]">{name}</span>

      {/* Dropdown: ONLY the avatar is the trigger */}
      <div className="dropdown dropdown-end">
        <button
          tabIndex={0}
          type="button"
          aria-haspopup="menu"
          aria-label="Open profile menu"
          className="btn btn-ghost btn-circle p-0 h-12 w-12"
        >
          <img
            src={photoUrl}
            className="rounded-full object-cover"
            loading="lazy"
          />
        </button>

        <ul
          tabIndex={0}
          role="menu"
          className="menu dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow z-[60px]"
        >
          <li>
            <Link role="menuitem" to="/profile">
              Profile
            </Link>
          </li>
          <li>
            <Link role="menuitem" to="/settings">
              Settings
            </Link>
          </li>
          <li>
            <button type="button" role="menuitem" onClick={onLogout}>
              Log out ⏎
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
