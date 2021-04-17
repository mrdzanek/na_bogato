// TODO
let currentSelectedModel;
let current = [];

var carSelect = Vue.component('car-select', {
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
        axios.get('/dane/dane.json', {
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
        storeSelection() {
            let extras = document.getElementById("extras").children
            current = {
                model_id: document.getElementById("model").value,
                engine_id: document.getElementById("engine").value,
                transmission_id: document.getElementById("transmission").value,
                version_id: document.getElementById("version").value,
                color_id: document.getElementById("color").value,
                extras: [...extras].map(el => el.firstChild.firstChild.value),
            }
        }
    },
    template: `
<div>
    <div class="sidenav">
        <form>
            <h4>Configure your car </h4><br>
            <select class="form-control" id="model">
                <option selected value="unselected">Model</option>
                <option v-for="model in this.data[0]" v-bind:value="model.id"> {{model.name}}</option>
            </select><br>

        <select class=" form-control" id="engine">
                <option selected value="unselected">Engine</option>
                <option v-for="engine in this.data[2]" v-bind:value="engine.id"> {{engine.name}}</option>
        </select><br>

        <select class=" form-control" id="transmission">
                <option selected value="unselected">Transmission</option>
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

            <legend>Extras</legend>
            <fieldset class="form-group" id="extras">
                <div v-for="extra in this.data[3]" class="form-check">
                    <label class="form-check-label">
                        <input class="form-check-input" type="checkbox" v-bind:value="extra.id">
                        {{ extra.name }}
                    </label>
                </div>
            </fieldset>

            <input type="button" class="btn btn-success" value="Search" id="searchButton">
            <input type="button" class="btn btn-danger" value="Clear" id="clearButton">

    </form>
    </div>
</div>
`
});

var carView = Vue.component('car-view', {
    data: function () {
        let data = [];
        // axios.get('https://my.api.mockaroo.com/car_image.json?key=e574cd50&fbclid=IwAR3H95LoVMFKjiLU-Y7bouMJzTd_i-vboi6thtxKasa9OMlowaD7Sq8VPvk')
        axios.get('/dane/img.json', {
            method: 'HEAD',
            mode: 'no-cors',
        })
            .then(result => {
                this.data = {
                    cars: result.data,
                    temp: result.data
                };
            })
        return {
            data
        }
    },
    methods: {
        printSelection() {
            console.log(current)
            console.log(this.data)
            if (current.model_id == "unselected") {
                this.data.temp = this.data.cars;
            } else {
                this.data.temp = this.data.cars.filter(car => car.model_id == current.model_id);
            }
            console.log(this.current)
        }
    },
    template: `
    <div class="main">
        <h1>Car Selector</h1>
        <div v-for="car in this.data.temp">
           Car model name: {{car.model}} <br>
           <img v-bind:src="car.car_image">
        </div>

    </div>
    `
});

var vm;

window.onload = function () {
    vm = new Vue({
        el: '#app',
        components: {
            "car-view": carView,
            "car-select": carSelect
        }
    });
    document.getElementById("searchButton").onclick = function () {
        vm.$refs.selectForm.storeSelection();
        vm.$refs.viewDiv.printSelection();
    };
}