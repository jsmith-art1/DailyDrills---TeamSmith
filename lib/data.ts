export type MemberId = "justin" | "mom" | "parker";

export interface Member {
  id: MemberId;
  name: string;
  initials: string;
  color: string;
  bgColor: string;
  textColor: string;
  streak: number;
  totalEntries: number;
  familyShares: number;
  streakLine: string;
  greeting: string;
  insight: string;
}

export interface Prompt {
  id: string;
  tag: string;
  tagColor: string;
  label: string;
  question: string;
  rows: number;
  shared: boolean;
}

export interface FeedEntry {
  memberId: MemberId;
  name: string;
  initials: string;
  bgColor: string;
  textColor: string;
  timeAgo: string;
  mood: string;
  text: string;
}

export const MEMBERS: Member[] = [
  {
    id: "justin",
    name: "Justin",
    initials: "J",
    color: "#7F77DD",
    bgColor: "#EEEDFE",
    textColor: "#3C3489",
    streak: 12,
    totalEntries: 87,
    familyShares: 34,
    streakLine: "12-day streak. Don't break it now.",
    greeting: "Good evening, Justin.",
    insight:
      "You've logged \"drained\" 3 evenings this week. Your best days started with a morning prompt. Worth trying that tomorrow.",
  },
  {
    id: "mom",
    name: "Shelby",
    initials: "S",
    color: "#1D9E75",
    bgColor: "#E1F5EE",
    textColor: "#085041",
    streak: 8,
    totalEntries: 61,
    familyShares: 22,
    streakLine: "8-day streak. Solid.",
    greeting: "Good evening.",
    insight:
      "Your mood on days you wrote more than 3 sentences averages significantly higher. Longer entries seem to help.",
  },
  {
    id: "parker",
    name: "Parker",
    initials: "P",
    color: "#BA7517",
    bgColor: "#FAEEDA",
    textColor: "#633806",
    streak: 5,
    totalEntries: 29,
    familyShares: 11,
    streakLine: "5-day streak. Keep it moving.",
    greeting: "What's up, Parker.",
    insight:
      "You've mentioned \"tired\" a lot after school days. Your best reflections come on days you had practice — movement seems to help you process.",
  },
];

export const PROMPTS: Record<MemberId, Prompt[]> = {
  justin: [
    {
      id: "j1",
      tag: "Quick win",
      tagColor: "purple",
      label: "Quick win",
      question: "What's one thing that went better than expected today?",
      rows: 2,
      shared: false,
    },
    {
      id: "j2",
      tag: "Deeper look",
      tagColor: "teal",
      label: "Deeper look",
      question:
        "Where did you operate from your values today — and where did you drift from them?",
      rows: 3,
      shared: false,
    },
    {
      id: "j3",
      tag: "Family share",
      tagColor: "amber",
      label: "Family share",
      question:
        "What's something you noticed about someone in your family today?",
      rows: 2,
      shared: true,
    },
  ],
  mom: [
    {
      id: "m1",
      tag: "Quick win",
      tagColor: "purple",
      label: "Quick win",
      question: "What's one moment from today you want to hold onto?",
      rows: 2,
      shared: false,
    },
    {
      id: "m2",
      tag: "Deeper look",
      tagColor: "teal",
      label: "Deeper look",
      question:
        "What emotion showed up most today — and what do you think was driving it?",
      rows: 3,
      shared: false,
    },
    {
      id: "m3",
      tag: "Family share",
      tagColor: "amber",
      label: "Family share",
      question: "What's something you appreciated about your family today?",
      rows: 2,
      shared: true,
    },
  ],
  parker: [
    {
      id: "p1",
      tag: "Quick win",
      tagColor: "purple",
      label: "Quick win",
      question: "What's one thing that actually went well today?",
      rows: 2,
      shared: false,
    },
    {
      id: "p2",
      tag: "Real talk",
      tagColor: "teal",
      label: "Real talk",
      question: "What's been on your mind that you haven't said out loud yet?",
      rows: 2,
      shared: false,
    },
    {
      id: "p3",
      tag: "Family share",
      tagColor: "amber",
      label: "Family share",
      question: "What's one thing you noticed about someone at home today?",
      rows: 2,
      shared: true,
    },
  ],
};

export const FEED_ENTRIES: FeedEntry[] = [
  {
    memberId: "mom",
    name: "Shelby",
    initials: "S",
    bgColor: "#E1F5EE",
    textColor: "#085041",
    timeAgo: "1h ago",
    mood: "😊 Good",
    text: "I noticed Parker actually asked how my day was at dinner. Small thing, but it landed.",
  },
  {
    memberId: "parker",
    name: "Parker",
    initials: "P",
    bgColor: "#FAEEDA",
    textColor: "#633806",
    timeAgo: "2h ago",
    mood: "🙂 OK",
    text: "Day was fine. Track practice was brutal but I hit a PR so it was worth it.",
  },
  {
    memberId: "justin",
    name: "Justin",
    initials: "J",
    bgColor: "#EEEDFE",
    textColor: "#3C3489",
    timeAgo: "3h ago",
    mood: "😊 Good",
    text: "Had a long call that drained me but I stayed present through it. That felt like growth.",
  },
];

export const MOODS = [
  { emoji: "😔", label: "Low" },
  { emoji: "😐", label: "Meh" },
  { emoji: "🙂", label: "OK" },
  { emoji: "😊", label: "Good" },
  { emoji: "🤩", label: "Fired up" },
];

export const DAYS = ["M", "T", "W", "Th", "F", "Sa", "Su"];
