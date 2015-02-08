# Objective Facebook JS 0.1
> A simpler, better, ojbective-orientated Facebook JS API wrapper

Works currently best reading the public API.

## Example
Using the API is faily simple, just include the app.js in your project:
```html
<script src="app.js"></script>
```

And fire up your own instance of the API:
```javascript
var API = new OOFB('816021041756653|sBUcW6Wy24ivI5fzOobCwixzaR4');

// Get the info on Mark Zuckenberg (he's id is '4')
new API.User(4).get(function(user) {
    console.log(user.name);
});

```

### More examples

You can find more examples at the `examples/` folder.

## Additional info

Here are a few details:
- Every graph object is a promise-kind-of an object itself, but the fetching of
  the data starts after you fire .get()
- The source code is written in TypeScript
- The API is still missing a 'few' features, but they are rather simple to add
- All features automatically tested via Karma

## Contributions
Contributions are warmly welcome via pull requests.

Please open an issue beforehand and use feature branches.

## License
The work is licensed under MIT license