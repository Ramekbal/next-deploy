// import { getFeaturedEvents } from "../dummy-data";
import { useEffect, useRef, useState } from "react";
import EventList from "../components/events/event-list";
import { getFeaturedEvents } from "../components/helper/api-utils";

function HomePage(props) {
  const [allEmail, setAllEmail] = useState([]);
  // const emai=useRef();

  const email = useRef();
  const password = useRef();

  const singUpUser = () => {
    fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({
        email: email.current.value,
        password: password.current.value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((data) => {
        return data.json();
      })
      .then((res) => console.log(res))
      .catch((error) => {
        alert(error.message);
      });
  };
  useEffect(() => {
    fetch("/api/registration")
      .then((data) => data.json())
      .then((data) => setAllEmail(data.data));
  }, []);

  const signUp = () => {
    console.log({
      email: email.current.value,
      password: password.current.value,
    });
  };
  return (
    <div>
      <div>
        <label htmlFor="email" />
        <input type="email" ref={email} id="email" />
      </div>
      <div>
        <label htmlFor="passward" />
        <input type="password" ref={password} id="password" />
      </div>
      <button type="button" onClick={() => singUpUser()}>
        SignUp
      </button>
      {/* <h1>This is deploy</h1>
      <input type="text" ref={email} />
      <button type="button" onClick={() => submitEmail()}>
        Submit
      </button>
      <ul>
        {allEmail?.map((emai) => {
          return <li key={allEmail._id}>{emai.email}</li>;
        })}
      </ul> */}
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
