import { motion } from "framer-motion";
import { Cloud, MapPin, Navigation } from "lucide-react";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  onGeolocate: () => void;
  geolocating?: boolean;
}

export function EmptyState({ onGeolocate, geolocating }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center justify-center py-24 px-6 text-center"
    >
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="mb-6 relative"
      >
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-sky-200 to-blue-300 dark:from-sky-900/60 dark:to-blue-800/60 flex items-center justify-center shadow-lg">
          <Cloud className="h-12 w-12 text-sky-500 dark:text-sky-400" />
        </div>
        <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-gradient-to-br from-amber-200 to-orange-300 dark:from-amber-900/60 dark:to-orange-800/60 flex items-center justify-center shadow">
          <span className="text-sm">☀️</span>
        </div>
      </motion.div>

      <h2 className="font-display text-2xl font-bold text-foreground mb-2">
        What's the weather like?
      </h2>
      <p className="text-muted-foreground text-sm max-w-xs mb-8 leading-relaxed">
        Search for any city in the world or use your current location to get
        the latest forecast.
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-3">
        <button
          onClick={onGeolocate}
          disabled={geolocating}
          className={cn(
            "flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold",
            "bg-primary text-primary-foreground",
            "hover:bg-primary/90 transition-all duration-200",
            "shadow-lg shadow-primary/25",
            "disabled:opacity-50 disabled:cursor-not-allowed"
          )}
        >
          <Navigation className="h-4 w-4" />
          {geolocating ? "Locating…" : "Use my location"}
        </button>

        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <MapPin className="h-3.5 w-3.5" />
          or search above
        </div>
      </div>
    </motion.div>
  );
}
