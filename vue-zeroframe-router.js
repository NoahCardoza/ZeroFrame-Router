import Router from "./router.js"

const VueRouterLink = {
  props: ['to', 'active-class'],
  render(h){
    return h('a', {
      class: {
        'is-active': this.active
      },
      attrs: {
        href: this.getHref,
      },
      on: {
        'click': this.goto
      }
    }, this.$slots.default)
  },
  mounted(){
    window.link = this
  },
  methods: {
    goto: function(event) {
      event.preventDefault();
      Router.navigate(this.to);
    }
  },
  computed: {
    // TODO make this.$router reactive
    active: function() {
      return false
      // console.log('active', this.$router.currentRoute, this.to);
      // if (this.$router.currentRoute === this.to) {
        // return true;
      // }
      // return false;
    },
    getHref: function() { // Middle Click - open in new tab
      return "./?/" + this.to;
    }
  }
};
const VueRouterView = {
  methods: {},
  created: function () {
    // TODO make setView a que
    Router.setView = (i, object) => {
      this.currentView = {};
      this.currentView = object.default;
    }
  },
  data: function () {
    return {
      currentView: null
    }
  },
  computed: {
  },
  render: function(h) {
    return h(this.currentView)
  }
};

export const VueZeroFrameRouter = {
  routes: null,
  install(Vue) {
    Vue.component('router-link', VueRouterLink);
    Vue.component('router-view', VueRouterView);

    // Object.defineProperty(Vue.prototype, '$router', {
    //   get () { return this._routerRoot._router }
    // })

    Vue.prototype.$router = Router
  }
};

// TODO remove the need for `vueInstance`
export function VueZeroFrameRouterInit(page, vueInstance, routes) {
  VueZeroFrameRouter.routes = routes;

  for (var i = 0; i < routes.length; i++) {
    console.log(Router);
    Router.add(routes[i].route, !routes[i].component.init ? function() {} : routes[i].component.init, {
      before: !routes[i].component.before ? function() {
        return true;
      } : routes[i].component.before,
      after: !routes[i].component.after ? function() {} : routes[i].component.after,
      leave: !routes[i].component.leave ? function() {} : routes[i].component.leave
    }, routes[i].component);
  }

  // Router.vueInstance = vueInstance;

  Router.init(page);
}
