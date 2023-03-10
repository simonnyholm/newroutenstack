import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { TokenContext } from "../contexts/TokenProvider";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [classes, setClasses] = useState();
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState();
  const navigate = useNavigate();

  const { token } = useContext(TokenContext);

  useEffect(function () {
    (async function () {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/classes"
        );
        console.log(response);
        if (response.status === 200) {
          setClasses(response.data);
        }
      } catch (error) {
        setError(error);
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  console.log("klasser", classes);

  return (
    <>
      <h1>Home</h1>
      <section>
        {isLoading && (
          <article>
            <h2>...loading</h2>
          </article>
        )}
        {classes && (
          <>
            {classes?.map((item, index) => (
              <article
                key={index}
                onClick={() => navigate(`/classdetails/${item.id}`)}
                className="p-4"
              >
                <h2>{item.className}</h2>
              </article>
            ))}
          </>
        )}
      </section>
    </>
  );
}
