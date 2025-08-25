export default function ErrorPage() {
  if (typeof window === "undefined") {
    // Server-side only
    process.exit(1); // 💀 Kill Next.js process
  }

  return <div>Server should crash now</div>;
}
