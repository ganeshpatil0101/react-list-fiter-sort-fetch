import { useCallback, useEffect, useState, useRef } from "react";
import "./styles.css";
let desOrder = false;
export default function App() {
  const [list, setList] = useState([]);
  const copyList = useRef();
  function sortName(ar, isDes, prop = "last_name") {
    const copy = [...ar];
    return copy.sort((a, b) => {
      const aProp = a[prop];
      const bProp = b[prop];
      if (aProp > bProp) {
        return isDes ? -1 : 1;
      } else {
        return isDes ? 1 : -1;
      }
    });
  }
  useEffect(() => {
    fetch("https://reqres.in/api/users?page=1")
      .then((data) => {
        return data.json();
      })
      .then((d) => {
        copyList.current = d.data;
        setList(sortName(d.data), desOrder, "first_name");
      })
      .catch((er) => console.error(er));
  }, []);
  const onSort = useCallback(
    (prop) => {
      console.log("=== prop ", prop);
      desOrder = !desOrder;
      setList(sortName(list, desOrder, prop));
    },
    [list]
  );
  const onSearch = useCallback(
    (event) => {
      const val = event.target.value;
      if (val) {
        // const sr = copyList.current.filter((row) => {
        //   return JSON.stringify(row).includes(val);
        // })
        const sr = copyList.current.filter((row) => {
          return Object.values(row).some((s) => `${s}`.includes(val));
        });
        setList(sr);
      } else {
        setList(copyList.current);
      }
    },
    [list]
  );
  return (
    <div className="App">
      <h1>Hello CodeSandbox Test</h1>
      {list.map((l) => {
        return (
          <li key={l.id}>
            {l.first_name} {l.last_name} ({l.email})
          </li>
        );
      })}
      <br />
      <button onClick={() => onSort("last_name")}> Sort by lastname </button>
      <button onClick={() => onSort("email")}> Sort by email </button>
      <br />
      <input type="text" placeholder="search" onChange={onSearch} />
    </div>
  );
}
