"use client";
import React, { Suspense } from "react";
import EditForm from "./EditForm";

export default function Page() {
  return (
    <Suspense fallback={<div>กำลังโหลด...</div>}>
      <EditForm />
    </Suspense>
  );
}
