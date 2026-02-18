interface SectionHeaderInterface {
  header: string;
}

export function SectionHeader({ header }: SectionHeaderInterface) {
  return (
    <h2 className="text-3xl font-bold mb-10 text-center md:text-left flex items-center gap-3">
      <span className="w-10 h-1 bg-orange-500 rounded-full inline-block"></span>
      {header}
    </h2>
  );
}
