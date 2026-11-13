import { RepairCategoryId } from "@/types";

export interface CategoryFaq {
  question: string;
  answer: string;
}

export const CATEGORY_FAQS: Record<RepairCategoryId, CategoryFaq[]> = {
  appliances: [
    {
      question: "How quickly can a whitegoods technician arrive today?",
      answer:
        "Technicians dispatched through SameDayRepairs average an arrival window of 60 to 90 minutes when booked before the same-day cutoff (typically 3:30 PM). If you have food spoiling in a warm fridge, mention high urgency for prioritized van dispatch.",
    },
    {
      question: "What is the typical diagnostic call-out fee for appliance repairs in Australia?",
      answer:
        "Standard Australian emergency diagnostic and call-out fees range from $149 to $195 depending on urgency and brand. Most verified technicians in our directory waive or credit this fee toward the total invoice if you approve and proceed with the repair.",
    },
    {
      question: "Do technicians carry genuine spare parts in their vans?",
      answer:
        "Yes. Mobile whitegoods vans carry common fast-moving components for major Australian brands including Samsung, LG, Fisher & Paykel, Bosch, Westinghouse, and Whirlpool (e.g. defrost sensors, drain pumps, oven elements, door seals).",
    },
    {
      question: "Is there a warranty on replacement parts and labor?",
      answer:
        "All verified technicians in our directory offer a minimum 12-month manufacturer parts warranty and 3 to 12 months workmanship warranty on completed domestic repairs.",
    },
  ],
  plumbing: [
    {
      question: "What should I do immediately while waiting for an emergency plumber?",
      answer:
        "First, locate your mains water isolation valve (usually near your water meter at the front property boundary) and turn it clockwise to stop active flooding. If you smell gas, turn off the main gas bottle/meter and do not operate electrical switches.",
    },
    {
      question: "Are emergency plumbers available after-hours and on weekends?",
      answer:
        "Yes. The plumbers listed with a '24/7' badge operate dedicated emergency night and weekend on-call rosters across all Australian capital metros.",
    },
    {
      question: "Can hot water systems be replaced on the same day?",
      answer:
        "Yes. Most verified emergency plumbing teams carry temporary emergency hot water units or have access to commercial supplier trade yards for same-day supply and install of Rheem, Dux, Rinnai, and Aquamax units.",
    },
  ],
  locksmith: [
    {
      question: "Will the locksmith damage my door or lock to get me in?",
      answer:
        "In over 95% of residential house lockouts, our licensed locksmiths utilize non-destructive picking, decoding, or bypass techniques without causing damage to your door or existing deadbolt.",
    },
    {
      question: "Do I need proof of residence to be let into my home?",
      answer:
        "Yes. In accordance with Australian Master Locksmiths Association regulations, technicians will require photo ID showing your name and address (or a rental lease agreement) to verify lawful tenancy before gaining entry.",
    },
    {
      question: "Can the technician cut and program new car keys on-site?",
      answer:
        "Mobile automotive locksmith vans carry mobile key-cutting machinery and electronic OBD2 programming transponder tools to create new keys on the roadside.",
    },
  ],
  electrical: [
    {
      question: "Why is my safety switch tripping repeatedly?",
      answer:
        "A tripping safety switch (RCD) indicates a live current leak to earth. This can be caused by a faulty appliance (like a kettle or hot water element), storm moisture ingress, or damaged wiring. An emergency electrician uses insulation resistance testers to isolate the fault safely.",
    },
    {
      question: "Are your electricians licensed and insured in my state?",
      answer:
        "All listed electricians hold valid state trade contractor licenses (e.g., QBCC/Electrical Contractor License in QLD, Fair Trading in NSW, Energy Safe Victoria REC in VIC) and carry minimum $5M public liability insurance.",
    },
  ],
  glazing: [
    {
      question: "Can shattered sliding glass doors be replaced the same day?",
      answer:
        "Yes. Emergency glaziers carry mobile glass cutting equipment and standard sizes of toughened and laminated A-grade safety glass conforming to Australian Standard AS1288.",
    },
    {
      question: "Do you offer emergency timber board-up for storm or break-in damage?",
      answer:
        "If custom or double-glazed glass requires manufacturing, the glazier will perform an immediate heavy-duty timber make-safe board-up to secure the property and weatherproof the building against rain.",
    },
  ],
  "garage-doors": [
    {
      question: "Can I manually open my garage door if a spring is snapped?",
      answer:
        "Warning: Never attempt to force or pull an automatic door with a snapped spring. Torsion springs counterbalance 80–120kg of door weight. Forcing the door can cause severe injury or burnout of the electric opener.",
    },
    {
      question: "Do technicians have replacement springs to fit today?",
      answer:
        "Mobile garage door vans carry commercial high-cycle torsion springs and wire cables to match Merlin, B&D, Steel-Line, and Gliderol sectional doors.",
    },
  ],
  "mobile-mechanic": [
    {
      question: "How long does mobile battery replacement take?",
      answer:
        "Once the van arrives at your home or workplace, a full battery conductance test, alternator check, and new battery installation typically takes 20 to 30 minutes.",
    },
    {
      question: "What warranty comes with a mobile replacement battery?",
      answer:
        "Our mobile mechanics install premium Century, Bosch, and Exide batteries backed by 2 to 3-year nationwide replacement warranties.",
    },
  ],
  "tech-repairs": [
    {
      question: "Do you replace phone screens using original OLED displays?",
      answer:
        "Technicians offer both OEM-spec original displays (preserving TrueTone and biometric sensor functions) and premium aftermarket alternatives to fit your budget.",
    },
    {
      question: "Can you rescue an iPhone or laptop with liquid spill damage?",
      answer:
        "Yes, but time is critical. Turn the device off immediately and do not connect a charger. Bring it in or request courier dispatch within hours for ultrasonic board drying and corrosion treatment.",
    },
  ],
  roofing: [
    {
      question: "How does emergency storm tarping work during heavy rain?",
      answer:
        "Emergency roof teams scale the roof with harness safety equipment to secure heavy-duty UV-stabilized industrial poly tarps over broken tiles, cracked skylights, or damaged sheet metal using sandbags and timber battens.",
    },
    {
      question: "Can you provide insurance claim reports and photos?",
      answer:
        "Yes. Technicians provide photographic make-safe reports, leak origin documentation, and cause-of-damage assessments suitable for submitting to Suncorp, NRMA, Allianz, RACQ, and all major Australian insurers.",
    },
  ],
};

