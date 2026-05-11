export type WritingItem = {
  slug: string;
  title: string;
  subtitle: string;
  date: string;
  readMinutes: number;
  body: string;
};

export type WorkStatus = "Completed" | "In Progress";

export type WorkItem = {
  slug: string;
  title: string;
  subtitle: string;
  status: WorkStatus;
  date?: string;
  thumbnailColor: string;
  description: string;
  body: string;
};

export const writingItems: WritingItem[] = [
  {
    slug: "piece-0",
    title: "Piece 0",
    subtitle: "Insert Subtitle Here",
    date: "1998-09-21",
    readMinutes: 1,
    body: `Write something here.`,
  },
  {
    slug: "piece-1",
    title: "Piece 1",
    subtitle: "Insert Subtitle Here",
    date: "2026-05-08",
    readMinutes: 2,
    body: `Write something here.`,
  },
  {
    slug: "piece-2",
    title: "Piece 2",
    subtitle: "Insert Subtitle Here",
    date: "2023-05-08",
    readMinutes: 2,
    body: `Write something here.`,
  },
];

export const workItems: WorkItem[] = [
  {
    slug: "project-0",
    title: "Project 0",
    subtitle: "Insert Subtitle Here",
    status: "Completed",
    date: "2026-05-08",
    thumbnailColor: "#263047",
    description: "Insert Project Description Here",
    body: `Insert Project Body Here.`,
  },
  {
    slug: "project-1",
    title: "Project 1",
    subtitle: "Insert Subtitle Here",
    status: "In Progress",
    thumbnailColor: "#422647",
    description: "Insert Project Description Here",
    body: `Insert Project Body Here.`,
  },
];

export const sortedWritingItems = [...writingItems].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
);

export const sortedWorkItems = [...workItems].sort((a, b) => {
  if (a.status === "In Progress" && b.status !== "In Progress") return -1;
  if (a.status !== "In Progress" && b.status === "In Progress") return 1;
  if (!a.date && !b.date) return 0;
  if (!a.date) return -1;
  if (!b.date) return 1;
  return new Date(b.date).getTime() - new Date(a.date).getTime();
});
