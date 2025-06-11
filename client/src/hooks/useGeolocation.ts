import { useEffect, useState } from 'react'

interface GeoData {
  latitude: number | null
  longitude: number | null
  error: string | null
  loading: boolean
}

export function useGeolocation(): GeoData {
  const [data, setData] = useState<GeoData>({ latitude: null, longitude: null, error: null, loading: true })

  useEffect(() => {
    if (!('geolocation' in navigator)) {
      setData(prev => ({ ...prev, error: 'Geolocation not supported', loading: false }))
      return
    }

    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords
        setData({ latitude, longitude, error: null, loading: false })
      },
      err => {
        setData(prev => ({ ...prev, error: err.message, loading: false }))
      },
      { enableHighAccuracy: true }
    )
  }, [])

  return data
} 