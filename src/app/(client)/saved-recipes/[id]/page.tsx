import React from "react";

function Recipe({ params }: { params: { id: string } }) {
  return (
    <div>
      ID page
      <div>{params.id}</div>
    </div>
  );
}

export default Recipe;
