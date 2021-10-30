const React = {
    createElement: (tag, props, ...children)=>{
        if (typeof tag === "function") try {
            return tag(props);
        } catch ({ promise , key  }) {
            promise.then((data)=>{
                promiseCache.set(key, data);
                rerender();
            });
            return {
                tag: "div",
                props: {
                    children: [
                        "I am loading"
                    ]
                }
            };
        }
        const element = {
            tag,
            props: {
                ...props,
                children
            }
        };
        return element;
    }
};
const states = [];
let stateCursor = 0;
const useState = (initialState)=>{
    const frozenCursor = stateCursor;
    states[frozenCursor] = states[frozenCursor] || initialState;
    const setState = (newState)=>{
        states[frozenCursor] = newState;
        rerender();
    };
    stateCursor++;
    return [
        states[frozenCursor],
        setState
    ];
};
const promiseCache = new Map();
const createResource = (promise, key)=>{
    console.log(promiseCache, promise, key);
    if (promiseCache.has(key)) return promiseCache.get(key);
    throw {
        promise: promise,
        key
    };
};
const App = ()=>{
    const [name, setName] = useState("soufiane");
    const [count, setCount] = useState(0);
    const dogPhotoUrl = createResource(fetch(`https://dog.ceo/api/breed/images/random`).then((response)=>response.json()
    ).then((data)=>data.message
    ), "key");
    return(/*#__PURE__*/ React.createElement("div", {
        className: "class",
        __source: {
            fileName: "index.tsx",
            lineNumber: 51
        },
        __self: this
    }, /*#__PURE__*/ React.createElement("h1", {
        __source: {
            fileName: "index.tsx",
            lineNumber: 52
        },
        __self: this
    }, "title ", name), /*#__PURE__*/ React.createElement("input", {
        type: "text",
        placeholder: "name",
        value: name,
        onchange: (e)=>setName(e.target.value)
        ,
        __source: {
            fileName: "index.tsx",
            lineNumber: 53
        },
        __self: this
    }), /*#__PURE__*/ React.createElement("p", {
        __source: {
            fileName: "index.tsx",
            lineNumber: 54
        },
        __self: this
    }, " nostrum? Provident tenetur eveniet aut doloremque ducimus."), /*#__PURE__*/ React.createElement("h3", {
        __source: {
            fileName: "index.tsx",
            lineNumber: 55
        },
        __self: this
    }, "Count ", count), /*#__PURE__*/ React.createElement("button", {
        onclick: ()=>setCount(count + 1)
        ,
        __source: {
            fileName: "index.tsx",
            lineNumber: 56
        },
        __self: this
    }, "increment"), /*#__PURE__*/ React.createElement("button", {
        onclick: ()=>setCount(count - 1)
        ,
        __source: {
            fileName: "index.tsx",
            lineNumber: 57
        },
        __self: this
    }, "decrement"), dogPhotoUrl));
};
const render = (reactElement, container)=>{
    if ([
        "string",
        "number"
    ].includes(typeof reactElement)) {
        container.appendChild(document.createTextNode(String(reactElement)));
        return;
    }
    const actualDomElement = document.createElement(reactElement.tag);
    if (reactElement.props) Object.keys(reactElement.props).filter((key)=>key !== "children"
    ).forEach((key)=>{
        actualDomElement[key] = reactElement.props[key];
    });
    if (reactElement.props.children) reactElement.props.children.forEach((child)=>{
        render(child, actualDomElement);
    });
    container.appendChild(actualDomElement);
};
const rerender = ()=>{
    stateCursor = 0;
    document.getElementById("root").firstChild.remove();
    render(/*#__PURE__*/ React.createElement(App, {
        __source: {
            fileName: "index.tsx",
            lineNumber: 87
        },
        __self: this
    }), document.getElementById("root"));
};
render(/*#__PURE__*/ React.createElement(App, {
    __source: {
        fileName: "index.tsx",
        lineNumber: 89
    },
    __self: this
}), document.getElementById("root"));

//# sourceMappingURL=index.fe4db618.js.map
