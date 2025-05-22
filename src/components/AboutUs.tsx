import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

// You may need to adjust the import paths based on your project structure
const joshuaImg = "/assets/images/formento.png";
const isaacImg = "/assets/images/goco.png";
const danielImg = "/assets/images/teves.jpg";
export default function AboutUs() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Sulat-Suri | About Us";
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
        <h1 className="text-2xl font-bold mb-4">About Us</h1>
        <p>
          <strong>Sulat-Suri</strong> is an automatic essay grading system
          developed by Batangas State University students. Our goal is to help
          teachers save time and provide fair, consistent feedback to students.
        </p>
        <p className="mt-4">
          This project is part of our thesis for the Bachelor of Science in
          Computer Engineering program.
        </p>
        <div className="mt-8 flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <img
              src={joshuaImg}
              alt="Joshua Ashley D. Formento"
              className="w-20 h-20 rounded-full object-cover border-2 border-purple-700"
            />
            <span className="font-semibold">Joshua Ashley D. Formento</span>
          </div>
          <div className="flex items-center gap-4">
            <img
              src={isaacImg}
              alt="Isaac Garrick P. Goco"
              className="w-20 h-20 rounded-full object-cover border-2 border-purple-700"
            />
            <span className="font-semibold">Isaac Garrick P. Goco</span>
          </div>
          <div className="flex items-center gap-4">
            <img
              src={danielImg}
              alt="Daniel R. Teves"
              className="w-20 h-20 rounded-full object-cover border-2 border-purple-700"
            />
            <span className="font-semibold">Daniel R. Teves</span>
          </div>
        </div>
        <p className="mt-8">
          For more information, contact us at{" "}
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=sulatsuri@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-700 underline"
          >
            sulatsuri@gmail.com
          </a>
        </p>
      </Card>
    </div>
  );
}
