import { memo } from "react";

function MemoComp({ nama }) {
  console.log("MemoComp render");
  return <div>Halo {nama}</div>;
}

export default memo(MemoComp);
