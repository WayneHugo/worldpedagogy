// src/utils/eraScale.js

// CONFIGURATION: These numbers define our multi-scale timeline.
const PREHISTORY_COMPRESSION = 0.001; // SQUASH the deep past
const PX_PER_YEAR_POST_1500 = 4; // EXPAND the modern era
const PX_PER_YEAR_CLASSICAL = 0.5; // The default scale for most of history
const BREAKPOINT_1 = -1000;
const BREAKPOINT_2 = 1500;

// This is the core function that translates a year into a pixel position.
export function toX(ce) {
  let px = 0;

  // Part 1: Deep prehistory (before 1000 BCE)
  if (ce < BREAKPOINT_1) {
    // Calculate the position in the compressed section
    px = (ce - BREAKPOINT_1) * PREHISTORY_COMPRESSION;
    // Add the position of the breakpoint itself
    px += BREAKPOINT_1 * PX_PER_YEAR_CLASSICAL;
    return px;
  }

  // Part 2: Main historical period (-1000 BCE to 1500 CE)
  if (ce < BREAKPOINT_2) {
    px = ce * PX_PER_YEAR_CLASSICAL;
    return px;
  }

  // Part 3: Modern era (after 1500 CE)
  // Calculate the position of the breakpoint first
  const breakpoint2_px = BREAKPOINT_2 * PX_PER_YEAR_CLASSICAL;
  // Then add the expanded distance from that breakpoint
  px = breakpoint2_px + (ce - BREAKPOINT_2) * PX_PER_YEAR_POST_1500;
  return px;
}

// Helper function to find the midpoint year for a PCM dot.
export function midOf(p) {
  if (!p?.era_ref) return 0;
  const { start_ce, end_ce } = p.era_ref;
  if (start_ce === undefined || end_ce === undefined) return 0;

  // For very long eras, place the dot near the start, not in the deep past.
  if (end_ce - start_ce > 10000) {
    return Math.max(start_ce, -5000) + 1000;
  }

  return start_ce + (end_ce - start_ce) / 2;
}
