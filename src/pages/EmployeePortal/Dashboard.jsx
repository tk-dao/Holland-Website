import Calendar from "../../components/Calendar";
import "cally";
import { useAuth } from "../../context/AuthProvider";

export default function Dashboard() {
  const { profile } = useAuth();
  const role = profile?.role ?? "employee";

  return (
    <div className="p-4 md:p-6">
      <header className="mb-4">
        <h1 className="text-2xl font-bold">
          Welcome {profile?.full_name ? `, ${profile.full_name}` : ""}.
        </h1>
        <p className="text-sm opacity-80">
          Here’s what needs your attention today.
        </p>
      </header>

      <div className="grid grid-cols-12 gap-4">
        {/* Row 1 */}
        {/* Tasks Card */}
        <Card title="My Tasks" className="col-span-12 lg:col-span-4">
          <ul className="menu bg-base-200 rounded-box">
            <li>
              <label className="label cursor-pointer">
                <input type="checkbox" className="checkbox" /> Review SOP update
              </label>
            </li>
            <li>
              <label className="label cursor-pointer">
                <input type="checkbox" className="checkbox" /> Close ticket
                #4821
              </label>
            </li>
            <li>
              <label className="label cursor-pointer">
                <input type="checkbox" className="checkbox" /> Camera note for
                OR-2
              </label>
            </li>
          </ul>
        </Card>

        <Card title="Placeholder" className="col-span-12 lg:col-span-4"></Card>
        {/* Calendar */}
        <div className="col-span-12 lg:col-span-4">
          <Calendar></Calendar>
        </div>
      </div>
    </div>
  );
}

function Card({ title, children, className = "" }) {
  return (
    <section className={`card bg-base-100 shadow-sm ${className}`}>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        {children}
      </div>
    </section>
  );
}
