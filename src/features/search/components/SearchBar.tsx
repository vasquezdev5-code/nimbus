import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, Loader2, X, Navigation } from "lucide-react";
import { useCitySearch } from "@/features/weather/hooks/useWeather";
import { useDebounce } from "@/hooks/useDebounce";
import { cn } from "@/lib/utils";
import type { GeocodingResult } from "@/types";

interface SearchBarProps {
  onSelect: (location: GeocodingResult) => void;
  onGeolocate: () => void;
  geolocating?: boolean;
  className?: string;
}

export function SearchBar({ onSelect, onGeolocate, geolocating, className }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const debouncedQuery = useDebounce(query, 350);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { data: results = [], isFetching } = useCitySearch(debouncedQuery);

  const showDropdown = open && debouncedQuery.length > 1;

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (!containerRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function handleSelect(loc: GeocodingResult) {
    onSelect(loc);
    setQuery("");
    setOpen(false);
    inputRef.current?.blur();
  }

  function handleClear() {
    setQuery("");
    inputRef.current?.focus();
  }

  return (
    <div ref={containerRef} className={cn("relative w-full max-w-xl", className)}>
      <div
        className={cn(
          "flex items-center gap-2 h-12 px-4 rounded-2xl transition-all duration-200",
          "bg-surface-raised border border-border",
          "focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/20",
          "shadow-sm"
        )}
      >
        {isFetching ? (
          <Loader2 className="h-4 w-4 text-muted-foreground shrink-0 animate-spin" />
        ) : (
          <Search className="h-4 w-4 text-muted-foreground shrink-0" />
        )}

        <input
          ref={inputRef}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder="Search city or location…"
          className={cn(
            "flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground",
            "outline-none border-none"
          )}
          aria-label="Search for a city"
          autoComplete="off"
          spellCheck={false}
        />

        <div className="flex items-center gap-1">
          {query && (
            <button
              onClick={handleClear}
              className="rounded-full p-1 hover:bg-accent transition-colors"
              aria-label="Clear search"
            >
              <X className="h-3.5 w-3.5 text-muted-foreground" />
            </button>
          )}

          <div className="w-px h-4 bg-border mx-0.5" />

          <button
            onClick={onGeolocate}
            disabled={geolocating}
            className={cn(
              "rounded-xl p-1.5 transition-colors",
              "hover:bg-accent text-muted-foreground hover:text-foreground",
              geolocating && "opacity-50 cursor-not-allowed"
            )}
            aria-label="Use my location"
          >
            {geolocating ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Navigation className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {showDropdown && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className={cn(
              "absolute top-full mt-2 left-0 right-0 z-50",
              "rounded-2xl border border-border shadow-xl",
              "bg-popover overflow-hidden"
            )}
          >
            {results.length === 0 && !isFetching ? (
              <div className="flex items-center gap-3 px-4 py-3.5 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 shrink-0" />
                No locations found for "{debouncedQuery}"
              </div>
            ) : (
              <ul role="listbox" aria-label="City suggestions">
                {results.map((loc, i) => (
                  <li key={loc.id} role="option" aria-selected={false}>
                    <button
                      onClick={() => handleSelect(loc)}
                      className={cn(
                        "w-full flex items-start gap-3 px-4 py-3 text-left",
                        "hover:bg-accent transition-colors text-sm",
                        i !== results.length - 1 && "border-b border-border"
                      )}
                    >
                      <MapPin className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                      <div className="min-w-0">
                        <p className="font-medium text-foreground truncate">{loc.name}</p>
                        <p className="text-xs text-muted-foreground truncate">
                          {[loc.admin1, loc.country].filter(Boolean).join(", ")}
                        </p>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
