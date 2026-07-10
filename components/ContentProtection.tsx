"use client";

import { useEffect } from "react";

function isMediaTarget(target: EventTarget | null) {
  if (!(target instanceof Element)) {
    return false;
  }

  return Boolean(target.closest("img, picture, video, canvas"));
}

export function ContentProtection() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      return;
    }

    function onContextMenu(event: MouseEvent) {
      if (isMediaTarget(event.target)) {
        event.preventDefault();
      }
    }

    function onDragStart(event: DragEvent) {
      if (isMediaTarget(event.target)) {
        event.preventDefault();
      }
    }

    function onKeyDown(event: KeyboardEvent) {
      const key = event.key.toLowerCase();
      const modifier = event.ctrlKey || event.metaKey;
      const shift = event.shiftKey;

      const blocked =
        event.key === "F12" ||
        (modifier && key === "u") ||
        (modifier && key === "s") ||
        (modifier && shift && (key === "i" || key === "j" || key === "c"));

      if (blocked) {
        event.preventDefault();
      }
    }

    document.addEventListener("contextmenu", onContextMenu);
    document.addEventListener("dragstart", onDragStart);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("contextmenu", onContextMenu);
      document.removeEventListener("dragstart", onDragStart);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return null;
}
