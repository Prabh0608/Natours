const mapBox = document.getElementById('map');
const locations = JSON.parse(mapBox.dataset.locations);

const map = L.map('map', {
  scrollWheelZoom: false,
});

L.tileLayer(
  'https://cartodb-basemaps-a.global.ssl.fastly.net/light_all/{z}/{x}/{y}{r}.png',
  {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    subdomains: 'abcd',
    maxZoom: 18,
  },
).addTo(map);

const bounds = [];

locations.forEach((loc) => {
  const [lat, lng] = loc.coordinates;
  L.marker([lng, lat])
    .addTo(map)
    .bindPopup(`<p>${loc.description}</p>`, { autoClose: false })
    .openPopup();

  bounds.push([lng, lat]);
});

map.fitBounds(bounds, {
  padding: [100, 100],
});
