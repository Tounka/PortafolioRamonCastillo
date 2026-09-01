import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import "./DriftWall.css";

const columnFactor = (index, variance) => {
  const pseudo = ((index * 0.6180339887 + 0.35) % 1) * 2 - 1;
  return 1 + variance * pseudo;
};

const DriftWall = ({
  items,
  columns = 5,
  tileWidth = 200,
  tileHeight = 132,
  gap = 18,
  radius = 14,
  perspective = 1200,
  speed = 42,
  direction = "up",
  variance = 0.45,
  pauseOnHover = false,
  lift = 64,
  fade = 0.6,
  dim = 0.55,
  grayscale = false,
  overlayColor = "#060010",
  respectReducedMotion = false,
  className = "",
  style
}) => {
  const containerRef = useRef(null);
  const trackRefs = useRef([]);
  const rafRef = useRef(null);
  const offsetsRef = useRef([]);
  const velocitiesRef = useRef([]);
  const hoveredColumnsRef = useRef(new Set());
  const lastTsRef = useRef(null);

  const [containerHeight, setContainerHeight] = useState(() => (
    typeof window !== "undefined" ? window.innerHeight : 600
  ));
  const [activeId, setActiveId] = useState(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (!respectReducedMotion) {
      setReduced(false);
      return undefined;
    }

    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, [respectReducedMotion]);

  const columnItems = useMemo(() => {
    const result = Array.from({ length: columns }, () => []);
    items.forEach((item, index) => result[index % columns].push(item));
    return result.map(column => (column.length ? column : items.slice(0, 1)));
  }, [items, columns]);

  const columnMeta = useMemo(() => {
    const unit = tileHeight + gap;
    return columnItems.map(column => {
      const copyHeight = Math.max(unit, column.length * unit);
      const copies = Math.max(2, Math.ceil((containerHeight * 1.6) / copyHeight) + 1);
      return { copyHeight, copies };
    });
  }, [columnItems, tileHeight, gap, containerHeight]);

  useLayoutEffect(() => {
    if (!containerRef.current) return undefined;
    const observer = new ResizeObserver(([entry]) => {
      setContainerHeight(entry.contentRect.height || 600);
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const baseVelocities = useMemo(() => {
    const directionSign = direction === "up" ? 1 : -1;
    return columnItems.map((_, column) => {
      const alternateSign = column % 2 === 0 ? 1 : -1;
      return speed * columnFactor(column, variance) * directionSign * alternateSign;
    });
  }, [columnItems, speed, direction, variance]);

  useLayoutEffect(() => {
    const previousOffsets = offsetsRef.current;
    const previousVelocities = velocitiesRef.current;

    offsetsRef.current = columnMeta.map((meta, column) => {
      const previous = previousOffsets[column];

      if (Number.isFinite(previous)) {
        return ((previous % meta.copyHeight) + meta.copyHeight) % meta.copyHeight;
      }

      return meta.copyHeight * ((column * 0.37) % 1);
    });

    velocitiesRef.current = columnItems.map((_, column) => (
      Number.isFinite(previousVelocities[column]) ? previousVelocities[column] : 0
    ));
  }, [columnMeta, columnItems]);

  useEffect(() => {
    const animate = timestamp => {
      if (lastTsRef.current === null) lastTsRef.current = timestamp;
      const delta = Math.min(0.05, Math.max(0, timestamp - lastTsRef.current) / 1000);
      lastTsRef.current = timestamp;

      for (let column = 0; column < trackRefs.current.length; column += 1) {
        const meta = columnMeta[column];
        if (!meta) continue;

        const paused = reduced || (pauseOnHover && hoveredColumnsRef.current.has(column));
        const targetVelocity = paused ? 0 : baseVelocities[column];
        const ease = 1 - Math.exp(-delta / (targetVelocity === 0 ? 0.16 : 0.28));
        velocitiesRef.current[column] += (targetVelocity - velocitiesRef.current[column]) * ease;

        let next = (offsetsRef.current[column] || 0) + velocitiesRef.current[column] * delta;
        next = ((next % meta.copyHeight) + meta.copyHeight) % meta.copyHeight;
        offsetsRef.current[column] = next;

        const track = trackRefs.current[column];
        if (track) track.style.transform = "translate3d(0, " + -next + "px, 0)";
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      lastTsRef.current = null;
    };
  }, [baseVelocities, columnMeta, pauseOnHover, reduced]);

  const cssVariables = useMemo(() => ({
    "--dw-tile-w": tileWidth + "px",
    "--dw-tile-h": tileHeight + "px",
    "--dw-gap": gap + "px",
    "--dw-radius": radius + "px",
    "--dw-perspective": perspective + "px",
    "--dw-lift": lift + "px",
    "--dw-dim": dim,
    "--dw-gray": grayscale ? 1 : 0,
    "--dw-overlay": overlayColor,
    "--dw-edge": Math.max(0, (1 - fade) * 100) + "%",
    ...style
  }), [tileWidth, tileHeight, gap, radius, perspective, lift, dim, grayscale, overlayColor, fade, style]);

  const renderTile = (item, id, columnIndex, copyIndex) => (
    <div
      className={"drift-wall__tile" + (activeId === id ? " is-active" : "")}
      data-drift-tile={id}
      key={id}
      role="img"
      aria-label={item.description ? item.title + ": " + item.description : item.title}
      onPointerEnter={() => {
        hoveredColumnsRef.current.add(columnIndex);
        setActiveId(id);
      }}
      onPointerLeave={() => {
        hoveredColumnsRef.current.delete(columnIndex);
        setActiveId(current => current === id ? null : current);
      }}
    >
      <span className="drift-wall__inner">
        <img
          src={item.image}
          alt=""
          loading={copyIndex === 0 ? "eager" : "lazy"}
          decoding="async"
          draggable={false}
        />
        <span className="drift-wall__overlay" aria-hidden="true" />
        <span className="drift-wall__details" aria-hidden={activeId !== id}>
          <strong>{item.title}</strong>
          <span>{item.description}</span>
        </span>
      </span>
    </div>
  );

  const rootClass = ["drift-wall", reduced ? "drift-wall--reduced" : "", className].filter(Boolean).join(" ");

  return (
    <div
      ref={containerRef}
      className={rootClass}
      style={cssVariables}
      onPointerLeave={() => {
        hoveredColumnsRef.current.clear();
        setActiveId(null);
      }}
      role="group"
      aria-label="Muro animado de tecnologias"
    >
      <div className="drift-wall__plane">
        {columnItems.map((column, columnIndex) => {
          const meta = columnMeta[columnIndex];
          const copies = Array.from({ length: meta.copies });
          return (
            <div className="drift-wall__column" key={"column-" + columnIndex}>
              <div className="drift-wall__track" ref={element => {
                trackRefs.current[columnIndex] = element;
              }}>
                {copies.map((_, copyIndex) =>
                  column.map((item, itemIndex) =>
                    renderTile(item, columnIndex + "-" + copyIndex + "-" + itemIndex, columnIndex, copyIndex)
                  )
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DriftWall;





