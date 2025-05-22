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
            Go to the Dashboard, click "Upload Essays", and select your files.
          </li>
          <li>
            <strong>How do I add grading criteria?</strong>
            <br />
            Use the "Add Another Criteria" button and fill in the fields.
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
