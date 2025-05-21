import { Card } from "@/components/ui/card";

export default function AboutUs() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-600 to-purple-950">
      <Card className="max-w-xl w-full p-8 bg-white text-purple-900 shadow-lg">
        <h1 className="text-2xl font-bold mb-4">About Us</h1>
        <p>
          <strong>Sulat-Suri</strong> is an automatic essay grading system developed by BSU students.
          Our goal is to help teachers save time and provide fair, consistent feedback to students.
        </p>
        <p className="mt-4">
          This project is part of our thesis for the Bachelor of Science in Computer Engineering program.
        </p>
        <p className="mt-4">
          For more information, contact us at <a href="mailto:info@example.com" className="text-purple-700 underline">info@example.com</a>
        </p>
      </Card>
    </div>
  );
}