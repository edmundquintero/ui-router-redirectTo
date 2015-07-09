# ui-router-redirectTo #

Simple state redirection for Angular UI-Router

[![Continuous Integration Status](https://api.travis-ci.org/joshuahiggins/ui-router-redirectTo.svg?branch=master)](http://travis-ci.org/joshuahiggins/ui-router-redirectTo)


#### Requirements ####

* Angular >= 1.0.8
* UI-Router >= 0.2.0

---

## Example Usage ##

### Simple ###

Add the module as a dependency:

```js
angular.module('yourApp', ['ui.router', 'ui.router.redirectTo']);
```

Then just add the `redirectTo` property when declaring a state:

```js
$stateProvider.state('someState', {
  redirectTo: 'anotherState'
});

```

See, simple! Too simple. Almost pointlessly simple.

### Real World ###

In the real world of state management with UI-Router, we often find ourselves working with nested states and abstract states. Simplifying these scenarios is what `ui-router-redirectTo` aims to serve.

Here's an example of an abstract state (`someState`) that is not directly navigable redirecting to a nested state (`someState.tab1`) while providing it with a template, API resolve, and controller:

```js
$stateProvider
  .state('someState', {
    url: '/some-state',
    redirectTo: 'someState.tab1',
    template: [
      '<ul>',
        '<li><a ui-sref-active-eq="active" ui-sref="someState.tab1">Tab 1</li>',
        '<li><a ui-sref-active-eq="active" ui-sref="someState.tab2">Tab 2</li>',
        '<li><a ui-sref-active-eq="active" ui-sref="someState.tab3">Tab 3</li>',
      '</ul>',
      '<div ui-view></div>'
    ].join(''),
    resolve: {
      someApi: ['$resource', function ($resource) {
        return $resource('api/some.json').query().$promise;
      }]
    },
    controller: ['someApi', function (someApi) {
      this.someApi = someApi.data;
    }],
    controllerAs: 'vm'
  })
  .state('someState.tab1', {
    url: '',
    templateUrl: 'templates/some-state/tab1.html'
  })
  .state('someState.tab2', {
    url: '/this',
    templateUrl: 'templates/some-state/tab2.html'
  })
  .state('someState.tab3', {
    url: '/that',
    templateUrl: 'templates/some-state/tab3.html'
  });
```

In the above example, when you visit `/#/some-state`, you will be presented with the tabular navigation and the first tab selected by default.
