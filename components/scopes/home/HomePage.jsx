import { useState } from "react";

const HomePage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    // Stop the form from submitting and refreshing the page.
    event.preventDefault();

    const form = {
      name,
      email,
      message,
    };

    const test = await fetch("/api/create", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
    const testa = await test.json();
    console.log("testa", testa);

    // const response = await fetch("/api/submit", {
    //   method: "POST",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(form),
    // });

    // const content = await response.json();

    // alert(content?.data?.tableRange);

    // setMessage('')
    // setEmail('')
    // setName('')
  };

  return (
    <>
      <form className="form" onSubmit={(e) => handleSubmit(e)}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          name="name"
          type="text"
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          name="email"
          type="text"
        />
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          name="message"
          type="text"
        />
        <input name="Name" type="submit" />
      </form>
    </>
  );
};

export default HomePage;
