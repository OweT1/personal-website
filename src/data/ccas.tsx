interface NamedCCAPosition {
  position: string;
  start_date: string;
  end_date: string;
}

export interface CCA {
  id: number;
  committee: string;
  positions: NamedCCAPosition[];
}

export const ccas: CCA[] = [
  {
    id: 1,
    committee: "NUS Students' Sports Club",
    positions: [
      {
        position: "Marketing Executive",
        start_date: "October 2022",
        end_date: "October 2023",
      },
      {
        position: "Inter-Faculty Games 2023 Marketing Project Director",
        start_date: "December 2022",
        end_date: "October 2023",
      },
      {
        position:
          "Inter-Faculty Games 2024 Marketing Project Advisor & Executive",
        start_date: "December 2023",
        end_date: "October 2024",
      },
      {
        position: "RUNNUS 2024 Admin & Finance Executive",
        start_date: "December 2023",
        end_date: "October 2024",
      },
    ],
  },
  {
    id: 2,
    committee: "NUS Students' Science Club",
    positions: [
      {
        position: "FLAG Subcommittee Events Executive",
        start_date: "September 2022",
        end_date: "September 2023",
      },
      {
        position: "Welfare Subcommittee Marketing Header",
        start_date: "September 2023",
        end_date: "September 2024",
      },
    ],
  },
  {
    id: 3,
    committee: "NUS Mathematics & Statistics Orientation Camp 2023 Committee",
    positions: [
      {
        position: "Publicity Sub-Head",
        start_date: "October 2022",
        end_date: "August 2023",
      },
      {
        position: "Safety Officer",
        start_date: "October 2022",
        end_date: "August 2023",
      },
    ],
  },
];
