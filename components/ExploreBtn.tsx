"use client";

import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

const ExploreBtn = () => {
  return (
    <>
      <button
        type="button"
        className="btn mt-7 mx-auto border rounded-sm border-amber-50 px-4 py-2 "
        onClick={() => console.log("CLICKED!")}
      >
        <a href="#events">Explore Events</a>
        <ArrowDownwardIcon className="ml-1" fontSize="small" />
      </button>
    </>
  );
};

export default ExploreBtn;
