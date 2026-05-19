import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/Skeleton";

export function WeatherSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-5"
    >
      {/* Hero skeleton */}
      <Skeleton className="h-64 w-full rounded-3xl" />

      {/* Hourly */}
      <div>
        <Skeleton className="h-3 w-32 mb-3 rounded-full" />
        <div className="flex gap-2 overflow-hidden">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-28 w-[72px] shrink-0 rounded-2xl" />
          ))}
        </div>
      </div>

      {/* Daily */}
      <div>
        <Skeleton className="h-3 w-32 mb-3 rounded-full" />
        <div className="rounded-2xl overflow-hidden divide-y divide-border">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4 px-4 py-3.5">
              <Skeleton className="h-4 w-16 rounded-full" />
              <Skeleton className="h-5 w-5 rounded" />
              <Skeleton className="h-2 flex-1 rounded-full" />
              <Skeleton className="h-4 w-10 rounded-full" />
            </div>
          ))}
        </div>
      </div>

      {/* Details */}
      <div>
        <Skeleton className="h-3 w-24 mb-3 rounded-full" />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-24 rounded-2xl" />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
