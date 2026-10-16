"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

/**
 * The hero's 3D ingredients tumble into the footer when it scrolls into view and
 * pile up on the floor line; visitors can grab and throw them. A tiny circle-physics
 * loop (gravity, floor/wall bounce, pairwise collisions) keeps it dependency-free.
 */

type Sprite = { src: string; size: number; r: number };

const CHILI = { src: "/images/spice-chili.png", r: 0.4 };
const ONION = { src: "/images/spice-onion.png", r: 0.45 };
const LEAF = { src: "/images/spice-leaf.png", r: 0.4 };

/** Drop order, left to right in spirit; mobile takes the first six. */
const SPRITES: Sprite[] = [
  { ...ONION, size: 112 },
  { ...CHILI, size: 128 },
  { ...LEAF, size: 104 },
  { ...ONION, size: 88 },
  { ...CHILI, size: 104 },
  { ...LEAF, size: 120 },
  { ...ONION, size: 100 },
  { ...CHILI, size: 116 },
  { ...LEAF, size: 92 },
  { ...ONION, size: 120 },
].map((s) => ({ ...s, r: s.size * s.r }));

const GRAVITY = 2400;
const BOUNCE = 0.35;
const MAX_SPEED = 2600;
const STEP = 1 / 120;

type Body = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  a: number;
  av: number;
  r: number;
  scale: number;
  active: boolean;
  dragged: boolean;
};

/** Floor is the top edge of the sibling marked data-gu-floor (the footer's bottom bar). */
export default function FooterPlayground() {
  const layerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const layer = layerRef.current;
    const floorEl = layer?.parentElement?.querySelector<HTMLElement>("[data-gu-floor]");
    if (!layer || !floorEl) return;
    const measureFloor = () => floorEl.getBoundingClientRect().top - layer.getBoundingClientRect().top;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = layer.clientWidth;
    let floor = measureFloor();
    const mobile = () => width < 640;

    const bodies: Body[] = SPRITES.map((s) => ({ x: 0, y: -400, vx: 0, vy: 0, a: 0, av: 0, r: s.r, scale: 1, active: false, dragged: false }));

    const applyScale = () => {
      const scale = mobile() ? 0.7 : 1;
      bodies.forEach((b, i) => {
        b.scale = scale;
        b.r = SPRITES[i].r * scale;
        const el = itemRefs.current[i];
        if (el) {
          el.style.width = el.style.height = `${SPRITES[i].size * scale}px`;
          el.style.display = mobile() && i >= 6 ? "none" : "";
        }
      });
    };
    const inPlay = (i: number) => bodies[i].active && !(mobile() && i >= 6);

    const render = () => {
      bodies.forEach((b, i) => {
        const el = itemRefs.current[i];
        if (!el) return;
        const half = (SPRITES[i].size * b.scale) / 2;
        el.style.transform = `translate3d(${b.x - half}px, ${b.y - half}px, 0) rotate(${b.a}rad)`;
      });
    };

    const step = (dt: number) => {
      for (let i = 0; i < bodies.length; i++) {
        const b = bodies[i];
        if (!inPlay(i) || b.dragged) continue;
        b.vy += GRAVITY * dt;
        b.x += b.vx * dt;
        b.y += b.vy * dt;
        b.a += b.av * dt;
        if (b.y + b.r > floor) {
          b.y = floor - b.r;
          b.vy = b.vy > 120 ? -b.vy * BOUNCE : 0;
          b.vx *= 0.94;
          b.av = b.vx / b.r; // roll without slipping
        }
        if (b.x - b.r < 0) {
          b.x = b.r;
          b.vx = Math.abs(b.vx) * BOUNCE;
        } else if (b.x + b.r > width) {
          b.x = width - b.r;
          b.vx = -Math.abs(b.vx) * BOUNCE;
        }
        b.av *= 0.995;
      }
      // A few relaxation passes keep the pile stable
      for (let pass = 0; pass < 3; pass++) {
        for (let i = 0; i < bodies.length; i++) {
          if (!inPlay(i)) continue;
          for (let j = i + 1; j < bodies.length; j++) {
            if (!inPlay(j)) continue;
            const p = bodies[i];
            const q = bodies[j];
            const dx = q.x - p.x;
            const dy = q.y - p.y;
            const min = p.r + q.r;
            const d2 = dx * dx + dy * dy;
            if (d2 >= min * min || d2 === 0) continue;
            const d = Math.sqrt(d2);
            const nx = dx / d;
            const ny = dy / d;
            const overlap = min - d;
            // A dragged body is immovable: it shoves the other one fully
            const wp = p.dragged ? 0 : q.dragged ? 1 : 0.5;
            const wq = 1 - wp;
            p.x -= nx * overlap * wp;
            p.y -= ny * overlap * wp;
            q.x += nx * overlap * wq;
            q.y += ny * overlap * wq;
            const rel = (q.vx - p.vx) * nx + (q.vy - p.vy) * ny;
            if (rel < 0) {
              const j2 = -(1 + BOUNCE) * rel;
              p.vx -= nx * j2 * wp;
              p.vy -= ny * j2 * wp;
              q.vx += nx * j2 * wq;
              q.vy += ny * j2 * wq;
              const spin = (q.vx - p.vx) * -ny + (q.vy - p.vy) * nx;
              p.av -= (spin / p.r) * 0.1 * wp;
              q.av += (spin / q.r) * 0.1 * wq;
            }
          }
        }
      }
    };

    // Spread the drop across the width so the pile lands evenly
    const spawn = (settled: boolean) => {
      const count = mobile() ? 6 : bodies.length;
      bodies.forEach((b, i) => {
        if (i >= count) return;
        b.active = true;
        b.x = ((i + 0.5) / count) * width + (Math.random() - 0.5) * 30;
        b.y = settled ? floor - b.r - 40 : -b.r - 60 - i * 90;
        b.vx = (Math.random() - 0.5) * 160;
        b.vy = 0;
        b.a = Math.random() * Math.PI * 2;
        b.av = (Math.random() - 0.5) * 6;
      });
      if (settled) for (let k = 0; k < 600; k++) step(STEP);
      render();
    };

    let raf = 0;
    let last = 0;
    let acc = 0;
    let visible = false;
    let spawned = false;
    let idleFrames = 0;

    const tick = (t: number) => {
      raf = 0;
      acc += Math.min((t - (last || t)) / 1000, 0.05);
      last = t;
      while (acc >= STEP) {
        step(STEP);
        acc -= STEP;
      }
      render();
      const moving = bodies.some((b, i) => inPlay(i) && (b.dragged || Math.abs(b.vx) + Math.abs(b.vy) > 4 || b.y + b.r < floor - 1));
      idleFrames = moving ? 0 : idleFrames + 1;
      // Sleep once everything rests; any drag wakes the loop again
      if (visible && idleFrames < 30) raf = requestAnimationFrame(tick);
    };
    const wake = () => {
      idleFrames = 0;
      if (!raf) {
        last = 0;
        raf = requestAnimationFrame(tick);
      }
    };

    applyScale();
    render();

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible && !spawned) {
          spawned = true;
          spawn(reduced);
        }
        if (visible && !reduced) wake();
      },
      { threshold: 0.25 },
    );
    io.observe(layer);

    const ro = new ResizeObserver(() => {
      width = layer.clientWidth;
      floor = measureFloor();
      applyScale();
      if (spawned) {
        bodies.forEach((b, i) => {
          if (mobile() && i >= 6) return;
          if (!b.active) {
            // Breakpoint grew: drop the extras in from above
            b.active = true;
            b.x = Math.random() * width;
            b.y = -b.r - 60;
          }
          b.x = Math.min(Math.max(b.x, b.r), width - b.r);
        });
        wake();
      }
    });
    ro.observe(layer);

    // Drag and throw
    let grab: { i: number; dx: number; dy: number; lx: number; ly: number; lt: number } | null = null;
    const local = (e: PointerEvent) => {
      const rect = layer.getBoundingClientRect();
      return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onDown = (i: number) => (e: PointerEvent) => {
      const b = bodies[i];
      if (!b.active) return;
      e.preventDefault();
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
      const p = local(e);
      b.dragged = true;
      b.vx = b.vy = 0;
      grab = { i, dx: b.x - p.x, dy: b.y - p.y, lx: p.x, ly: p.y, lt: performance.now() };
      itemRefs.current[i]?.classList.add("is-grabbed");
      wake();
    };
    const onMove = (e: PointerEvent) => {
      if (!grab) return;
      const b = bodies[grab.i];
      const p = local(e);
      const now = performance.now();
      const dt = Math.max((now - grab.lt) / 1000, 1 / 240);
      // Smoothed pointer velocity becomes the throw velocity on release
      b.vx = b.vx * 0.5 + ((p.x - grab.lx) / dt) * 0.5;
      b.vy = b.vy * 0.5 + ((p.y - grab.ly) / dt) * 0.5;
      b.av = b.vx / b.r / 2;
      b.x = Math.min(Math.max(p.x + grab.dx, b.r), width - b.r);
      b.y = Math.min(p.y + grab.dy, floor - b.r);
      grab.lx = p.x;
      grab.ly = p.y;
      grab.lt = now;
      wake();
    };
    const onUp = () => {
      if (!grab) return;
      const b = bodies[grab.i];
      b.dragged = false;
      const speed = Math.hypot(b.vx, b.vy);
      if (speed > MAX_SPEED) {
        b.vx *= MAX_SPEED / speed;
        b.vy *= MAX_SPEED / speed;
      }
      itemRefs.current[grab.i]?.classList.remove("is-grabbed");
      grab = null;
      wake();
    };

    const cleanups = itemRefs.current.map((el, i) => {
      if (!el) return () => {};
      const down = onDown(i);
      el.addEventListener("pointerdown", down);
      el.addEventListener("pointermove", onMove);
      el.addEventListener("pointerup", onUp);
      el.addEventListener("pointercancel", onUp);
      return () => {
        el.removeEventListener("pointerdown", down);
        el.removeEventListener("pointermove", onMove);
        el.removeEventListener("pointerup", onUp);
        el.removeEventListener("pointercancel", onUp);
      };
    });

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      cleanups.forEach((fn) => fn());
    };
  }, []);

  return (
    <div ref={layerRef} aria-hidden="true" className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
      {SPRITES.map((s, i) => (
        <div
          key={i}
          ref={(el) => {
            itemRefs.current[i] = el;
          }}
          className="gu-toss pointer-events-auto absolute left-0 top-0 touch-none select-none"
          style={{ width: s.size, height: s.size, transform: "translate3d(0,-400px,0)" }}
        >
          <Image src={s.src} alt="" width={512} height={512} sizes="128px" draggable={false} className="h-full w-full" />
        </div>
      ))}
    </div>
  );
}
