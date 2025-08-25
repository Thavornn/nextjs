export default function ErrorPage() {
  if (typeof window === "undefined") {
    if (process.env.NODE_ENV === "production") {
      setTimeout(() => {
        process.exit(1);
      }, 1000);
    }
  }

  return <div>Server will crash if you open this in production</div>;
}
