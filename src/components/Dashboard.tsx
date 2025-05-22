import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Settings,
  LogOut,
  HelpCircle,
  Info,
  Menu,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { IoMdCloudUpload } from "react-icons/io";
import { LuNotepadText } from "react-icons/lu";
import { FaCircleCheck } from "react-icons/fa6";
import { FaRegCheckCircle } from "react-icons/fa"; // Add this for Grading icon
import { PiUsersThree } from "react-icons/pi"; // Add this for Sections icon
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth";

export default function Dashboard() {
  const token = useAuthStore((state) => state.token);
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);
  const fullName = user?.fullName;
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"grading" | "sections">("grading");
  const [sidebarOpen, setSidebarOpen] = useState(true); // default open on desktop
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false); // for desktop collapse
  const [settingsOpen, setSettingsOpen] = useState(false);

  // Grading form state
  const [essayFiles, setEssayFiles] = useState<File[]>([]); // changed to array
  const [referenceFile, setReferenceFile] = useState<File | null>(null);
  const [rubrics, setRubrics] = useState([{ name: "", description: "" }]);
  const [uploadError, setUploadError] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState("");
  const [gradingResults, setGradingResults] = useState<any[]>([]);
  const [studentInfoMap, setStudentInfoMap] = useState<{ [id: string]: any }>(
    {}
  );
  const [sectionMap, setSectionMap] = useState<{ [id: string]: string }>({});

  const handleEssayFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploadError("");
    setUploadSuccess("");
    if (e.target.files) {
      setEssayFiles(Array.from(e.target.files)); // store all files
    }
  };

  const handleReferenceFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setUploadError("");
    setUploadSuccess("");
    if (e.target.files && e.target.files[0]) {
      setReferenceFile(e.target.files[0]);
    }
  };

  // Rubrics handlers
  const handleRubricChange = (
    idx: number,
    field: "name" | "description",
    value: string
  ) => {
    setRubrics((prev) =>
      prev.map((r, i) => (i === idx ? { ...r, [field]: value } : r))
    );
  };

  const addRubric = () =>
    setRubrics([...rubrics, { name: "", description: "" }]);
  const removeRubric = (idx: number) =>
    setRubrics(
      rubrics.length > 1 ? rubrics.filter((_, i) => i !== idx) : rubrics
    );

  const handleGradeEssay = async () => {
    setUploadError("");
    setUploadSuccess("");
    if (!token) {
      setUploadError("You are not logged in. Please log in again.");
      return;
    }
    if (!essayFiles.length) {
      setUploadError("Please select at least one essay file.");
      return;
    }
    if (!referenceFile) {
      setUploadError("Please select a reference file.");
      return;
    }
    if (rubrics.some((r) => !r.name.trim() || !r.description.trim())) {
      setUploadError("Please fill out all rubric fields.");
      return;
    }

    // Convert rubrics array to object
    const rubricObj = Object.fromEntries(
      rubrics.map((r) => [r.name.trim(), r.description.trim()])
    );

    const formData = new FormData();
    essayFiles.forEach((file) => formData.append("essays", file));
    formData.append("reference", referenceFile);
    formData.append("rubrics", JSON.stringify(rubricObj)); // <-- send as object

    try {
      const res = await fetch("http://localhost:3000/api/v1/essays/grade", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || "Upload failed");
      }
      const result = await res.json();
      setUploadSuccess(
        "Essays and reference uploaded and graded successfully!"
      );
      setEssayFiles([]);
      setReferenceFile(null);
      setRubrics([{ name: "", description: "" }]);
      setGradingResults(Array.isArray(result) ? result : [result]);
    } catch (err: any) {
      setUploadError(err.message);
    }
  };

  // Settings Modal Component
  const SettingsModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg p-6 w-80 text-gray-900 relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
          onClick={() => setSettingsOpen(false)}
          aria-label="Close"
        >
          ×
        </button>
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Settings className="w-5 h-5" /> Settings
        </h2>
        <div className="flex flex-col gap-3">
          <Button
            variant="outline"
            className="flex items-center gap-2 justify-start"
            onClick={() => {
              logout();
              setSettingsOpen(false);
              navigate("/login"); // Redirect to login form
            }}
          >
            <LogOut className="w-4 h-4" /> Logout
          </Button>
          <Button
            variant="outline"
            className="flex items-center gap-2 justify-start"
            onClick={() => {
              setSettingsOpen(false);
              navigate("/help-faq"); // Route to your Help & FAQ page
            }}
          >
            <HelpCircle className="w-4 h-4" /> Help & FAQ
          </Button>
          <Button
            variant="outline"
            className="flex items-center gap-2 justify-start"
            onClick={() => {
              setSettingsOpen(false);
              navigate("/about-us"); // Route to your About Us page
            }}
          >
            <Info className="w-4 h-4" /> About Us
          </Button>
        </div>
      </div>
    </div>
  );

  // Placeholder components for other tabs
  const SectionsTab = () => {
    const [sections, setSections] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [selectedSection, setSelectedSection] = useState<any>(null);
    const [students, setStudents] = useState<any[]>([]);
    const [studentsLoading, setStudentsLoading] = useState(false);
    const [studentsError, setStudentsError] = useState("");
    const [essays, setEssays] = useState<any[]>([]);
    const [selectedStudent, setSelectedStudent] = useState<any>(null);
    const [studentGrades, setStudentGrades] = useState<any>(null);
    const [gradesLoading, setGradesLoading] = useState(false);
    const [gradesError, setGradesError] = useState("");

    // Fetch sections
    useEffect(() => {
      setLoading(true);
      setError("");
      fetch("http://localhost:3000/api/v1/section", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(async (res) => {
          if (!res.ok) {
            const data = await res.json().catch(() => ({}));
            throw new Error(data.message || "Failed to fetch sections");
          }
          return res.json();
        })
        .then((data) => setSections(Array.isArray(data.data) ? data.data : []))
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
    }, [token]);

    // Fetch essays (for mapping student to essayId)
    useEffect(() => {
      fetch("http://localhost:3000/api/v1/essays/", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(async (res) => {
          if (!res.ok) return [];
          return res.json();
        })
        .then((data) => setEssays(Array.isArray(data) ? data : []));
    }, [token]);

    // Fetch students when a section is selected
    useEffect(() => {
      if (!selectedSection) return;
      setStudentsLoading(true);
      setStudentsError("");
      fetch(
        `http://localhost:3000/api/v1/student/section/${selectedSection.id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
        .then(async (res) => {
          if (!res.ok) {
            const data = await res.json().catch(() => ({}));
            throw new Error(data.message || "Failed to fetch students");
          }
          return res.json();
        })
        .then((data) => setStudents(Array.isArray(data.data) ? data.data : []))
        .catch((err) => setStudentsError(err.message))
        .finally(() => setStudentsLoading(false));
    }, [selectedSection, token]);

    // Handle student click
    const handleStudentClick = async (student: any) => {
      setSelectedStudent(student);
      setGradesLoading(true);
      setGradesError("");
      setStudentGrades(null);

      try {
        const res = await fetch(
          `http://localhost:3000/api/v1/grades/student/${student.id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.message || "Failed to fetch grades");
        }
        const data = await res.json();
        // If you expect only one grade, use data.data[0]
        setStudentGrades(
          data.data && data.data.length > 0 ? data.data[0] : null
        );
        if (!data.data || data.data.length === 0) {
          setGradesError("No grades found for this student.");
        }
      } catch (err: any) {
        setGradesError(err.message);
      } finally {
        setGradesLoading(false);
      }
    };

    return (
      <Card className="p-6 mt-6 bg-purple-900 text-white">
        <h2 className="font-semibold text-xl mb-4">Graded Sections</h2>
        {loading && <div className="text-gray-300">Loading sections...</div>}
        {error && <div className="text-red-400">{error}</div>}
        {!loading && !error && sections.length === 0 && (
          <div className="text-gray-300">No sections found.</div>
        )}
        {!loading && !error && sections.length > 0 && (
          <ul className="space-y-4">
            {sections.map((section) => (
              <li
                key={section.id}
                className={`border-b border-purple-700 pb-2 cursor-pointer hover:bg-purple-800 rounded ${
                  selectedSection?.id === section.id ? "bg-purple-700" : ""
                }`}
                onClick={() => setSelectedSection(section)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-bold">{section.name}</div>
                    <div className="text-sm text-gray-300">
                      Graded Essays: {section.gradedEssayCount ?? "N/A"}
                    </div>
                  </div>
                  <Button
                    variant="destructive"
                    className="ml-4"
                    onClick={async (e) => {
                      e.stopPropagation();
                      if (!window.confirm(`Delete section "${section.name}"?`))
                        return;
                      try {
                        const res = await fetch(
                          `http://localhost:3000/api/v1/section/${section.id}`,
                          {
                            method: "DELETE",
                            headers: { Authorization: `Bearer ${token}` },
                          }
                        );
                        if (!res.ok) {
                          const data = await res.json().catch(() => ({}));
                          throw new Error(
                            data.message || "Failed to delete section"
                          );
                        }
                        setSections((prev) =>
                          prev.filter((s) => s.id !== section.id)
                        );
                        if (selectedSection?.id === section.id)
                          setSelectedSection(null);
                      } catch (err: any) {
                        alert(err.message);
                      }
                    }}
                  >
                    Delete
                  </Button>
                </div>
                <div className="font-bold">{section.name}</div>
                <div className="text-sm text-gray-300">
                  Graded Essays: {section.gradedEssayCount ?? "N/A"}
                </div>
                {/* Add more section details as needed */}
              </li>
            ))}
          </ul>
        )}

        {/* Students List */}
        {selectedSection && (
          <div className="mt-6">
            <h3 className="font-semibold text-lg mb-2">
              Students in {selectedSection.name}
            </h3>
            {studentsLoading && (
              <div className="text-gray-300">Loading students...</div>
            )}
            {studentsError && (
              <div className="text-red-400">{studentsError}</div>
            )}
            {!studentsLoading && !studentsError && students.length === 0 && (
              <div className="text-gray-300">
                No students found in this section.
              </div>
            )}
            {!studentsLoading && !studentsError && students.length > 0 && (
              <ul className="space-y-2">
                {students.map((student) => (
                  <li
                    key={student.id}
                    className="border-b border-purple-700 pb-1 flex items-center justify-between hover:bg-purple-800 cursor-pointer"
                    onClick={() => handleStudentClick(student)}
                  >
                    <span>
                      {student.firstName} {student.lastName}
                    </span>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="ml-2"
                      onClick={async (e) => {
                        e.stopPropagation();
                        if (
                          !window.confirm(
                            `Delete student "${student.firstName} ${student.lastName}"?`
                          )
                        )
                          return;
                        try {
                          const res = await fetch(
                            `http://localhost:3000/api/v1/student/${student.id}`,
                            {
                              method: "DELETE",
                              headers: { Authorization: `Bearer ${token}` },
                            }
                          );
                          if (!res.ok) {
                            const data = await res.json().catch(() => ({}));
                            throw new Error(
                              data.message || "Failed to delete student"
                            );
                          }
                          setStudents((prev) =>
                            prev.filter((s) => s.id !== student.id)
                          );
                          if (selectedStudent?.id === student.id)
                            setSelectedStudent(null);
                        } catch (err: any) {
                          alert(err.message);
                        }
                      }}
                    >
                      Delete
                    </Button>
                    className="border-b border-purple-700 pb-1"
                    {student.firstName} {student.lastName}
                  </li>
                ))}
              </ul>
            )}

            {/* Student Grades */}
            {selectedStudent && (
              <div className="mt-4 p-4 bg-purple-800 rounded">
                <h4 className="font-semibold mb-2">
                  Grades for {selectedStudent.firstName}{" "}
                  {selectedStudent.lastName}
                </h4>
                {gradesLoading && (
                  <div className="text-gray-300">Loading grades...</div>
                )}
                {gradesError && (
                  <div className="text-red-400">{gradesError}</div>
                )}
                {studentGrades && (
                  <div>
                    <div className="mb-2">
                      <span className="font-bold">Grades:</span>
                      <ul className="ml-4 mt-2">
                        {Object.entries(studentGrades.grades)
                          .filter(([key]) => key !== "explanation")
                          .map(([key, value]) => (
                            <li key={key}>
                              <span className="font-semibold capitalize">
                                {key.replace(/_/g, " ")}:
                              </span>{" "}
                              {value}
                            </li>
                          ))}
                      </ul>
                    </div>
                    <div className="mb-2">
                      <span className="font-bold">Explanation:</span>{" "}
                      {studentGrades.grades?.explanation}
                    </div>
                    <div>
                      <span className="font-bold">Essay Title:</span>{" "}
                      {studentGrades.essay?.title}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </Card>
    );

    // eslint-disable-next-line
  };

  useEffect(() => {
    // Fetch student info for each grading result
    const fetchStudentInfo = async () => {
      const newMap: { [id: string]: any } = {};
      await Promise.all(
        gradingResults.map(async (result) => {
          if (result.studentId && !studentInfoMap[result.studentId]) {
            try {
              const res = await fetch(
                `http://localhost:3000/api/v1/student/${result.studentId}`,
                {
                  headers: { Authorization: `Bearer ${token}` },
                }
              );
              if (res.ok) {
                const data = await res.json();
                newMap[result.studentId] = data.data;
              }
            } catch {}
          }
        })
      );
      if (Object.keys(newMap).length > 0) {
        setStudentInfoMap((prev) => ({ ...prev, ...newMap }));
      }
    };
    if (gradingResults.length > 0) fetchStudentInfo();
    // eslint-disable-next-line
  }, [gradingResults, token]);

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/v1/section", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          const map: { [id: string]: string } = {};
          (Array.isArray(data) ? data : data.data).forEach((section: any) => {
            map[section.id] = section.name;
          });
          setSectionMap(map);
        }
      } catch {}
    };
    fetchSections();
  }, [token]);

  useEffect(() => {
    if (activeTab === "grading") {
      document.title = "Sulat-Suri | Grading";
    } else if (activeTab === "sections") {
      document.title = "Sulat-Suri | Sections";
    }
  }, [activeTab]);

  return (
    <div className="flex h-screen bg-gradient-to-r from-purple-600 to-purple-950 text-white">
      {/* Burger menu for mobile and desktop */}
      <button
        className="absolute top-4 left-4 z-50 bg-purple-700 p-2 rounded md:hidden"
        onClick={() => setSidebarOpen((open) => !open)}
        aria-label="Open sidebar"
      >
        <Menu className="w-6 h-6" />
      </button>
      {/* Desktop burger/collapse button */}
      <button
        className="hidden md:block absolute top-4 left-4 z-50 bg-purple-700 p-2 rounded"
        onClick={() => setSidebarCollapsed((c) => !c)}
        aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        style={{ transition: "left 0.2s" }}
      >
        {sidebarCollapsed ? (
          <ChevronRight className="w-6 h-6" />
        ) : (
          <ChevronLeft className="w-6 h-6" />
        )}
      </button>

      {/* Sidebar */}
      <aside
        className={`
          fixed z-40 top-0 left-0 h-full ${
            sidebarCollapsed ? "w-20" : "w-64"
          } p-6 bg-purple-600 flex flex-col transition-all duration-200
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:relative md:translate-x-0 md:flex
        `}
      >
        {/* Hide logo/title when collapsed */}
        {!sidebarCollapsed && (
          <h1 className="text-xl font-bold mt-11">
            <img
              src="./src/assets/images/logo.png"
              className="pb-3 w-24 justify-center text-center inline-block pr-4"
              alt="Sulat-Suri Logo"
            />
            Sulat-Suri
          </h1>
        )}
        {/* Always keep nav in the same vertical position */}
        <div className={sidebarCollapsed ? "mt-32" : ""}>
          <nav
            className={`mt-6 flex flex-col gap-2 ${
              sidebarCollapsed ? "items-center" : ""
            }`}
          >
            {/* Grading Button */}
            <div className="relative group w-full flex justify-center">
              <Button
                variant={activeTab === "grading" ? "secondary" : "ghost"}
                className={`justify-start w-full ${
                  sidebarCollapsed ? "px-2 py-2" : ""
                }`}
                onClick={() => {
                  setActiveTab("grading");
                  setSidebarOpen(false);
                }}
              >
                {sidebarCollapsed ? (
                  // Use icon instead of text when collapsed
                  <FaRegCheckCircle className="w-6 h-6 text-purple-900" />
                ) : (
                  "Grading"
                )}
              </Button>
              {sidebarCollapsed && (
                <span className="pointer-events-none absolute left-full top-1/2 -translate-y-1/2 ml-2 whitespace-nowrap rounded bg-black px-2 py-1 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity z-50">
                  Grading
                </span>
              )}
            </div>
            {/* Sections Button */}
            <div className="relative group w-full flex justify-center">
              <Button
                variant={activeTab === "sections" ? "secondary" : "ghost"}
                className={`justify-start w-full ${
                  sidebarCollapsed ? "px-2 py-2" : ""
                }`}
                onClick={() => {
                  setActiveTab("sections");
                  setSidebarOpen(false);
                }}
              >
                {sidebarCollapsed ? (
                  // Use icon instead of text when collapsed
                  <PiUsersThree className="w-6 h-6 text-purple-900" />
                ) : (
                  "Sections"
                )}
              </Button>
              {sidebarCollapsed && (
                <span className="pointer-events-none absolute left-full top-1/2 -translate-y-1/2 ml-2 whitespace-nowrap rounded bg-black px-2 py-1 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity z-50">
                  Sections
                </span>
              )}
            </div>
          </nav>
        </div>
        {!sidebarCollapsed && (
          <>
            <div className="mt-auto pt-8">
              <Button
                variant="ghost"
                className="p-2 w-full justify-start"
                onClick={() => setSettingsOpen(true)}
              >
                <Settings className="w-5 h-5 mr-2" />
                Settings
              </Button>
            </div>
          </>
        )}
      </aside>

      {/* Overlay for mobile sidebar */}
      {!sidebarCollapsed && sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">
        {activeTab === "grading" && (
          <>
            <header className="flex justify-between items-center pb-6">
              <h1 className="text-2xl font-bold">
                Sulat-Suri: Automatic Essay Grading System
              </h1>
              <div className="flex items-center gap-4">
                <span>Welcome, {fullName || "Teacher"}</span>
                <Button
                  variant="ghost"
                  className="p-2"
                  onClick={() => setSettingsOpen(true)}
                >
                  <Settings className="w-5 h-5" />
                </Button>
              </div>
            </header>

            {/* Upload Essay Section */}
            <Card className="p-6 mb-6 bg-purple-900 text-white">
              <h2 className="font-semibold mb-2">
                <IoMdCloudUpload className="inline-block scale-150 mr-3" />
                Upload Essays (PDF)
              </h2>
              <div className="relative w-full">
                <input
                  type="file"
                  id="essay-upload"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  accept=".pdf,.docx,.txt"
                  multiple // allow multiple files
                  onChange={handleEssayFileChange}
                />
                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                  <span className="flex-grow px-3 py-2 text-gray-300">
                    {essayFiles.length
                      ? essayFiles.map((f) => f.name).join(", ")
                      : "No files chosen"}
                  </span>
                  <label
                    htmlFor="essay-upload"
                    className="cursor-pointer bg-purple-500 text-white px-4 py-2 hover:bg-purple-600"
                  >
                    Choose Files
                  </label>
                </div>
              </div>
            </Card>

            {/* Upload Reference Answer Section */}
            <Card className="p-6 mb-6 bg-purple-900 text-white">
              <h2 className="font-semibold mb-2">
                <IoMdCloudUpload className="inline-block scale-150 mr-3" />
                Upload Reference Answer (PDF)
              </h2>
              <div className="relative w-full">
                <input
                  type="file"
                  id="reference-upload"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  accept=".pdf,.docx,.txt"
                  onChange={handleReferenceFileChange}
                />
                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                  <span className="flex-grow px-3 py-2 text-gray-300">
                    {referenceFile ? referenceFile.name : "No file chosen"}
                  </span>
                  <label
                    htmlFor="reference-upload"
                    className="cursor-pointer bg-purple-500 text-white px-4 py-2 hover:bg-purple-600"
                  >
                    Choose File
                  </label>
                </div>
              </div>
            </Card>

            {/* Grading Criteria */}
            <Card className="p-6 mb-6 bg-purple-900 text-white">
              <h2 className="font-semibold mb-2">
                <LuNotepadText className="inline-block scale-150 mr-3" />
                Enter Grading Criteria
              </h2>
              {rubrics.map((rubric, idx) => (
                <div key={idx} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="Criteria Name"
                    value={rubric.name}
                    onChange={(e) =>
                      handleRubricChange(idx, "name", e.target.value)
                    }
                    className="flex-1 rounded px-2 py-1 text-black"
                  />
                  <input
                    type="text"
                    placeholder="Description"
                    value={rubric.description}
                    onChange={(e) =>
                      handleRubricChange(idx, "description", e.target.value)
                    }
                    className="flex-1 rounded px-2 py-1 text-black"
                  />
                  <Button
                    variant="destructive"
                    onClick={() => removeRubric(idx)}
                    disabled={rubrics.length === 1}
                  >
                    Remove
                  </Button>
                </div>
              ))}
              <Button
                className="mt-2"
                variant="secondary"
                onClick={addRubric}
                type="button"
              >
                Add Another Criteria
              </Button>
            </Card>

            {/* Grade Button */}
            <Button
              className="w-full bg-white text-purple-800"
              onClick={handleGradeEssay}
              type="button"
            >
              <FaCircleCheck className="mr-2" />
              Grade Essay
            </Button>
            {uploadError && (
              <div className="text-red-400 mt-2">{uploadError}</div>
            )}
            {uploadSuccess && (
              <div className="text-gray-50 mt-2">{uploadSuccess}</div>
            )}

            {/* Results Section */}
            <Card className="p-6 mt-6 bg-purple-900 text-white">
              <h2 className="font-semibold">Grading Results</h2>
              {gradingResults.length === 0 ? (
                <div className="text-gray-300 mt-4">
                  No grading results yet.
                </div>
              ) : (
                gradingResults.map((result) => {
                  // Get all criterion keys except explanation and total_grade
                  const criterionKeys = Object.keys(result.grades).filter(
                    (key) => key !== "explanation" && key !== "total_grade"
                  );

                  return (
                    <div key={result.id} className="mb-6">
                      {/* Student Info */}
                      <div className="mb-2">
                        <span className="font-semibold">Student:</span>{" "}
                        {studentInfoMap[result.studentId]?.firstName}{" "}
                        {studentInfoMap[result.studentId]?.lastName}
                        <span className="ml-4 font-semibold">
                          Section:
                        </span>{" "}
                        {
                          sectionMap[
                            studentInfoMap[result.studentId]?.sectionId
                          ]
                        }
                      </div>
                      <table className="w-full mt-4 text-sm">
                        <thead>
                          <tr className="text-left border-b border-gray-200">
                            <th className="py-2">Criterion</th>
                            <th>Score</th>
                          </tr>
                        </thead>
                        <tbody>
                          {criterionKeys.map((key) => (
                            <tr key={key} className="border-b border-gray-200">
                              <td className="py-2">{key}</td>
                              <td>{result.grades[key]}</td>
                            </tr>
                          ))}
                          <tr>
                            <td className="py-2 font-bold">Total Grade</td>
                            <td className="font-bold">
                              {result.grades.total_grade}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <div className="mt-4">
                        <span className="font-semibold">Explanation:</span>
                        <p className="mt-1 text-gray-200">
                          {result.grades.explanation}
                        </p>
                      </div>
                    </div>
                  );
                })
              )}
            </Card>
          </>
        )}
        {activeTab === "sections" && <SectionsTab />}
      </main>
      {settingsOpen && <SettingsModal />}
    </div>
  );
}
