import { GraduationCap, Plus, Trash2 } from "lucide-react";

export default function EducationForm({ data, onChange }) {
  const addEducation = () => {
    const newEducation = { institution: "", degree: "", start_date: "", end_date: "", gpa: "", };
    onChange([...data, newEducation]);
  };

  const removeEducation = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };

  const updateEducation = (index, field, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
            Education
          </h3>
          <p className="text-sm text-gray-500">Add your education details</p>
        </div>

        <button onClick={addEducation} className="flex items-center gap-2 px-3 py-2 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors" >
          <Plus className="size-4" />
          Add Education
        </button>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <GraduationCap className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p>No education added yet.</p>
          <p className="text-sm">Click &quot;Add Education&quot; to get started.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((education, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg space-y-3" >
              <div className="flex justify-between items-start">
                <h4>Education #{index + 1}</h4>
                <button className="text-red-500 hover:text-red-700 transition-colors" onClick={() => removeEducation(index)} >
                  <Trash2 className="size-4" />
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-3">
                <input value={education.institution || ""} onChange={(e) => updateEducation(index, "institution", e.target.value)} type="text" placeholder="Institution Name" className=" px-3 py-2 text-sm" />
                <input value={education.degree || ""} onChange={(e) => updateEducation(index, "degree", e.target.value)} type="text" placeholder="Degree / Course" className=" px-3 py-2 text-sm" />
                <label className="space-y-1">
                  <span className="text-xs text-gray-500">Start Date</span>
                  <input value={education.start_date || ""} onChange={(e) => updateEducation(index, "start_date", e.target.value)} type="month" className="w-full px-3 py-2 text-sm" />
                </label>
                <label className="space-y-1">
                  <span className="text-xs text-gray-500">End Date</span>
                  <input value={education.end_date || education.graduation_date || ""} onChange={(e) => updateEducation(index, "end_date", e.target.value)} type="month" className="w-full px-3 py-2 text-sm" />
                </label>
              </div>

              <input value={education.gpa || ""} onChange={(e) => updateEducation(index, "gpa", e.target.value)} type="text" placeholder="GPA (optional)" className=" px-3 py-2 text-sm" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
