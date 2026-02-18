import { ccas } from "@/data/ccas";
import { SectionHeader } from "../section-components";

export function CCASection() {
  return (
    <section id="cca">
      <SectionHeader header="Leadership Experience / CCAs" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {ccas.map((cca) => (
          <div
            key={cca.id}
            className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100"
          >
            <h3 className="text-xl font-bold text-slate-800">
              {cca.committee}
            </h3>
            <ul>
              {cca.positions.map((position) => (
                <li>
                  <p className="text-orange-600 font-medium">
                    {position.position}
                  </p>{" "}
                  <p className="text-slate-600">
                    ({position.start_date} - {position.end_date}){" "}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
