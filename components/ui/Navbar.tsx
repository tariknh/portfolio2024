"use client"
import { Button } from '@/components/ui/button'
import { AnimatePresence, motion, stagger, useAnimate } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react'

import gsap from 'gsap'; // <-- import GSAP
import { useGSAP } from '@gsap/react'; // <-- import the hook from our React package
gsap.registerPlugin(useGSAP);



  

const Newnav = () => {
    const [isToggled, setToggle] = useState(false);
    
    const container = useRef();

    const { contextSafe } = useGSAP({ scope: container }); // we can pass in a config object as the 1st parameter to make scoping simple

// ✅ wrapped in contextSafe() - animation will be cleaned up correctly
// selector text is scoped properly to the container.
const onClickGood = contextSafe(() => {
    setToggle(!isToggled)
    gsap.to('.good', { autoAlpha: 1 });
});





  return (
    <nav ref={container.current} className='h-24 flex justify-between fixed w-full text-white items-center p-4'>
        <span>tarik sørensen</span>
        <div className='flex gap-1'>
        <Button onClick={onClickGood} className={`z-20 ${isToggled ? ("text-black border-black"):("text-white border-white")} `} size={"long"} variant={"outline"}>Get in touch</Button>
        <Button className={`z-20 ${isToggled ? ("text-black border-black"):("text-white border-white")} `} onClick={()=>setToggle(!isToggled)} size={"short"} variant={"outline"}>=</Button>
        </div>
       <div className='good hidden bg-purple-400 h-screen'></div>

        
    </nav>
  )
}


export default Newnav
