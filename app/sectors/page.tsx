export default function SectorsPage() {
  const sectors = [
    {
      name: "Government & Municipalities",
      description:
        "Support for national and local authorities to design frameworks, pilots and programmes for responsible e-waste management.",
      bullets: [
        "National strategy and roadmap support",
        "Municipal collection and take-back schemes",
        "Public awareness and stakeholder engagement",
      ],
    },
    {
      name: "Corporates, Banks & Telcos",
      description:
        "Help large organisations manage IT assets and electronic equipment across branches and data centres.",
      bullets: [
        "End-of-life IT and data centre equipment",
        "Asset decommissioning and vendor selection",
        "Compliance, reporting and ESG support",
      ],
    },
    {
      name: "Universities, Schools & Hospitals",
      description:
        "Guidance for institutions with continuous inflow of electronic equipment and lab or medical devices.",
      bullets: [
        "Inventory and storage assessments",
        "Safe handling and segregation practices",
        "Staff and student training sessions",
      ],
    },
    {
      name: "Recyclers & Aggregators",
      description:
        "Collaboration with existing recyclers, aggregators and informal sector actors to improve practices.",
      bullets: [
        "Process improvement and safety",
        "Partnership models with formal actors",
        "Pilot projects and reporting for donors",
      ],
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="container mx-auto px-6 py-16">
        <div className="max-w-3xl mb-10">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Sectors We Serve</h1>
          <p className="text-slate-600">
            E-waste challenges look different in each context. We adapt our approach to the
            realities of your sector while keeping to best practice standards.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {sectors.map((sector) => (
            <div
              key={sector.name}
              className="bg-white border rounded-xl p-6 shadow-sm flex flex-col justify-between"
            >
              <div>
                <h2 className="text-xl font-semibold mb-2">{sector.name}</h2>
                <p className="text-sm text-slate-600 mb-3">{sector.description}</p>
                <ul className="text-sm text-slate-600 list-disc list-inside space-y-1">
                  {sector.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}