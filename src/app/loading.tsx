export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bone">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 border-4 border-onyx border-t-electric rounded-full animate-spin mx-auto" />
        <p className="text-graphite">Loading...</p>
      </div>
    </div>
  );
}
