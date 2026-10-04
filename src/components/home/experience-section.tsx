import { experiences } from "@/data/experiences";
import { SectionHeader } from "@/components/section-components";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { cardVariants } from "@/constants/themes";

export function ExperienceSection() {
  return (
    <section id="experience">
      <SectionHeader header="Work Experience" />

      <RevealGroup className="space-y-8">
        {experiences.map((job) => (
          <RevealItem key={job.id}>
            <div className={`${cardVariants.base} ${cardVariants.interactive} p-6`}>
              <div className="flex flex-col md:flex-row justify-between mb-4 gap-2">
                <div className="flex flex-row justify-start">
                  <img
                    src={job.company_logo}
                    alt={`${job.company} logo`}
                    className="w-12.5 h-12.5 mr-4 object-contain"
                  />
                  <div className="h-12.5">
                    <h3 className="text-xl font-bold text-ink">{job.role}</h3>
                    <span className="text-brand font-medium">{job.company}</span>
                  </div>
                </div>
                <div className="text-sm text-ink-subtle mt-1 md:mt-0 italic">
                  {job.start_date} - {job.end_date}
                </div>
              </div>
              <ul className="list-disc list-inside space-y-2 text-ink-muted marker:text-brand/60">
                {job.description.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}
