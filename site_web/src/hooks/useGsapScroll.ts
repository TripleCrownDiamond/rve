import { useEffect, type RefObject } from 'react';
import { useReducedMotion } from 'motion/react';

type Direction = 'rise' | 'left' | 'right' | 'scale' | 'photo';

/** Entrées brèves déclenchées au défilement sur les éléments éditoriaux. */
export function useGsapScroll(scope: RefObject<HTMLElement | null>) {
  const mouvementReduit = useReducedMotion();

  useEffect(() => {
    if (mouvementReduit || !scope.current) return;

    let actif = true;
    let context: { revert: () => void } | undefined;
    void Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(([moduleGsap, moduleScroll]) => {
      if (!actif || !scope.current) return;
      const gsap = moduleGsap.default;
      gsap.registerPlugin(moduleScroll.ScrollTrigger);

      context = gsap.context(() => {
        scope.current?.querySelectorAll<HTMLElement>('[data-scroll]').forEach((element) => {
          const direction = (element.dataset.scroll || 'rise') as Direction;
          const depart = {
            rise: { y: 24, opacity: 0 },
            left: { x: -24, opacity: 0 },
            right: { x: 24, opacity: 0 },
            scale: { scale: 0.88, opacity: 0 },
            photo: { scale: 1.035, opacity: 0 },
          }[direction];

          gsap.fromTo(element, depart, {
            x: 0,
            y: 0,
            scale: 1,
            opacity: 1,
            duration: 0.25,
            ease: 'power2.out',
            clearProps: 'transform,opacity',
            scrollTrigger: {
              trigger: element,
              start: 'top 88%',
              once: true,
            },
          });
        });
      }, scope);
    });

    return () => {
      actif = false;
      context?.revert();
    };
  }, [scope, mouvementReduit]);
}
