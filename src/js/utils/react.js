let effects = [[]];
let state = {};
let isStateChanged = false;
let root = null;
let effectIndex = 0;
let renderCount = 0;

export function createRoot(rootElement) {
    // root = rootElement;
    let component = null;

    let _root = {
        render: (comp) => {
            if (comp) component = comp;
            rootElement.innerHTML = "";
            rootElement.appendChild(component({}));

            renderCount++;
            console.log("Render count:", renderCount);
        },
    };
    root = _root;
    return _root;
}

export function useEffect(effect, deps) {
    // Simple implementation: always run the effect
    effects[effectIndex] = [effect, deps];
    effectIndex++;

    if (renderCount == 1) {
        effect();
    }

    //effect();
}

export function getState(key) {
    return state[key]; // Returns null if the key isn't present.
}

export function setState(key, value) {
    let currentValue = state[key];
    if (currentValue != value) {
        isStateChanged = true;
        state[key] = value;
        root.render();
    }
}

function showState() {
    console.log(state);
    return state;
}

export function hasStateChanged() {
    return isStateChanged;
}

window.showState = showState;
window.hasStateChanged = hasStateChanged;

/*
export function useState(initialValue) {
    const key = Object.keys(state).length;
    state[key] = state[key] || initialValue;

    function setState(newValue) {
        state[key] = newValue;
        // render();
    }

    return [state[key], setState];
}

*/
