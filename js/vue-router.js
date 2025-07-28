class MyRouter {
  constructor(options) {
    this.routes = options.routes;
    this.routeMap = {};
    this.currentPath = '/';
    this.init();
  }

  init() {
    this.createRouteMap();
    this.listenHashChange();
    this.listenPopState();
  }

  createRouteMap() {
    this.routes.forEach(route => {
      this.routeMap[route.path] = route.component;
    });
  }

  listenHashChange() {
    window.addEventListener('hashchange', () => {
      this.currentPath = window.location.hash.slice(1) || '/';
    });
  }

  listenPopState() {
    window.addEventListener('popstate', () => {
      this.currentPath = window.location.pathname;
    });
  }
}

let _Vue = null;

MyRouter.install = function (Vue) {
  _Vue = Vue;

  Vue.mixin({
    beforeCreate() {
      if (this.$options.router) {
        Vue.prototype.$router = this.$options.router;
        Vue.observable(this.$router);
      }
    }
  });

  Vue.component('router-link', {
    props: {
      to: String
    },
    render(h) {
      return h('a', { attrs: { href: '#' + this.to } }, this.$slots.default);
    }
  });

  Vue.component('router-view', {
    render(h) {
      const component = this.$router.routeMap[this.$router.currentPath];
      return component ? h(component) : null;
    }
  });
}

export default MyRouter;
