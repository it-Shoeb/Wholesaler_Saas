import React from "react";

export default function FormBase({ children, title, onSubmit, enctype }) {
  return (
    <>
      <div className="h-[calc(100vh-150px)]">
        <p className="title text-lg">{title}</p>
        <form
          action=""
          onSubmit={onSubmit}
          enctype={enctype || ""}
          className="h-full flex flex-col gap-2"
        >
          {children}
        </form>
      </div>
    </>
  );
}
