import { experiences } from "@/data/experiences";

export function ExperienceSection() {
  return (
    <section id="experience">
      <h2 className="text-3xl font-bold mb-10 text-center md:text-left flex items-center gap-3">
        <span className="w-10 h-1 bg-orange-500 rounded-full inline-block"></span>
        Work Experience
      </h2>

      <div className="space-y-8">
        {experiences.map((job) => (
          <div
            key={job.id}
            className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md hover:border-orange-100 transition-all duration-300"
          >
            <div className="flex flex-col md:flex-row justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-slate-800">{job.role}</h3>
                <span className="text-orange-600 font-medium">
                  {job.company}
                </span>
              </div>
              <span className="text-sm text-slate-400 mt-1 md:mt-0 italic">
                {job.start_date} - {job.end_date}
              </span>
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
