import React, { useState } from "react";

function Join() {
  const [room, setRoom] = useState(null);

  const onSubmit = () => {
    window.location.assign(`/video/${room}`);
  };

  return (
    <div>
      <input type="text" onChange={(e) => setRoom(e.target.value)} />
      <button onClick={onSubmit}>Submit</button>
    </div>
  );
}

export default Join;
