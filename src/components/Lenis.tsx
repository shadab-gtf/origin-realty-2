"use client"
import React from 'react'
import gsap from "gsap"
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef } from 'react';
import {ReactLenis, LenisRef} from "lenis/react";
// import 'lenis/dist/lenis.css';
gsap.registerPlugin(ScrollTrigger);
const LenisSmoothScroll = () => {
const lenisRef = useRef <LenisRef | null> (null);
useEffect(()=>{
const update = (time:number)=>{
    lenisRef.current?.lenis?.raf(time * 3000)
}
gsap.ticker.add(update)
ScrollTrigger.refresh();
return ()=> gsap.ticker.remove(update)
},[]);

  return  <ReactLenis root options={{autoRaf:false, duration:1.2, touchMultiplier:2}} ref={lenisRef} />
}

export default LenisSmoothScroll
