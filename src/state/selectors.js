import { midOf } from "../utils/eraScale";

// Using "export default" to make the import clear.
export default function matchesFilters(p, f) {
  // --- REGION, SCOPE, & FOUNDATIONAL LOGIC ---
  if (f.regions.size > 0) {
    let isVisible = false;
    for (const regionFilter of f.regions) {
      if (p.region_id === regionFilter) isVisible = true;
      if (p.scope === regionFilter) isVisible = true;
    }
    const hasRegionalFilter = [...f.regions].some((r) =>
      ["W", "EA", "IN"].includes(r)
    );
    if (hasRegionalFilter && p.region_id === "F") {
      isVisible = true;
    }
    if (!isVisible) return false;
  }

  // --- OTHER FILTERS ---
  if (f.families.size) {
    const p_families =
      p.family_ids || (p.family_id ? p.family_id.split(" + ") : []);
    if (!p_families.some((pf) => f.families.has(pf))) return false;
  }
  if (f.streams.size && p.stream_id && !f.streams.has(p.stream_id))
    return false;
  if (f.types.size) {
    const p_types = p.type ? p.type.split(" / ") : [];
    if (!p_types.some((pt) => f.types.has(pt))) return false;
  }
  const mid = midOf(p);
  if (mid < f.time.start_ce || mid > f.time.end_ce) return false;
  if (f.query) {
    const hay = (
      p.id +
      " " +
      p.name +
      " " +
      (p.description || "") +
      " " +
      (p.artifact || "")
    ).toLowerCase();
    if (!hay.includes(f.query.toLowerCase())) return false;
  }
  return true;
}
