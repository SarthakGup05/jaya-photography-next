"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";

/**
 * ---------------------------------------------------------
 * ✅ Reusable Modal Component (Next.js Client Component)
 * ---------------------------------------------------------
 * Supports both controlled & uncontrolled modes:
 * 
 * - Controlled: pass `open` and `onOpenChange`
 * - Uncontrolled: omit both, internal state is used
 * - `children` can be a ReactNode or a render function
 *   that receives `{ close }` helper
 */
export const Modal = ({
  open,            // controlled open state (optional)
  onOpenChange,    // controlled setter     (optional)
  trigger,         // trigger element (button, etc.)
  title,
  description,
  children,        // can be ReactNode or function({ close })
  footer,
  className,
  ...props
}) => {
  // internal state for uncontrolled usage
  const [internalOpen, setInternalOpen] = useState(false);

  const controlled = typeof open === "boolean";
  const isOpen = controlled ? open : internalOpen;
  const setOpen = controlled ? onOpenChange : setInternalOpen;

  // Helper passed to children so they can close the modal
  const close = () => setOpen(false);

  return (
    <Dialog open={isOpen} onOpenChange={setOpen} {...props}>
      {/* Trigger (optional) */}
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}

      <DialogContent className={className}>
        {(title || description) && (
          <DialogHeader>
            {title && <DialogTitle>{title}</DialogTitle>}
            {description && <DialogDescription>{description}</DialogDescription>}
          </DialogHeader>
        )}

        {/* Modal body */}
        <div className="py-4">
          {typeof children === "function" ? children({ close }) : children}
        </div>

        {/* Optional footer */}
        {footer && <DialogFooter>{footer}</DialogFooter>}
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
