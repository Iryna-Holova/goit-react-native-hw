export const fetchFullAddress = async (coords) => {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${Object.values(
      coords
    ).join(",")}&key=AIzaSyCY6Y3inHOZNTnA_wVS2aVmbyGihJWZcRY`
  );

  const data = await response.json();

  if (data.status === "OK" && data.results.length > 0) {
    const components = data.results[0].address_components;

    const street =
      components.find((c) => c.types.includes("route"))?.short_name || "";
    const city =
      components.find((c) => c.types.includes("locality"))?.long_name || "";
    const region =
      components.find((c) => c.types.includes("administrative_area_level_1"))
        ?.long_name || "";
    const country =
      components.find((c) => c.types.includes("country"))?.long_name || "";

    return [street, city, region, country].filter(Boolean).join(", ");
  }
  return "Unknown address";
};
