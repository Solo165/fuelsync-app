# FuelSync — Product Decision Log

This document records every meaningful product decision made during the development of FuelSync, including what changed, why it changed, and what evidence drove the decision. It exists to create a transparent, auditable trail of product thinking for investors, advisors, and program partners.

---

## Format

Each entry follows this structure:

- **Date** — when the decision was made
- **Feature** — which part of the product was affected
- **Change** — what specifically changed
- **Why** — the reasoning behind the change
- **Evidence** — the research, data, or insight that drove it
- **Status** — In progress / Complete / Under review

---

## Log

---

### Entry 001
**Date:** 15 April 2026
**Feature:** Onboarding flow — friction point question
**Change:** Added a new question before the summary screen: "What's your biggest challenge with eating well?" Options: no time to cook, healthy food is too expensive, I get bored eating the same things, I fall off and feel bad about it, I don't know what to eat.
**Why:** The current onboarding collects goal, preferences, lifestyle, and metrics but does not identify the user's primary behavioural barrier. Without this, the agent loop cannot route users to the correct intervention from session one. A user whose barrier is guilt needs the spiral breaker as their primary experience. A user whose barrier is cost needs the budget mechanic prioritised. This question makes the personalisation real from the first session.
**Evidence:** Mantzios et al. (2020) — guilt after dietary lapses predicts lower intention to continue, lower self-efficacy, and more negative reactions. Kidman et al. (2024) — abandonment driven by poor UX and lack of tailoring. FuelSync Survey v2 (April 2026) — 41.7% cited time/effort as biggest frustration, 41.7% cited cost.
**Status:** In progress

---

### Entry 002
**Date:** 15 April 2026
**Feature:** Onboarding flow — summary screen
**Change:** Reframe the summary screen from a data confirmation screen ("here's what you told us") to a value delivery screen ("here are your first 3 meals based on what you told us").
**Why:** The research is clear that users need to receive value before their motivation drops. A confirmation screen that reflects data back to the user delivers no value — it just adds another step before the user sees what the app actually does. Delivering 3 personalised meal suggestions on this screen transforms it from an admin step into the first proof that FuelSync works.
**Evidence:** Kidman et al. (2024) — abandonment often occurs before users experience the app's core value. Riaz et al. (2022) — 53% of mHealth apps uninstalled within 30 days, with loss of interest as the primary driver. van der Bend et al. (2023) — early value delivery is critical to sustained use.
**Status:** In progress

---

### Entry 003
**Date:** 15 April 2026
**Feature:** Onboarding flow — metrics screen
**Change:** Make the weight field optional and reframe the screen from "Your Metrics" to "Help us match your meals." Add a note below the weight field: "Optional — only used for meal matching, never shown back to you."
**Why:** Weight is an emotionally loaded input for the primary user segment — people who have struggled with weight and eating. Framing it as a required medical metric creates friction and potential shame at the exact moment the user should be feeling supported. Making it optional with a clear, non-clinical explanation removes the barrier without losing the data from users willing to share it.
**Evidence:** Kidman et al. (2024) — privacy concerns cited as a category of abandonment driver. FuelSync core thesis — shame and judgment are the primary mechanisms that cause users to disengage. FuelSync UI Strategy (Document 06) — emotionally safe entry point is a core design principle.
**Status:** In progress

---

### Entry 004
**Date:** 15 April 2026
**Feature:** Onboarding flow — lifestyle screen
**Change:** Remove sleep quality and daily routine structure from the onboarding flow. Move them to a progressive profile that populates over the first two weeks of use. Retain activity level and eating pattern (irregular, balanced, strict routine) as they directly influence meal matching and spiral breaker behaviour.
**Why:** The research identifies complexity as an abandonment driver. Sleep quality and daily routine are valuable agent inputs but do not affect the first week of meal suggestions. Asking for them upfront adds friction without delivering immediate value. Progressive profiling — collecting data as behaviour is observed — is both less intrusive and more accurate than asking users to self-report.
**Evidence:** Kidman et al. (2024) — poor UX and complexity are primary abandonment drivers. van der Bend et al. (2023) — onboarding should collect only what is needed to personalise immediately. FuelSync Agent Architecture (Document 07) — memory layer designed to build longitudinal user state over time, not from a single intake.
**Status:** In progress

---

### Entry 005
**Date:** 15 April 2026
**Feature:** Document 02 — Problem & Insight
**Change:** Replaced loosely cited research claims with properly sourced peer-reviewed studies. Updated abandonment statistic from "70-89%" to "53% within 30 days" (Riaz et al. 2022) and "70% within 100 days" (Kidman et al. 2024). Added guilt mechanism research (Mantzios et al. 2020) as direct evidence for the spiral breaker mechanic. Added meal repetition research (Redden & Galak field experiment, 2021) as direct evidence for the anchor meal thesis.
**Why:** Investor-grade documentation requires verifiable citations. The original document made correct arguments but relied on approximate figures that could be challenged. The updated citations are specific, recent, and directly relevant to FuelSync's core claims.
**Evidence:** Research compiled via Perplexity AI search, April 2026. Sources: PMC, PubMed, JMIR, Nutrients journal.
**Status:** Complete — Document 02 to be updated in next session

---

*Log maintained by founder. Updated with every meaningful product or documentation decision.*
*Last updated: 15 April 2026*
