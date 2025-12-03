import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { Link, Route, Routes } from "react-router-dom";
import TaskTwo from "./component/Tasktwo";

function App() {
  const [configId, setConfigId] = useState("");
  const [grid, setGrid] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!configId.trim()) return;

    setLoading(true);
    setGrid([]);

    try {
      const response = await axios.get(
        `https://code-rower-software.vercel.app/api/configurations/${configId}`
      );
      console.log(response.data);
      if (response.success === false) {
        toast.error("Configuration not found or server error");
      }

      setGrid(response.data.response.data);
    } catch (err) {
      toast.error("Failed to fetch config", err);
      setGrid([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="h-screen flex items-center justify-center flex-col p-6">
        <div>
          <h1 className="text-4xl font-bold text-center text-black mb-3 ">
            Fetch Config
          </h1>
          <p className="text-slate-600 text-lg">
            Load configuration grid by entering a config ID
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-black-200 p-8">
          <form onSubmit={handleSubmit}>
            <label
              htmlFor="configId"
              className="text-sm font-semibold text-slate-700 mb-2 gap-2"
            >
              Config To Load ( configId )
            </label>

            <input
              id="configId"
              type="text"
              value={configId}
              onChange={(e) => setConfigId(e.target.value)}
              placeholder="e.g. qwertyuiop"
              className="w-full p-3  text-lg border border-slate-300 rounded-xl"
              required
            />

            <button
              type="submit"
              disabled={loading || !configId.trim()}
              className="w-40 p-3 mt-1 bg-blue-800 text-white font-semibold text-lg rounded-xl"
            >
              {loading ? "Loading..." : "Submit"}
            </button>
          </form>

          {/* Display data */}
          <div className="w-60 p-4 bg-orange mt-1 rounded-md ">
            {grid.length > 0 &&
              grid.map((row, rowIndex) => (
                <div key={rowIndex}>
                  <h3>{row + " "}</h3>
                </div>
              ))}
          </div>

          {/* Instructions */}
          <div className="mt-6 p-5 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-sm text-slate-600 leading-relaxed">
              Click the "Submit" button and the configId will be fetched from{" "}
              <h2>http://localhost:8080/api/configurations/{"{id}"}</h2>
              <h2>
                https://code-rower-software.vercel.app/api/configurations/
                {"{id}"}
              </h2>
            </p>
          </div>

          <p className="text-center text-slate-500 text-sm mt-10">
            Use this : <spane className="text-red-600">qwertyuiop</spane>
          </p>
        </div>

        <Link
          to={"/task2"}
          className="w-28 h-12 font-bold text-center mt-4 rounded-md bg-green-400 text-white "
        >
          Update Remark
        </Link>

        <Routes>
          <Route path="/task2" element={<TaskTwo />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
