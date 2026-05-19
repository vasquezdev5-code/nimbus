import { useState, useCallback } from "react";

export interface GeolocationState {
  loading: boolean;
  error: string | null;
  coords: { latitude: number; longitude: number } | null;
}

export function useGeolocation() {
  const [state, setState] = useState<GeolocationState>({
    loading: false,
    error: null,
    coords: null,
  });

  const locate = useCallback(() => {
    if (!navigator.geolocation) {
      setState((s) => ({ ...s, error: "Geolocation is not supported" }));
      return;
    }

    setState({ loading: true, error: null, coords: null });

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setState({
          loading: false,
          error: null,
          coords: { latitude: coords.latitude, longitude: coords.longitude },
        });
      },
      (err) => {
        setState({
          loading: false,
          error: err.message ?? "Unable to retrieve location",
          coords: null,
        });
      },
      { timeout: 10000, maximumAge: 300000 }
    );
  }, []);

  return { ...state, locate };
}
