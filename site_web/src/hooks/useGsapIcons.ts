import { useEffect, type RefObject } from 'react';
import { useReducedMotion } from 'motion/react';

/** Rotation et halo de proximité, limités aux petits pictogrammes. */
export function useGsapIcons(scope: RefObject<HTMLElement | null>) {
  const mouvementReduit = useReducedMotion();

  useEffect(() => {
    if (mouvementReduit || !scope.current) return;

    let actif = true;
    let context: { revert: () => void } | undefined;
    const listeners: Array<() => void> = [];
    // Le code GSAP est chargé à la demande ; les pages internes restent légères.
    void Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(([moduleGsap, moduleScroll]) => {
      if (!actif || !scope.current) return;
      const gsap = moduleGsap.default;
      gsap.registerPlugin(moduleScroll.ScrollTrigger);
      context = gsap.context(() => {
        scope.current?.querySelectorAll<HTMLElement>('.rve-gsap-icon').forEach((tile) => {
          const icon = tile.querySelector<SVGElement>('svg');
          if (!icon) return;

          const glow = tile.dataset.gsapGlow;
          const trigger = tile.closest<HTMLElement>('button, a') ?? tile;
          const couleur = glow?.startsWith('var(')
            ? getComputedStyle(tile).getPropertyValue(glow.slice(4, -1)).trim()
            : glow;
          const [r, g, b] = couleur ? gsap.utils.splitColor(couleur) : [0, 0, 0];
          const halo = couleur ? `0 0 18px 2px rgba(${r}, ${g}, ${b}, 0.55)` : 'none';

          const entree = gsap.timeline({
            scrollTrigger: { trigger: tile, start: 'top 88%', once: true },
          });
          entree.fromTo(icon,
            { rotation: -24, scale: 0.8 },
            { rotation: 0, scale: 1, duration: 0.25, ease: 'power2.out' },
          );
          if (couleur) {
            entree.to(tile, { boxShadow: halo, duration: 0.2, ease: 'power2.out' }, 0.06)
              .to(tile, { boxShadow: '0 0 0 0 transparent', duration: 0.2 }, 0.26);
          }

          const activer = () => {
            gsap.to(icon, { rotation: 12, scale: 1.14, duration: 0.2, ease: 'power2.out', overwrite: 'auto' });
            if (couleur) gsap.to(tile, { boxShadow: halo, duration: 0.2, overwrite: 'auto' });
          };
          const desactiver = () => {
            gsap.to(icon, { rotation: 0, scale: 1, duration: 0.2, ease: 'power2.out', overwrite: 'auto' });
            if (couleur) gsap.to(tile, { boxShadow: '0 0 0 0 transparent', duration: 0.2, overwrite: 'auto' });
          };

          trigger.addEventListener('pointerenter', activer);
          trigger.addEventListener('pointerleave', desactiver);
          trigger.addEventListener('focusin', activer);
          trigger.addEventListener('focusout', desactiver);
          listeners.push(() => {
            trigger.removeEventListener('pointerenter', activer);
            trigger.removeEventListener('pointerleave', desactiver);
            trigger.removeEventListener('focusin', activer);
            trigger.removeEventListener('focusout', desactiver);
            gsap.killTweensOf([icon, tile]);
          });
        });
      }, scope);
    });

    return () => {
      actif = false;
      listeners.forEach((retirer) => retirer());
      context?.revert();
    };
  }, [scope, mouvementReduit]);
}
