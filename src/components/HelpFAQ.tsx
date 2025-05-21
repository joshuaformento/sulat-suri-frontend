import { Card } from "@/components/ui/card";

export default function HelpFAQ() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-600 to-purple-950">
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
            Please email <a href="mailto:support@example.com" className="text-purple-700 underline">support@example.com</a>
          </li>
        </ul>
      </Card>
    </div>
  );
}