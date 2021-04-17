// TODO
let currentSelectedModel;
let current = [];
// axios.defaults.baseURL = 'https://wizard.uek.krakow.pl/~s209281/dane/';


// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

Vue.component('car-select', {
    data: function () {
        let data = [];
        this.current = {
            model_id: "",
            engine_id: "",
            transmition_id: "",
            version_id: "",
            color_id: "",
            extras_ids: []
        };

        // axios.get('https://my.api.mockaroo.com/car_selector_4.json?key=e574cd50&fbclid=IwAR3dxNLw-NtJGaQrjk8HwqvLtj5l1Ib5vdYXyPc9LxSOKGFEX3lGSTQuxD8')
        axios.get('https://wizard.uek.krakow.pl/~s209281/dane/dane.json', {
            method: 'HEAD',
            mode: 'no-cors',
        })
            .then(result => {
                this.data = [
                    result.data.model,
                    result.data.color,
                    result.data.engine,
                    result.data.extras,
                    result.data.version,
                    result.data.transmission
                ]
            })
        return {
            data
        }
    },
    methods: {
        // getImgUrl(id) {
        //     return this.data[1][0].url;
        // }
    },
    template: `
<div>
    <div class="sidenav">
        <form>
            <h4>Configure your car </h4><br>
            <select class="form-control" id="model" v-model="current.model_id">
                <option selected value="unselected">Model</option>
                <option v-for="model in this.data[0]" v-bind:value="model.id"> {{model.name}}</option>
            </select><br>

        <select class=" form-control" id="engine">
                <option selected value="unselected">Engine</option>
                <option v-for="engine in this.data[2]" v-bind:value="engine.id"> {{engine.name}}</option>
        </select><br>

        <select class=" form-control" id="transmition">
                <option selected value="unselected">Transmition</option>
                <option v-for="transmission in this.data[5]" v-bind:value="transmission.id"> {{transmission.name}}
                </option>
            </select><br>

            <select class="form-control" id="version">
                <option selected value="unselected">Version</option>
                <option v-for="version in this.data[4]" v-bind:value="version.id"> {{version.name}}</option>
            </select><br>

            <select class="form-control" id="color">
                <option selected>Color Test</option>

                <option v-for="color in this.data[1]" v-bind:value="color.id" :style="{'background-color':color.hex}">
                    {{color.name}}</option>
            </select><br>

            <fieldset class="form-group" id="extras">
                <legend>Extras</legend>
                <div v-for="extra in this.data[3]" class="form-check">
                    <label class="form-check-label">
                        <input class="form-check-input" type="checkbox" v-bind:value="extra.id">
                        {{ extra.name }}
                    </label>
                </div>
            </fieldset>

            <input type="button" class="btn btn-success" value="Search">
            <input type="button" class="btn btn-danger" value="Clear">

    </form>
    </div>
</div>
`
});

Vue.component('car-view', {
    data: function () {
        let data = [];
        // axios.get('https://my.api.mockaroo.com/car_image.json?key=e574cd50&fbclid=IwAR3H95LoVMFKjiLU-Y7bouMJzTd_i-vboi6thtxKasa9OMlowaD7Sq8VPvk')
        axios.get('https://wizard.uek.krakow.pl/~s209281/dane/img.json',{
            method: 'HEAD',
            mode: 'no-cors',
        })
            .then(result => {
                this.data = result.data;
            })
        return {
            data
        }
    },
    methods: {
        // getImgUrl(id) {
        //     return this.data[1][0].url;
        // }
    },
    template: `
    <div class="main">
        <h1>Car Selector</h1>
        <div v-for="car in this.data">
           Car model name: {{car.model}} <br>
           <img v-bind:src="car.car_image">
        </div>

    </div>
    `
});

var app;

window.onload = function () {
    app = new Vue({
        el: '#app',
        data: {
            current: {
                model_id: "",
                engine_id: "",
                transmition_id: "",
                version_id: "",
                color_id: "",
                extras_ids: [],
            }
        }
    });
}