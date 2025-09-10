import React, { useState } from "react";

const GenderCheckbox = () => {
  const [selectedGender, setSelectedGender] = useState(null);
  return (
    <div className="flex mt-2 space-x-2">
      <div className="form-control">
        <label className={`label gap-2 cursor-pointer`}>
          <span className="label-text">Male</span>
          <input
            type="checkbox"
            onChange={() => setSelectedGender("male")}
            checked={selectedGender === "male"}
            className="checkbox border-slate-900"
          />
        </label>
      </div>
      <div className="form-control">
        <label className={`label gap-2 cursor-pointer`}>
          <span className="label-text">Female</span>
          <input
            type="checkbox"
            onChange={() => setSelectedGender("female")}
            checked={selectedGender === "female"}
            className="checkbox border-slate-900"
          />
        </label>
      </div>
    </div>
  );
};

export default GenderCheckbox;
