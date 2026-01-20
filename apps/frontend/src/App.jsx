import { useState, useEffect } from "react";
import { DataTable } from "@/components/datatable/data-table";
import { SectionCards } from "@/components/section-cards";
import { SiteHeader } from "@/components/site-header";
import { Toaster } from "sonner";
import {
  getCandidates,
  saveCandidate,
  deleteCandidate,
} from "@/api/candidates";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCandidates()
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  const onSave = async (payload) => {
    const saved = await saveCandidate(payload);
    setData((prev) => {
      const exists = prev.find((d) => d.id === saved.id);
      if (exists) return prev.map((d) => (d.id === saved.id ? saved : d));
      return [saved, ...prev];
    });
  };

  const onDelete = async (id) => {
    await deleteCandidate(id);
    setData((prev) => prev.filter((d) => d.id !== id));
  };

  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader />
      <div className="@container/main flex flex-1 flex-col gap-2">
        <Toaster position="top-right" />
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <SectionCards data={data} loading={loading} />
          <DataTable
            data={data}
            loading={loading}
            onSave={onSave}
            onDelete={onDelete}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
