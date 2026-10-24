export default function formatDateRange(startIso, endIso) {
  const startDate = new Date(startIso);
  const endDate = new Date(endIso);
  const startMonth = startDate.toLocaleString("en-US", {
    month: "long",
    timeZone: "UTC",
  });
  const endMonth = endDate.toLocaleString("en-US", {
    month: "long",
    timeZone: "UTC",
  });
  const startYear = startDate.getUTCFullYear();
  const endYear = endDate.getUTCFullYear();

  let totalMonths =
    (endYear - startYear) * 12 +
    (endDate.getUTCMonth() - startDate.getUTCMonth());

  const dayDiff = endDate.getUTCDate() - startDate.getUTCDate();
  if (dayDiff >= 15) {
    totalMonths += 1;
  }

  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  let durationParts = [];
  if (years > 0) {
    durationParts.push(`${years} ${years > 1 ? "years" : "year"}`);
  }
  if (months > 0) {
    durationParts.push(`${months} ${months > 1 ? "mos" : "mo"}`);
  }

  const durationStr = durationParts.join(" ") || "0 mos";

  return `${startMonth} ${startYear} - ${endMonth} ${endYear} . ${durationStr}`;
}
