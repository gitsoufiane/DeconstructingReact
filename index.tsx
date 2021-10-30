const React = {
  createElement: (tag, props, ...children) => {
    if (typeof tag === "function") {
      try {
        return tag(props);
      } catch ({ promise, key }) {
        promise.then((data) => {
          promiseCache.set(key, data);
          rerender();
        });
        return { tag: "div", props: { children: ["I am loading"] } };
      }
    }
    const element = { tag, props: { ...props, children } };
    return element;
  },
};

const states = [];
let stateCursor = 0;

const useState = (initialState) => {
  const frozenCursor = stateCursor;
  states[frozenCursor] = states[frozenCursor] || initialState;
  const setState = (newState) => {
    states[frozenCursor] = newState;
    rerender();
  };
  stateCursor++;
  return [states[frozenCursor], setState];
};

const promiseCache = new Map();
const createResource = (promise, key) => {
  console.log(promiseCache, promise, key);
  if (promiseCache.has(key)) {
    return promiseCache.get(key);
  }
  throw { promise: promise, key };
};
const App = () => {
  const [name, setName] = useState("soufiane");
  const [count, setCount] = useState(0);
  const dogPhotoUrl = createResource(
    fetch(`https://dog.ceo/api/breed/images/random`)
      .then((response) => response.json())
      .then((data) => data.message),
    "key"
  );
  return (
    <div className='class'>
      <h1>title {name}</h1>
      <input type='text' placeholder='name' value={name} onchange={(e) => setName(e.target.value)} />
      <p> nostrum? Provident tenetur eveniet aut doloremque ducimus.</p>
      <h3>Count {count}</h3>
      <button onclick={() => setCount(count + 1)}>increment</button>
      <button onclick={() => setCount(count - 1)}>decrement</button>
      {dogPhotoUrl}
    </div>
  );
};

const render = (reactElement, container) => {
  if (["string", "number"].includes(typeof reactElement)) {
    container.appendChild(document.createTextNode(String(reactElement)));
    return;
  }
  const actualDomElement = document.createElement(reactElement.tag);
  if (reactElement.props) {
    Object.keys(reactElement.props)
      .filter((key) => key !== "children")
      .forEach((key) => {
        actualDomElement[key] = reactElement.props[key];
      });
  }
  if (reactElement.props.children) {
    reactElement.props.children.forEach((child) => {
      render(child, actualDomElement);
    });
  }
  container.appendChild(actualDomElement);
};

const rerender = () => {
  stateCursor = 0;
  document.getElementById("root").firstChild.remove();
  render(<App />, document.getElementById("root"));
};
render(<App />, document.getElementById("root"));
