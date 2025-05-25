import React from "react";

export default function FormBase({ title, onSubmit, children, enctype }) {
  return (
    <>
      <div className="">
        <p className="title">{title}</p>
        <form action="" onSubmit={onSubmit} enctype={enctype || ""}>
          {children}
          <div className="">
            <input type="submit" value={title} />
          </div>
        </form>
      </div>
    </>
  );
}
