// This is the "why this matched you" breakdown for the Frontend Developer
// Intern posting (match id 1). It is the only worked example in the design
// mockup, so the Job Detail screen shows this same breakdown regardless of
// which posting is open. Per-posting breakdowns depend on the real matching
// engine and are not available yet.
export const mockSkillMatchRows = [
  {
    yourSkill: "Javascript",
    yourNote: "named directly in the posting",
    required: "Javascript",
    requiredNote: "exact term",
    sim: "1.00",
    type: "exact",
  },
  {
    yourSkill: "HTML, CSS",
    yourNote: "semantic markup, responsive layout",
    required: "HTML, CSS",
    requiredNote: "exact terms",
    sim: "1.00",
    type: "exact",
  },
  {
    yourSkill: "React",
    yourNote: "components, hooks, state",
    required: "React",
    requiredNote: "exact term",
    sim: "1.00",
    type: "exact",
  },
  {
    yourSkill: "Javascript, React",
    yourNote: "keyword search would miss this",
    required: "Typescript",
    requiredNote: "typed superset \u2014 same language, added types",
    sim: "0.88",
    type: "near",
  },
  {
    yourSkill: "React project work",
    yourNote: "inferred, not listed",
    required: "Git",
    requiredNote: "repository workflow implied by your projects",
    sim: "0.69",
    type: "near",
  },
  {
    yourSkill: "nothing comparable",
    yourNote: "",
    required: "QA knowledge",
    requiredNote: "testing practice \u2014 below the 0.55 threshold",
    sim: "0.31",
    type: "missing",
  },
]