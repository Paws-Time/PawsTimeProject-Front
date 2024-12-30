import React from "react";
type MapInfo = {
  name: string;
  address: string;
  tel: string;
};
function Mapdetail({ name, address, tel }: MapInfo) {
  console.log(name, address, tel);
  return (
    <div>
      <h2>{name}</h2>
      <p>{address}</p>
      <p>{tel}</p>
    </div>
  );
}

export default Mapdetail;
