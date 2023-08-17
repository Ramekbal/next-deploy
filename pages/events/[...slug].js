import { Fragment } from "react";
import { useRouter } from "next/router";

import { getFilteredEvents } from "../../components/helper/api-utils";
import EventList from "../../components/events/event-list";
import ResultsTitle from "../../components/events/results-title";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert";

function FilteredEventsPage(props) {
  if (props.hasError) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>Invalid filter. Please adjust your values!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  if (!props.filteredEvents || props.filteredEvents.length === 0) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>No events found for the chosen filter!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  const date = new Date(props.dataObj.numYear, props.dataObj.numMonth - 1);

  return (
    <Fragment>
      <ResultsTitle date={date} />
      <EventList items={props.filteredEvents} />
    </Fragment>
  );
}
export async function getServerSideProps(context) {
  const { params } = context;

  const filteredYear = params.slug[0];
  const filteredMonth = params.slug[1];

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return {
      props: {
        hasError: true,
      },
      // notFound:true,
      // redirect:{
      //   destination:"/errorpage"
      // }
    };
  }

  const filteredEvents = await getFilteredEvents({
    year: numYear,
    month: numMonth,
  });

  return {
    props: {
      filteredEvents: filteredEvents,
      dataObj: {
        numYear,
        numMonth,
      },
    },
  };
}

export default FilteredEventsPage;
