Vue.config.devtools = true;
var formId = window.location.pathname.match(/\/form-(\d*)\//)[1];
var apiRoot = '../../api';
var apiEndpoint = `${apiRoot}/form-${formId}.json`;
var app = new Vue({
  el: '#app',
  computed: {
    test2: function (vue) {
      return vue.test + "---";
    }
  },
  mounted() {
    if (localStorage.getItem(`${formId}-questions`)) {
      this.questions = JSON.parse(localStorage.getItem(`${formId}-questions`));
    } else {
      axios
        .get(apiEndpoint)
        .then(response => this.questions = response.data.questions);
    }
  },
  watch: {
    questions: {
      handler() {
        localStorage.setItem(`${formId}-questions`, JSON.stringify(this.questions));
        axios
          .post(apiEndpoint)
          .then(response => console.log(response));
      },
      deep: true
    }
  },
  data: {
    questions: []
  }
});
