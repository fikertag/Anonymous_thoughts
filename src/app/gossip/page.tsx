"use client";

import NavBar from "../component/navbar";
import Roasts from "../component/Rosts";
import { useInsults } from "@/context/InsultContext";
import { useComments } from "@/context/Comment";

export default function Gossip() {
  const { isLoadingInsults, insultsError } = useInsults();
  const { isLoadingComments, commentsError } = useComments();

  const isLoading = isLoadingInsults || isLoadingComments;
  const errorMessage = insultsError || commentsError;

  return (
    <div className="bg-background min-h-screen">
      <NavBar />
      <div className="mx-auto max-w-[720px] px-4 pt-20 pb-10">
        {errorMessage ? (
          <div className="rounded-lg border border-foreground/10 bg-foreground/5 px-4 py-3 text-sm text-foreground">
            {errorMessage}
          </div>
        ) : null}

        {/* Always render content; inner components handle skeletons */}
        <div className={isLoading ? "opacity-100" : "opacity-100"}>
          <Roasts />
        </div>
      </div>
    </div>
  );
}
