import { useEffect } from "react";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

export default function HelpFAQ() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Sulat-Suri | Help & FAQ";
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-600 to-purple-950 relative">
      {/* Back Button */}
      <button
        onClick={() => navigate("/dashboard")}
        className="absolute top-8 left-8 bg-white text-purple-700 px-4 py-2 rounded shadow hover:bg-purple-100 transition"
      >
        ← Back
      </button>
      <Card className="max-w-xl w-full p-8 bg-white text-purple-900 shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Help & FAQ</h1>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>How do I upload essays?</strong>
            <br />
            Go to the Dashboard, select the "Grading" tab, click "Upload Essays", and select your files. You can upload multiple essays at once.
          </li>
          <li>
            <strong>How do I upload a reference file?</strong>
            <br />
            In the "Grading" tab, use the "Upload Reference" button to upload a reference document for comparison.
          </li>
          <li>
            <strong>How do I add or edit grading criteria?</strong>
            <br />
            Use the "Add Another Criteria" button to add new criteria. You can edit or remove criteria before grading.
          </li>
          <li>
            <strong>How do I view and edit grades?</strong>
            <br />
            In the "Grading" tab, you can view all grading results. Editing grades is available in the "Sections" tab: select a section, click a student, and use the "Edit Grades" button.
          </li>
          <li>
            <strong>How do I manage sections and students?</strong>
            <br />
            Go to the "Sections" tab to view all sections and their students. You can delete sections or students using the "Delete" button.
          </li>
          <li>
            <strong>How do I see how many essays are graded in a section?</strong>
            <br />
            In the "Sections" tab, select a section to see the list of students and their graded essays.
          </li>
          <li>
            <strong>How do I log out?</strong>
            <br />
            Click the "Settings" button at the bottom left and choose "Log Out".
          </li>
          <li>
            <strong>Who can I contact for support?</strong>
            <br />
            Please email{" "}
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=sulatsuri@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-700 underline"
            >
              sulatsuri@gmail.com
            </a>
          </li>
        </ul>
      </Card>
    </div>
  );
}
