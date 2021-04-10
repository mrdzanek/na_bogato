// TODO

Vue.component('car-view', {
    props: ['cars'],
    data: function () {
        this.cars = [
            {
                model: 'Auris',
                engine: '1.4',
                extras: ['skórzana tapicerka', 'zajebiste alusy'],
            },
            {
                model: 'Land Cruiser',
                engine: '3.2',
                extras: ['skórzana tapicerka', 'zajebiste alusy'],
            }
        ]
        return this.cars;
    },
    template: `
    <div>
        <p>Widok samochodów: </p>
        <div v-for="car in cars"> 
            Model: {{car.model}} 
            <br> Silnik: {{car.engine}} 
            <br> Opcje: {{car.extras}} 
        </div>
    </div>
    `
});
var app;
window.onload = function () {
    app = new Vue({
        el: '#app',
        data: {
            cars: [
                {
                    model: 'Auris',
                    engine: '1.4',
                    extras: ['skórzana tapicerka', 'zajebiste alusy'],
                },
                {
                    model: 'Land Cruiser',
                    engine: '3.2',
                    extras: ['skórzana tapicerka', 'zajebiste alusy'],
                }
            ]
        },
        mounted: function () {
            // axios.get('http://mockaroo/API_OD_MICHALA')
            //     .then(result => this.cars = result)
        },
    });
}