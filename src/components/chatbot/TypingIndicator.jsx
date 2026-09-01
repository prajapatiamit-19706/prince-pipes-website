"use client";

import { PrinceLoader } from "@/components/ui/loader/PrinceLoader";

export default function TypingIndicator() {
  return (
    <div className="flex w-full justify-start mt-2 mb-4">
      <div className="bg-surface-2 border border-border-dark rounded-2xl rounded-tl-sm px-6 py-4">
        <PrinceLoader size="sm" variant="button" label="Generating response" />
      </div>
    </div>
  );
}
