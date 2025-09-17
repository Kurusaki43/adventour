export function getCSSVar(name: string): string {
  const value = getComputedStyle(document.documentElement).getPropertyValue(
    name
  );
  return value.trim();
}
