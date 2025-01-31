"use client"
import TokenList from "@/components/TokenList";

export default function Home() {
  return (
    <div className="p-6 bg-black min-h-screen flex flex-col space-y-4">
      <TokenList />
    </div>
  );
}
