// createStore redux function from scratch

// init to default state
var defaultAppleState = 0;
/**
 * reducer
 * @param {*} state takes default state
 * @param {*} action takes only one action for now
 */
function apple(state = defaultAppleState, action) {
  if (action.type === "INCREMENT") {
    return state + 1;
  }
  return state;
}

var defaultOrangeState = 10;

var rootReducer = combineReducer({
  apple: apple,
  orange: orange
});

var store = createStore(apple);

var unsub = store.subscribe(function() {
  console.log("STATE UPDATED", store.getState());
});

console.log("state:before", store.getState());
store.dispatch({ type: "INCREMENT" });
console.log("state:after", store.getState());

unsub();
store.dispatch({ type: "INCREMENT" });

function createStore(reducer) {
  var state;
  var subscriptions = [];
  obj = {
    getState: function() {
      return state;
    },
    dispatch: function(action) {
      state = reducer(state, action);
      subscriptions.forEach(function(fn) {
        fn();
      });
    },
    subscribe: function(fn) {
      subscriptions.push(fn);
      return function unsubscribe() {
        var index = subscriptions.indexOf(fn);
        subscriptions.splice(index, 1);
      };
    }
  };
  obj.dispatch({ type: "REDUX_INIT" });
  return obj;
}