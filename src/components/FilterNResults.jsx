import { useState } from "react";

const FilterNResults = ({ arr }) => {
  // const arrayA = [
  //   { title: "Eggs", desc: "They are good" },
  //   { title: "Milk", desc: "It is white" },
  // ];
  // const arrayB = [
  //   { title: "Cucumbers", desc: "They are long" },
  //   { title: "Carrots", desc: "They are orange" },
  // ];

  const [searchTerm, setSearchTerm] = useState(null);
  const [searchResult, setSearchResult] = useState(null);

  function handleSearch(event) {
    setSearchTerm(event.target.value);

    const result = arr.filter(
      (item) =>
        item.className.includes(searchTerm) ||
        item.classDescription.includes(searchTerm)
    );
    console.log("result", result);

    setSearchResult(result);
    if (searchTerm === null) {
      setSearchResult(null);
    }
  }

  return (
    <div>
      <input onChange={handleSearch} type="text" />
      {searchResult &&
        searchResult?.map((item, index) => (
          <article key={index}>
            <h2>{item.className}</h2>
            <p>{item.classDescription}</p>
          </article>
        ))}
    </div>
  );
};

export default FilterNResults;

/*

In parent component:
--------------------

exampleComponent(){

  const { data, loading, error } = useA({
    url: "EXAMPLEhttp://localhost:4000/api/v1/classesEXAMPLE",
    method: "GET",
    headers: {
      accept: "application/json",
    },
  });

    return(

    <Filter arr={data} />

    )
}




*/
