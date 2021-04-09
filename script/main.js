// TODO

Vue.component('car-view', {
    props: ['car'],
    data: function () {
        return {
        }
    },
    template: `
 <div>Model: {{car.model}} 
  <br> Silnik: {{car.engine}} 
  <br> Opcje: {{car.extras}} 
`
});
var app = new Vue({
    el: '#app',
    data: {
    }
})