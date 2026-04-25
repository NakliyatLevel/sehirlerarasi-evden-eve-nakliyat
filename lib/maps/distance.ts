export async function calculateDistance(from: string, to: string) {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY

  if (!apiKey) {
    throw new Error('Google Maps API key not configured')
  }

  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/distancematrix/json?` +
      `origins=${encodeURIComponent(from)}&` +
      `destinations=${encodeURIComponent(to)}&` +
      `key=${apiKey}&` +
      `language=tr`
    )

    const data = await response.json()

    if (data.status === 'OK' && data.rows[0]?.elements[0]?.status === 'OK') {
      const element = data.rows[0].elements[0]
      return {
        distance: element.distance.value, // meters
        distanceKm: Math.round(element.distance.value / 1000),
        duration: element.duration.value, // seconds
        distanceText: element.distance.text,
        durationText: element.duration.text,
      }
    }

    throw new Error('Distance calculation failed')
  } catch (error) {
    throw error
  }
}
