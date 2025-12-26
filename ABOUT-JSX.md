/** @jsxImportSource @ocdla/jsx-runtime @jsxRuntime classic @jsx jsx @jsxFragment Fragment */



// https://babeljs.io/docs/babel-plugin-transform-react-jsx


/**
 * Note the @jsxFragment pragma above. It tells the compiler what to use for fragments.
 * If you don't specify it, the compiler will use React.Fragment by default.
 * The semantics of a JSX Fragment are: <>...</>
 * which is equivalent to <Fragment>...</Fragment>
 */
// https://legacy.reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html



// npm update @babel/core @babel/plugin-transform-react-jsx
/*
// If you're using @babel/plugin-transform-react-jsx
{
  "plugins": [
    ["@babel/plugin-transform-react-jsx", {
      "runtime": "automatic"
    }]
  ]
}
  */






import { jsx } from 'react/jsx-runtime';

/*
Note

The functions inside react/jsx-runtime and react/jsx-dev-runtime must only be used by the compiler transform. If you need to manually create elements in your code, you should keep using React.createElement. It will continue to work and is not going away.
*/