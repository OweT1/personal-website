import { ccas } from "@/data/ccas";

export function CCASection() {
  return (
    <section id="cca" className="section">
      <h2>Leadership Experiences / CCAs</h2>
      {ccas.map((cca) => (
        <div key={cca.id} className="card">
          <h3>{cca.committee}</h3>
          <ul>
            {cca.positions.map((position) => (
              <li>
                {position.position} ({position.start_date} - {position.end_date}
                ){" "}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}
