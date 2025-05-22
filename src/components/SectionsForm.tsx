import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { useAuthStore } from "../store/auth";

interface Student {
  id: string;
  name: string;
  email: string;
}

interface Section {
  id: string;
  name: string;
  students: Student[];
}

export default function SectionsForm() {
  const token = useAuthStore((state) => state.token);
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSections = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/v1/section`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (!res.ok) throw new Error("Failed to fetch sections");
        const data = await res.json();
        setSections(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchSections();
  }, [token]);

  return (
    <Card className="p-6 mt-6 bg-purple-900 text-white">
      <h2 className="font-semibold text-xl mb-4">Sections</h2>
      {loading && <div>Loading...</div>}
      {error && <div className="text-red-400">{error}</div>}
      {!loading && !error && sections.length === 0 && (
        <div>No sections found.</div>
      )}
      {!loading && !error && sections.length > 0 && (
        <div>
          {sections.map((section) => (
            <details key={section.id} className="mb-4 bg-purple-800 rounded">
              <summary className="cursor-pointer px-2 py-1 font-semibold">
                {section.name}
              </summary>
              <ul className="ml-6 mt-2">
                {section.students && section.students.length > 0 ? (
                  section.students.map((student) => (
                    <li key={student.id} className="py-1">
                      {student.name}{" "}
                      <span className="text-gray-300">({student.email})</span>
                    </li>
                  ))
                ) : (
                  <li className="text-gray-400">
                    No students in this section.
                  </li>
                )}
              </ul>
            </details>
          ))}
        </div>
      )}
    </Card>
  );
}
