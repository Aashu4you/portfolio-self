"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export function Preloader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(false), 1800);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.7 } }}
        >
          <div className="text-center">
            <motion.div
              className="preloader-logo"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 1.2, repeat: Infinity }}
            >
              AS
            </motion.div>
            <div className="preloader-bar">
              <motion.span initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }} />
            </div>
            <p className="font-mono text-sm tracking-widest text-white/40">{"// Loading portfolio..."}</p>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
