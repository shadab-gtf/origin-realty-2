"use client";

import { useEffect, useState } from "react";

export default function GrainBG() {
  const [size, setSize] = useState({ w: 1920, h: 1080 });

  useEffect(() => {
    const update = () =>
      setSize({ w: window.innerWidth, h: window.innerHeight });

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <div className="grain-layer absolute inset-0 z-0 bg-auto bg-no-repeat w-full"  style={{
          backgroundImage: "url(/gggrain.svg) ",
        }}>
     
    
       
    </div>
  );
}
