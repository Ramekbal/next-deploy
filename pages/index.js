// import { getFeaturedEvents } from "../dummy-data";
import { useEffect, useRef, useState } from "react";
import EventList from "../components/events/event-list";
import { getFeaturedEvents } from "../components/helper/api-utils";

function HomePage(props) {
  const [allEmail, setAllEmail] = useState([]);
  const email = useRef();
  const submitEmail = () => {
    fetch("/api/registration", {
      method: "POST",
      body: JSON.stringify({ email: email.current.value }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((data) => {
        return data.json();
      })
      .then((res) => console.log(res));
  };
  useEffect(() => {
    fetch("/api/registration")
      .then((data) => data.json())
      .then((data) => setAllEmail(data.data));
  }, []);
  return (
    <div>
      <h1>This is deploy</h1>
      <input type="text" ref={email} />
      <button type="button" onClick={() => submitEmail()}>
        Submit
      </button>
      <ul>
        {allEmail?.map((emai) => {
          return <li key={allEmail._id}>{emai.email}</li>;
        })}
      </ul>
      {/* <EventList items={props.data} /> */}
    </div>
  );
}

export async function getStaticProps() {
  // let data = [];
  // const data = await fetch("/api/registration");
  // const formatJson = await data.json();
  // .then((data) => (data = data.data));
  // const allEvents = await fetch("/api/registration", {
  //   method: "GET",
  // });
  return {
    props: {
      data: "asa",
    },
    // revalidate: 10,
  };
}

export default HomePage;
