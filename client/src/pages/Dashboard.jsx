import { useEffect, useState } from "react";
import {
  addPeriod,
  getPeriods,
  deletePeriod,
  updatePeriod,
  getStats
} from "../api/period";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        startDate: "",
        endDate: "",
        notes: ""
    });

    const [periods, setPeriods] = useState([]);
    const [stats, setStats] = useState({});
    const [editingId, setEditingId] = useState(null);

    // ---------------- FETCH ----------------
    const fetchData = async () => {
        const p = await getPeriods();
        const s = await getStats();

        setPeriods(p.data);
        setStats(s.data);
    };

    useEffect(() => {
        fetchData();
    }, []);

    // ---------------- HANDLERS ----------------
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (editingId) {
        await updatePeriod(editingId, form);
        setEditingId(null);
        } else {
        await addPeriod(form);
        }

        setForm({ startDate: "", endDate: "", notes: "" });
        fetchData();
    };

    const handleDelete = async (id) => {
        await deletePeriod(id);
        fetchData();
    };

    const handleEdit = (p) => {
        setForm({
        startDate: p.startDate.split("T")[0],
        endDate: p.endDate.split("T")[0],
        notes: p.notes || ""
        });
        setEditingId(p._id);
    };

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    const formatDate = (d) =>
        new Date(d).toLocaleDateString();

    const nextDate = stats.nextPeriod
    ? new Date(stats.nextPeriod)
    : null;

    const currentCycleDay = periods.length > 0
    ? Math.ceil(
        (new Date() - new Date(periods[0].startDate)) /
        (1000 * 60 * 60 * 24)
        ) + 1
    : null;

    let phase = "";

    if (currentCycleDay >= 1 && currentCycleDay <= 5) {
    phase = "Menstrual 🩸";
    } else if (currentCycleDay >= 6 && currentCycleDay <= 13) {
    phase = "Follicular 🌱";
    } else if (currentCycleDay === 14) {
    phase = "Ovulation 🌼";
    } else if (currentCycleDay >= 15) {
    phase = "Luteal 🌙";
    }

    const daysLeft = nextDate
    ? Math.ceil((nextDate - new Date()) / (1000 * 60 * 60 * 24))
    : null;

    // ---------------- UI ----------------

    return (
    <div className="min-h-screen bg-rose-50">

        {/* NAVBAR */}
        <div className="flex justify-between items-center px-6 py-4 bg-white border-b">

        <div className="flex items-center gap-6">
            <h1 className="text-xl font-semibold text-rose-500">
                HerHygiene
            </h1>

            <div className="hidden md:flex gap-8 text-gray-600">
                <span className="text-rose-500 font-medium">Dashboard</span>
                <span onClick={() => navigate("/education")} className="cursor-pointer">Health Info</span>
                <span onClick={() => navigate("/stores")} className="cursor-pointer">Stores</span>
                <span onClick={() => navigate("/myths")} className="cursor-pointer">Myths</span>
            </div>
        </div>

        <div className="flex items-center gap-4">
             <div className="relative group">

            {/* Avatar */}
            <div className="w-8 h-8 bg-rose-100 text-rose-500 flex items-center justify-center rounded-full cursor-pointer">
                {(localStorage.getItem("name") || "U")[0].toUpperCase()}
            </div>

            {/* Hover Card */}
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-md p-3 opacity-0 group-hover:opacity-100 transition">

                <p className="text-sm font-semibold text-gray-800">
                {localStorage.getItem("name") || "User"}
                </p>

                <p className="text-sm text-gray-500">
                {localStorage.getItem("email") || "email@example.com"}
                </p>

            </div>

            </div>

          <button
            onClick={logout}
            className="border px-3 py-1 rounded text-gray-500"
          >
            Logout
          </button>
        </div>
      </div>

        {/* MAIN CONTENT */}
        <div className="p-6">

        {/* STATS */}
        <div className="grid md:grid-cols-4 gap-4 mb-6">

            <div className="bg-white rounded-xl border p-5">
                <p className="text-gray-500 text-sm">Cycle day</p>

                <h2 className="text-3xl font-bold text-rose-500">
                    {currentCycleDay || "N/A"}
                </h2>

                <p className="text-gray-400 text-sm">
                    of ~{stats.cycleLength || 28} days
                </p>

                {/* NEW PHASE */}
                <p className="text-sm text-rose-500 mt-2 font-medium">
                    {phase}
                </p>
            </div>

            <div className="bg-white rounded-xl border p-5">
                <p className="text-gray-500 text-sm">Next period in</p>
                <h2 className="text-3xl font-bold text-rose-500">
                {daysLeft || "N/A"}
                </h2>

                <p className="text-gray-400 text-sm">
                days • {nextDate ? nextDate.toDateString() : ""}
                </p>
            </div>

            <div className="bg-white rounded-xl border p-5">
                <p className="text-gray-500 text-sm">Last period</p>
                <h2 className="text-3xl font-bold text-rose-500">
                {periods[0]?.duration || 5}
                </h2>
                <p className="text-gray-400 text-sm">days</p>
            </div>

            <div className="bg-white rounded-xl border p-5">
                <p className="text-gray-500 text-sm">Avg cycle length</p>
                <h2 className="text-3xl font-bold text-rose-500">
                {stats.cycleLength || 28}
                </h2>
                <p className="text-gray-400 text-sm">days • regular</p>
            </div>
        </div>

        {/* PREDICTION CARD */}
        <div className="bg-rose-100 border border-rose-200 rounded-xl p-6 mb-6 flex justify-between items-center">

        <div>
            <p className="text-sm text-rose-500">
            Next predicted period
            </p>

            <h2 className="text-xl font-semibold text-gray-800">
            {nextDate ? nextDate.toDateString() : "N/A"}
            </h2>

            <p className="text-gray-500 text-sm">
            Based on your last cycles
            </p>
        </div>

        <div className="text-right">
            <h1 className="text-4xl font-bold text-rose-500">
            {daysLeft || "N/A"}
            </h1>
            <p className="text-gray-500 text-sm">days away</p>
        </div>

        </div>

        {/*  LAYOUT GRID */}
        <div className="grid md:grid-cols-2 gap-6">

          {/* LEFT SIDE → FORM */}
          <div className="bg-white p-6 rounded-xl border">

            <h2 className="text-lg font-semibold mb-4">
              Log a period
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">

            <div>
                <label className="text-sm text-gray-500">Start date</label>
                <input
                type="date"
                name="startDate"
                value={form.startDate}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 mt-1"
                />
            </div>

            <div>
                <label className="text-sm text-gray-500">End date</label>
                <input
                type="date"
                name="endDate"
                value={form.endDate}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 mt-1"
                />
            </div>

            <div>
                <label className="text-sm text-gray-500">Notes</label>
                <input
                name="notes"
                placeholder="e.g. mild cramps"
                value={form.notes}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 mt-1"
                />
            </div>

            <button className="w-full bg-rose-500 text-white py-3 rounded-lg">
                {editingId ? "Update period" : "Save period"}
            </button>

            </form>

          </div>

          {/* RIGHT SIDE → HISTORY */}
            <div className="bg-white p-6 rounded-xl border">

            <h2 className="text-lg font-semibold mb-4">
              Period History
            </h2>

            {periods.length === 0 ? (
              <p className="text-gray-400 text-center py-10">
                Start tracking your first period 🩸
              </p>
            ) : (
              periods.map((p) => (
            <div
                key={p._id}
                className="border rounded-lg p-4 mb-3 flex justify-between items-center"
            >

                <div>
                    <p className="text-gray-700">
                        {formatDate(p.startDate)} → {formatDate(p.endDate)}
                    </p>

                    {/* duration */}
                    <p className="text-sm text-gray-400">
                        {p.duration ? `${p.duration} days` : "-"}
                    </p>

                    {/* notes */}
                    {p.notes && (
                        <p className="text-sm text-gray-500 mt-1 italic">
                        {p.notes}
                        </p>
                    )}
                </div>

                <div className="flex gap-3 text-sm">
                <button
                    onClick={() => handleEdit(p)}
                    className="text-yellow-500"
                >
                    edit
                </button>

                <button
                    onClick={() => handleDelete(p._id)}
                    className="text-red-500"
                >
                    del
                </button>
                </div>

            </div>
            ))
            )}

          </div>

        </div>

      </div>
    </div>
  );
};

export default Dashboard;