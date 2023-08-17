import { Fragment } from "react";
import { useRouter } from "next/router";

import { allEvents, getEventById } from "../../components/helper/api-utils";
import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";
import ErrorAlert from "../../components/ui/error-alert";

function EventDetailPage(props) {
  // const router = useRouter();

  // const eventId = router.query.eventId;
  const event = props.data;

  if (!event) {
    return (
      <ErrorAlert>
        <p>No event found!</p>
      </ErrorAlert>
    );
  }

  return (
    <Fragment>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </Fragment>
  );
}

export async function getStaticProps(context) {
  const findId = context.params.eventId;
  const data = await getEventById(findId);
  return {
    props: {
      data: data,
    },
    revalidate: 10,
  };
}

export async function getStaticPaths(context) {
  const allEvets = await allEvents();
  const createURL = allEvets.map((event) => ({
    params: {
      eventId: event.id,
    },
  }));
  return {
    paths: createURL,
    fallback: true,
  };
}
export default EventDetailPage;
