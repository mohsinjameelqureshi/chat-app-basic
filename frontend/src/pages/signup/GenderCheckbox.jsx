import React, { useState } from "react";

const GenderCheckbox = ({ inputs, setInputs }) => {
  return (
    <div className="flex mt-2 space-x-2">
      <div className="form-control">
        <label
          className={`label gap-2 cursor-pointer ${
            inputs.gender === "male" ? "selected" : ""
          }`}
        >
          <span className="label-text">Male</span>
          <input
            type="checkbox"
            onChange={() => setInputs({ ...inputs, gender: "male" })}
            checked={inputs.gender === "male"}
            className="checkbox border-slate-900"
          />
        </label>
      </div>
      <div className="form-control">
        <label
          className={`label gap-2 cursor-pointer ${
            inputs.gender === "female" ? "selected" : ""
          }`}
        >
          <span className="label-text">Female</span>
          <input
            type="checkbox"
            onChange={() => setInputs({ ...inputs, gender: "female" })}
            checked={inputs.gender === "female"}
            className="checkbox border-slate-900"
          />
        </label>
      </div>
    </div>
  );
};

export default GenderCheckbox;
