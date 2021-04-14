// TODO

Vue.component('car-view', {
    data: function () {
        let data = [];
        axios.get('https://my.api.mockaroo.com/car_selector_2_image.json?key=e574cd50&fbclid=IwAR31ESIbtVWAeWq_4ptz5VXh4BosKVyj9wFqObqgdMszzPfx_1VX4jYYGoY')
                .then(result => {
                    this.data = [result.data.model, result.data.image]
                })
        return {
          data
        }
      },
      methods:{
        getImgUrl(id) {
            return this.data[1][0].url;
          }
      },
    template: `
    <div>
        <p>Widok samochodów: </p>
        <div v-for="car in data[0]"> 
            Model: {{car.name}} 
            <br> id: {{car.id}} <br>
        </div>
        <div v-for="img in data[1]">
            Auto: {{img.model_name}}
            <img :src="getImgUrl(img)">
        </div>
    </div>
    `
});
var app;
window.onload = function () {
    app = new Vue({
        el: '#app'
    });
}