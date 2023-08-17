import { Fragment } from "react";
import { useRouter } from "next/router";

import { getAllEvents } from "../../dummy-data";
import EventList from "../../components/events/event-list";
import EventsSearch from "../../components/events/events-search";
import { allEvents } from "../../components/helper/api-utils";

function AllEventsPage(props) {
  const router = useRouter();
  const events = props.allEvent;

  function findEventsHandler(year, month) {
    const fullPath = `/events/${year}/${month}`;

    router.push(fullPath);
  }

  return (
    <Fragment>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </Fragment>
  );
}

export async function getStaticProps() {
  const events = await allEvents();
  return {
    props: {
      allEvent: events,
    },
  };
}

export default AllEventsPage;
