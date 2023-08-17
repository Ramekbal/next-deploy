export async function allEvents() {
  // console.log("asasas");
  const data = await fetch(
    "https://next-js-bf7e0-default-rtdb.firebaseio.com/events.json"
  );
  const parseJson = await data.json();
  // console.log("parseJson", parseJson);
  const allEvents = [];
  for (const key in parseJson) {
    allEvents.push({
      id: key,
      ...parseJson[key],
    });
  }
  return allEvents;
}

export async function getFeaturedEvents() {
  const data = await allEvents();
  return data.filter((event) => event.isFeatured);
}

export async function getEventById(id) {
  const data = await allEvents();
  return data.find((event) => event.id === id);
}

export async function getFilteredEvents(dateFilter) {
  const { year, month } = dateFilter;
  const data = await allEvents();

  let filteredEvents = data.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

  return filteredEvents;
}
