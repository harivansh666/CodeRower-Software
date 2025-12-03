import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function TaskTwo() {
  const [configId, setConfigId] = useState("");
  const [remark, setRemark] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!configId.trim()) return toast.error("Config ID missing");
    if (!remark.trim()) return toast.error("Remark missing");

    setLoading(true);
    setSuccessMsg("");

    try {
      const res = await axios.put(
        `https://code-rower-software.vercel.app/api/configurations/${configId}`,
        { remark: remark.trim() }
      );

      if (res.data.success) {
        toast.success("Remark updated!");
        setSuccessMsg(`Updated config: ${configId}`);
        setRemark("");
      }
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to update");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center mb-6">Update Remark</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* CONFIG ID */}
          <div>
            <label className="font-semibold">Config ID</label>
            <input
              type="text"
              value={configId}
              onChange={(e) => setConfigId(e.target.value)}
              placeholder="Enter configId..."
              className="w-full px-4 py-3 mt-1 border rounded-xl focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* REMARK */}
          <div>
            <label className="font-semibold">Remark</label>
            <textarea
              rows={4}
              value={remark}
              onChange={(e) => setRemark(e.target.value)}
              placeholder="Type remark..."
              className="w-full px-4 py-3 mt-1 border rounded-xl focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-600 text-black rounded-xl "
          >
            {loading ? "Updating..." : "Submit"}
          </button>
        </form>

        {/* SUCCESS MESSAGE */}
        {successMsg && (
          <div className="mt-6 bg-green-50 border border-green-300 p-4 rounded-xl text-center text-green-700 font-semibold">
            {successMsg}
          </div>
        )}

        <p className="text-center text-slate-500 text-sm mt-10">
          Use this : <spane className="text-red-600">qwertyuiop</spane>
        </p>
      </div>
    </div>
  );
}
