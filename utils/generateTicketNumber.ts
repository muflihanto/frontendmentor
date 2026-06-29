export function generateTicketNumber(): number {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000);
  return parseInt(
    (timestamp.toString().slice(-4) + random.toString().padStart(3, "0")).slice(
      0,
      5,
    ),
  );
}
