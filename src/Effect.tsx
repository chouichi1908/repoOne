import { useReducer, useEffect,useCallback,useState } from "react";

function Effect() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { count, step } = state;
  const [city,setCity] = useState('Tokyo');
  const [data,setData] = useState({});

  const fetchDataUrl = useCallback(()=>{

    return `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=8d165baae18a00568b825d7ea3b56ec5`;

  },[city])

  useEffect(() => {
    const id = setInterval(() => {
      dispatch({ type: 'tick' });
    }, 1000);
    return () => clearInterval(id);
  }, [dispatch]);

  useEffect(()=>{

    console.log('I have execued.');
    const url = fetchDataUrl();
    fetch(url).then((res)=>res.json()).then((data)=>{console.log(data); setData(data);});
    // setData(JSON.stringify(result,null,2));
  },[fetchDataUrl])

  return (
    <>
      <h1>use reducer hook in effect hook <span style={{color:"red"}}>{count}</span></h1>
      <input value={step} onChange={e => {
        dispatch({
          type: 'step',
          step: Number(e.target.value)
        });
      }} />
      <h1>combine useEffect useCallback</h1>
      <input type="text" value={city} onChange = {e=>setCity(e.target.value)} />
      <br />
      {JSON.stringify(data,null,2)}
    </>
  );
}

const initialState = {
  count: 0,
  step: 1,
};

function reducer(state:any, action:any) {
  const { count, step } = state;
  if (action.type === 'tick') {
    return { count: count + step, step };
  } else if (action.type === 'step') {
    return { count, step: action.step };
  } else {
    throw new Error();
  }
}

export default Effect;








