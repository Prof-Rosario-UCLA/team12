import { useEffect, useState } from 'react'

interface Store {
  id: number
  name: string
  lat: number
  lon: number
  distance: number
}

interface NearbyStoresData {
  stores: Store[]
  loading: boolean
  error: string | null
}

export function useNearbyStores(latitude: number | null, longitude: number | null): NearbyStoresData {
  const [data, setData] = useState<NearbyStoresData>({ stores: [], loading: false, error: null })

  useEffect(() => {
    if (latitude === null || longitude === null) return

    const controller = new AbortController()
    setData({ stores: [], loading: true, error: null })

    const radius = 5000
    const query = `[out:json];node["shop"="supermarket"](around:${radius},${latitude},${longitude});out;`
    const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`

    fetch(url, { signal: controller.signal })
      .then(res => res.json())
      .then(json => {
        const haversine = (lat1: number, lon1: number, lat2: number, lon2: number) => {
          const toRad = (v: number) => (v * Math.PI) / 180
          const R = 6371
          const dLat = toRad(lat2 - lat1)
          const dLon = toRad(lon2 - lon1)
          const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2
          return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
        }

        const stores = (json.elements || [])
          .filter((el: any) => el.tags && el.tags.name)
          .map((el: any) => {
            const dKm = haversine(latitude, longitude, el.lat, el.lon)
            const dMi = dKm * 0.621371
            return { id: el.id, name: el.tags.name, lat: el.lat, lon: el.lon, distance: dMi }
          })
          .sort((a: Store, b: Store) => a.distance - b.distance)
          .slice(0, 15)

        setData({ stores, loading: false, error: null })
      })
      .catch(err => {
        if (err.name === 'AbortError') return
        setData({ stores: [], loading: false, error: err.message })
      })

    return () => controller.abort()
  }, [latitude, longitude])

  return data
} 