// To use gsap with locomotive scroll, we have to use scroller proxy provided with gsap

import  gsap  from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import  { useEffect } from 'react'
import { useLocomotiveScroll } from 'react-locomotive-scroll';

const ScrollTriggerProxy = () => {
    // First let's get instance of locomotive scroll

    const scroll = useLocomotiveScroll();

    //Register scroll trigger plugin
    gsap.registerPlugin(ScrollTrigger);

    useEffect(() => {
        if(scroll){
            const element = scroll?.el; // locomotive scrolling element, in our case it's app (main)

            scroll.on('scroll', ScrollTrigger.update);  //  on scroll of locomotive, update scrolltrigger
            
            // let's use scroller proxy
            ScrollTrigger.scrollerProxy(element, {
                scrollTop(value) {
                  return arguments.length ? scroll.scrollTo(value, 0 , 0) : scroll.scroll.instance.scroll.y;
                },
                getBoundingClientRect() {
                  return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
                },
                pinType: document.querySelector(element).style.transform ? "transform" : "fixed",
              });
        }

        return () => {
            ScrollTrigger.addEventListener("refresh", () => {
                scroll?.update()
            })
            ScrollTrigger.refresh()
        }

    }, [scroll]);
    
    return null;
}

export default ScrollTriggerProxy