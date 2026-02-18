import { experiences } from "@/data/experiences";
import { SectionHeader } from "@/components/section-components";

export function ExperienceSection() {
  return (
    <section id="experience">
      <SectionHeader header="Work Experience" />

      <div className="space-y-8">
        {experiences.map((job) => (
          <div
            key={job.id}
            className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 
            hover:shadow-md hover:border-orange-100 transition-all duration-300"
          >
            <div className="flex flex-row justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-slate-800">{job.role}</h3>
                <span className="text-orange-600 font-medium">
                  {job.company}
                </span>
              </div>
              <div className="text-sm text-slate-400 mt-1 md:mt-0 italic">
                {job.start_date} - {job.end_date}
              </div>
            </div>
            <ul className="list-disc list-inside space-y-2 text-slate-600">
              {job.description.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
