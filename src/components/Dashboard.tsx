import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Settings } from "lucide-react";
import { IoMdCloudUpload } from "react-icons/io";
import { LuNotepadText } from "react-icons/lu";
import { FaCircleCheck } from "react-icons/fa6";

export default function EssayGradingSystem() {
  return (
    <div className="flex h-screen bg-gradient-to-r from-purple-600 to-purple-950 text-white">
      {/* Sidebar */}
      <aside className="w-64 p-6 bg-purple-600">
        <h1 className="text-xl font-bold">
          <img
            src="./src/assets/images/logo.png"
            className="pb-3 w-24 justify-center text-center inline-block pr-4"
          />
          Sulat-Suri
        </h1>
        <nav className="mt-6">
          <h2 className="text-sm font-semibold">Previous Outputs</h2>
          <ul className="mt-2 space-y-1 text-gray-300">
            <li className="cursor-pointer hover:text-white">USER STORY.pdf</li>
            <li className="cursor-pointer hover:text-white">
              grades 2nd sem.pdf
            </li>
            <li className="cursor-pointer hover:text-white">
              grades 2nd sem.pdf
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">
        <header className="flex justify-between items-center pb-6">
          <h1 className="text-2xl font-bold">
            Sulat-Suri: Automatic Essay Grading System
          </h1>
          <div className="flex items-center gap-4">
            <span>Welcome, Teacher</span>
            <Button variant="ghost" className="p-2">
              <Settings className="w-5 h-5" />
            </Button>
          </div>
        </header>

        {/* Upload Section */}
        <Card className="p-6 mb-6 bg-purple-900 text-white">
          <h2 className="font-semibold mb-2">
            <IoMdCloudUpload className="inline-block scale-150 mr-3" />
            Upload Essay (PDF)
          </h2>
          <div className="relative w-full">
            <input
              type="file"
              id="file-upload"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
              <span className="flex-grow px-3 py-2 text-gray-300">
                No file chosen
              </span>
              <label
                htmlFor="file-upload"
                className="cursor-pointer bg-purple-500 text-white px-4 py-2 hover:bg-purple-600"
              >
                Choose File
              </label>
            </div>
          </div>
        </Card>

        {/* Grading Criteria */}
        <Card className="p-6 mb-6 bg-purple-900 text-white">
          <h2 className="font-semibold">
            <LuNotepadText className="inline-block scale-150 mr-3" />
            Enter Grading Criteria
          </h2>
          <Textarea
            rows={4}
            placeholder="Enter criteria here..."
            className="mt-2 placeholder:text-gray-300"
          />
        </Card>

        {/* Grade Button */}
        <Button className="w-full bg-white text-purple-800">
          <FaCircleCheck />
          Grade Essay
        </Button>

        {/* Results Section */}
        <Card className="p-6 mt-6 bg-purple-900 text-white">
          <h2 className="font-semibold">Grading Results</h2>
          <table className="w-full mt-4 text-sm">
            <thead>
              <tr className="text-left border-b border-gray-200">
                <th className="py-2">Criterion</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200">
                <td className="py-2">Grammar</td>
                <td>85%</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="py-2">Coherence</td>
                <td>90%</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="py-2">Relevance</td>
                <td>88%</td>
              </tr>
              <tr>
                <td className="py-2">Overall</td>
                <td>87%</td>
              </tr>
            </tbody>
          </table>
        </Card>
      </main>
    </div>
  );
}
