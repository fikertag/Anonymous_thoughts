"use client";

import { useState, useRef, useEffect } from "react";
import Roast from "./Rost";
import { useInsults } from "@/context/InsultContext";
import { useComments } from "@/context/Comment";

export default function Roasts() {
  const { insults, addInsult, isLoadingInsults, insultsError } = useInsults();
  const { setIsComment } = useComments();
  const [newInsult, setNewInsult] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [newInsult]);

  const handlesubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    addInsult(newInsult)
      .then(() => {
        setNewInsult("");
        setError(null); // Clear any previous error
      })
      .catch((err) => {
        setError("Failed to add insult. Please try again.");
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div onClick={() => setIsComment("")} className="text-foreground w-full">
      <form
        onSubmit={handlesubmit}
        className="rounded-xl border border-foreground/10 bg-foreground/5 p-4"
      >
        <div className="flex items-center justify-between">
          <div className="text-sm font-medium text-white">Post a gossip</div>
          <div className="text-xs text-foreground/70">
            {newInsult.length}/400
          </div>
        </div>
        <textarea
          ref={textareaRef}
          placeholder="write your gossip here..."
          className="mt-3 overflow-y-hidden bg-transparent border border-foreground/15 rounded-lg px-3 py-2 text-sm resize-none flex-grow focus:outline-none focus:ring-2 focus:ring-foreground/20 h-10 w-full text-white placeholder:text-foreground/60"
          value={newInsult}
          onChange={(e) => {
            if (e.target.value.length > 399) return; // Prevent input beyond 350 chars
            setNewInsult(e.target.value);
            if (textareaRef.current) {
              textareaRef.current.style.height = "auto";
              textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
            }
          }}
        />
        <div className="mt-3 flex items-center justify-between gap-3">
          <button
            type="submit"
            disabled={!newInsult.trim() || loading}
            className={`inline-flex items-center justify-center gap-2 rounded-lg border px-4 py-2 text-sm transition-colors ${
              !newInsult.trim() || loading
                ? "border-foreground/10 text-foreground/50 cursor-not-allowed"
                : "border-foreground/20 text-white hover:bg-foreground/5"
            }`}
          >
            {loading ? "Posting…" : "Gossip"}
            {loading ? <span className="spinner text-white/80" /> : null}
          </button>
          {error ? <div className="text-xs text-red-400">{error}</div> : null}
        </div>
      </form>

      <div className="mt-5 flex flex-col gap-2">
        {insultsError ? (
          <div className="rounded-lg border border-foreground/10 bg-foreground/5 px-4 py-3 text-sm text-foreground">
            {insultsError}
          </div>
        ) : null}

        {isLoadingInsults ? (
          <div className="flex flex-col gap-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="animate-pulse rounded-xl border border-foreground/10 bg-foreground/5 p-4"
              >
                <div className="h-3 w-24 rounded bg-foreground/10" />
                <div className="mt-3 h-4 w-full rounded bg-foreground/10" />
                <div className="mt-2 h-4 w-5/6 rounded bg-foreground/10" />
                <div className="mt-4 h-3 w-40 rounded bg-foreground/10" />
              </div>
            ))}
          </div>
        ) : (
          insults.map((insult) => (
            <div key={insult._id}>
              <Roast insult={insult} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
