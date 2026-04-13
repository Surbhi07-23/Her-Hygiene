import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  addPeriod,
  deletePeriod,
  getPeriods,
  updatePeriod
} from "../api/period";

import {
  FaCalendarAlt
} from "react-icons/fa";

import {
  IoReloadCircle
} from "react-icons/io5";

const Dashboard = () => {

  const navigate = useNavigate();

  // ---------------- FORM ----------------
  const [form, setForm] = useState({
    startDate: "",
    endDate: "",
    notes: ""
  });

  // ---------------- STATES ----------------
  const [periods, setPeriods] = useState([]);
  const [editingId, setEditingId] = useState(null);

  // ---------------- FETCH DATA ----------------
  const fetchData = async () => {

    try {

      const res = await getPeriods();

      const sorted = res.data.sort(
        (a, b) =>
          new Date(b.startDate) -
          new Date(a.startDate)
      );

      setPeriods(sorted);

    } catch (err) {

      console.log(err);

    }
  };

    useEffect(() => {
        fetchData();
    }, []);

  // ---------------- HANDLE CHANGE ----------------
  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // ---------------- HANDLE SUBMIT ----------------
     const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      if (editingId) {

        await updatePeriod(editingId, form);

        setEditingId(null);

      } else {

        await addPeriod(form);

      }

      setForm({
        startDate: "",
        endDate: "",
        notes: ""
      });

      fetchData();

    } catch (err) {

      console.log(err);

    }
    };

  // ---------------- DELETE ----------------
     const handleDelete = async (id) => {

    try {

      await deletePeriod(id);

      fetchData();

    } catch (err) {

      console.log(err);

    }
  };

  // ---------------- EDIT ----------------
    const handleEdit = (period) => {

    setEditingId(period._id);

    setForm({
      startDate: period.startDate?.slice(0, 10),
      endDate: period.endDate?.slice(0, 10),
      notes: period.notes || ""
    });
  };

  // ---------------- FORMAT DATE ----------------
    const formatDate = (date) => {
        return new Date(date).toLocaleDateString();
    };

  // ---------------- AVG CYCLE ----------------
    let averageCycle = 28;

    if (periods.length >= 2) {

        let total = 0;

        for (let i = 0; i < periods.length - 1; i++) {

        const current =
            new Date(periods[i].startDate);

        const next =
            new Date(periods[i + 1].startDate);

        const diff =
            Math.ceil(
            (current - next) /
            (1000 * 60 * 60 * 24)
            );

        total += diff;
        }

        averageCycle =
        Math.round(total / (periods.length - 1));
    }

  // ---------------- NEXT PERIOD ----------------
    let nextPeriodDate = "N/A";

    if (periods.length > 0) {

        const lastPeriod =
        new Date(periods[0].startDate);

        lastPeriod.setDate(
        lastPeriod.getDate() + averageCycle
        );

        nextPeriodDate =
        lastPeriod.toLocaleDateString('en-GB');
    }

  // ---------------- CURRENT CYCLE DAY ----------------
    const currentCycleDay =
    periods.length > 0
      ? Math.ceil(
          (new Date() -
            new Date(periods[0].startDate)) /
            (1000 * 60 * 60 * 24)
        ) + 1
      : null;

  // ---------------- PHASE ----------------
    let phase = "";

    if (currentCycleDay >= 1 && currentCycleDay <= 5) {

        phase = "Menstrual 🩸";

    } else if (
        currentCycleDay >= 6 &&
        currentCycleDay <= 13
    ) {

        phase = "Follicular 🌱";

    } else if (currentCycleDay === 14) {

        phase = "Ovulation 🌼";

    } else if (currentCycleDay >= 15) {

        phase = "Luteal 🌙";
    }

    return (

    <div className="min-h-screen bg-rose-50">

      {/* NAVBAR */}
      <nav className="bg-white shadow-sm px-8 py-5 flex justify-between items-center">

        <h1 className="text-3xl font-bold text-rose-500">
          HerHygiene
        </h1>

        <div className="flex items-center gap-8">

          <button
            onClick={() => navigate("/education")}
            className="text-gray-700 hover:text-rose-500 transition"
          >
            Health Info
          </button>

          <button
            onClick={() => navigate("/myths")}
            className="text-gray-700 hover:text-rose-500 transition"
          >
            Myths
          </button>

          <button
            onClick={() => navigate("/stores")}
            className="text-gray-700 hover:text-rose-500 transition"
          >
            Stores
          </button>

          {/* PROFILE */}
            <div className="relative group">

                <div className="w-10 h-10 bg-rose-100 text-rose-500 rounded-full flex items-center justify-center font-semibold cursor-pointer">

                {(localStorage.getItem("name") || "U")[0].toUpperCase()}

                </div>

            {/* HOVER CARD */}
            <div className="absolute right-0 mt-2 w-56 bg-white border rounded-2xl shadow-lg p-4 opacity-0 group-hover:opacity-100 transition duration-300 z-50">

              <p className="font-semibold">
                {localStorage.getItem("name") || "User"}
              </p>

              <p className="text-sm text-gray-500">
                {localStorage.getItem("email")}
              </p>

            </div>

          </div>

        </div>

      </nav>
      {/* HERO SECTION */}
        <div className="mx-8 mt-6 rounded-3xl bg-gradient-to-r from-pink-300 via-rose-200 to-pink-100 p-12 text-center shadow-sm">

            <h1 className="text-6xl font-bold text-white mb-4">

                Hello,
                {" "}
                {localStorage.getItem("name") || "User"}
                {" "}

            </h1>

            <p className="text-white/90 text-xl font-medium">

                Welcome back! Here's your menstrual cycle overview.

            </p>

        </div>

        {/* CONTENT */}
        <div className="p-8">

        {/* STATS */}
            <div className="grid md:grid-cols-3 gap-6 mt-8 mb-8">

          {/* CYCLE DAY */}
            <div className="flex items-center gap-5">

                <div className="w-20 h-20 rounded-full bg-pink-100 flex items-center justify-center">

                    <FaCalendarAlt className="text-pink-500 text-3xl" />

                </div>

                <div>

                    <p className="text-gray-500 text-sm">
                    Cycle Day
                    </p>

                    <h2 className="text-4xl font-bold text-pink-500 mt-1">
                    {currentCycleDay || "N/A"}
                    </h2>

                    <p className="text-sm text-pink-400 mt-2">
                    {phase}
                    </p>

                </div>

            </div>

          {/* AVG CYCLE */}
            <div className="flex items-center gap-5">

                <div className="w-20 h-20 rounded-full bg-purple-100 flex items-center justify-center">

                    <IoReloadCircle className="text-purple-500 text-4xl" />

                </div>

            <div>

                <p className="text-gray-500 text-sm">
                Average Cycle
                </p>

                <h2 className="text-4xl font-bold text-purple-500 mt-1">
                {averageCycle}
                </h2>

                <p className="text-sm text-gray-500 mt-2">
                days
                </p>

            </div>

            </div>

          {/* NEXT PERIOD */}
            <div className="flex items-center gap-5">

                <div className="w-20 h-20 rounded-full bg-orange-100 flex items-center justify-center">

                    <FaCalendarAlt className="text-orange-500 text-3xl" />

                </div>

                <div>

                    <p className="text-gray-500 text-sm">
                    Next Period
                    </p>

                    <h2 className="text-3xl font-bold text-orange-500 mt-1">
                    {nextPeriodDate}
                    </h2>

                </div>

            </div>
        </div>

        {/* FORM */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">

          <h2 className="text-2xl font-semibold text-gray-800 mb-5">

            {editingId
              ? "Update Period"
              : "Add Period"}

          </h2>

          <form
            onSubmit={handleSubmit}
            className="grid md:grid-cols-4 gap-4"
          >

            <input
              type="date"
              name="startDate"
              value={form.startDate}
              onChange={handleChange}
              required
              className="border p-3 rounded-xl"
            />

            <input
              type="date"
              name="endDate"
              value={form.endDate}
              onChange={handleChange}
              required
              className="border p-3 rounded-xl"
            />

            <input
              type="text"
              name="notes"
              placeholder="Notes"
              value={form.notes}
              onChange={handleChange}
              className="border p-3 rounded-xl"
            />

            <button className="bg-rose-500 hover:bg-rose-600 text-white rounded-xl p-3 transition">

              {editingId ? "Update" : "Add"}

            </button>

          </form>

        </div>

        {/* HISTORY */}
        <div>

          <h2 className="text-2xl font-semibold text-gray-800 mb-5">

            Period History

          </h2>

          <div className="space-y-4">

            {periods.map((p) => (

              <div
                key={p._id}
                className="bg-white rounded-2xl shadow-sm p-5 flex justify-between items-start"
              >

                <div>

                  <p className="font-medium text-gray-800">

                    {formatDate(p.startDate)}
                    {" "}→{" "}
                    {formatDate(p.endDate)}

                  </p>

                  <p className="text-sm text-gray-500 mt-1">

                    {p.duration
                      ? `${p.duration} days`
                      : "—"}

                  </p>

                  {p.notes && (

                    <p className="text-sm italic text-gray-500 mt-2">

                      {p.notes}

                    </p>

                  )}

                </div>

                <div className="flex gap-4">

                  <button
                    onClick={() => handleEdit(p)}
                    className="text-blue-500"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(p._id)}
                    className="text-red-500"
                  >
                    Delete
                  </button>

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>

    </div>
  );
};

export default Dashboard;