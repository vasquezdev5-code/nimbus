import { motion } from "framer-motion";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-20 px-6 text-center"
    >
      <div className="w-16 h-16 rounded-2xl bg-destructive/10 flex items-center justify-center mb-4">
        <AlertTriangle className="h-8 w-8 text-destructive" />
      </div>
      <h3 className="font-display text-lg font-bold text-foreground mb-1">
        Something went wrong
      </h3>
      <p className="text-sm text-muted-foreground mb-6 max-w-xs">
        {message ?? "Unable to fetch weather data. Please check your connection and try again."}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-secondary hover:bg-accent transition-colors"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          Try again
        </button>
      )}
    </motion.div>
  );
}
