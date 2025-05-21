import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { useAuthStore } from "../store/auth";

interface Student {
  id: string;
  name: string;
  email: string;
  section?: {
    id: string;
    name: string;
  };
}

export default function StudentsForm() {
  const token = useAuthStore((state) => state.token);
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStudents = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch("http://localhost:3000/api/v1/student", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to fetch students");
        const data = await res.json();
        setStudents(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, [token]);

  return (
    <Card className="p-6 mt-6 bg-purple-900 text-white">
      <h2 className="font-semibold text-xl mb-4">Students</h2>
      {loading && <div>Loading...</div>}
      {error && <div className="text-red-400">{error}</div>}
      {!loading && !error && students.length === 0 && (
        <div>No students found.</div>
      )}
      {!loading && !error && students.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th>Name</th>
                <th>Email</th>
                <th>Section</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id} className="border-b border-gray-200">
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.section ? student.section.name : "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
}