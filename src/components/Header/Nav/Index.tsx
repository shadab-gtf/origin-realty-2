"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { height } from "../Anim";
import Body from "./Body/Index";
import Footer from "./Footer/Index";
// import Image from "./Images/Index";
import MaskedImage from "./Images/Index";

type LinkItem = {
  title: string;
  href: string;
  src: string;
};




const links: LinkItem[] = [
  { title: "About Us", href: "/", src: "img-2.jpeg" },
  { title: "Expertise", href: "/", src: "img-3.jpeg" },
  { title: "Leadership", href: "/", src: "img-4.jpeg" },
  { title: "Contact", href: "/contact", src: "img-1.jpg" },
];

type SelectedLink = {
  isActive: boolean;
  index: number;
};

export default function Index() {
  const [selectedLink, setSelectedLink] = useState<SelectedLink>({
    isActive: false,
    index: 0,
  });

  return (
    <motion.div
      variants={height}
      initial="initial"
      animate="enter"
      exit="exit"
      className="overflow-hidden bg-[#231F20] z-60 relative"
    >
      <div
        className="
          flex gap-12.5 mb-20
          min-[1000px]:mb-0
          min-[1000px]:justify-between
          
        "
      >
        <div className="flex flex-col justify-between ">
          <Body
            links={links}
            selectedLink={selectedLink}
            setSelectedLink={setSelectedLink}
          />
          <Footer />
        </div>

        <MaskedImage
          src={links[selectedLink.index].src}
          isActive={selectedLink.isActive}
          index={selectedLink.index}
        />
      </div>
    </motion.div>
  );
}
