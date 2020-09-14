```Javascript
this.setState(
  (state) => ({
     props: value,
  })
);
```

```Javascript
class MyComponent extends React.Component {

    function setStateSynchronous(stateUpdate) {
        return new Promise(resolve => {
            this.setState(stateUpdate, () => resolve());
        });
    }

    async function foo() {
        // state.count has value of 0
        await setStateSynchronous(state => ({count: state.count+1}));
        // execution will only resume here once state has been applied
        console.log(this.state.count);  // output will be 1
    }
} 
```

https://stackoverflow.com/questions/42018342/is-there-a-synchronous-alternative-of-setstate-in-reactjs
