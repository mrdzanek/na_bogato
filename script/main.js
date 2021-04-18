// TODO
let temp = {};
let current = [];

var carSelect = Vue.component('car-select', {
    data: function () {
        let data = [];

        // axios.get('https://my.api.mockaroo.com/car_selector_4.json?key=e574cd50&fbclid=IwAR3dxNLw-NtJGaQrjk8HwqvLtj5l1Ib5vdYXyPc9LxSOKGFEX3lGSTQuxD8')
        axios.get('/dane/dane.json', {
            method: 'HEAD',
            mode: 'no-cors',
        })
            .then(result => {
                temp = result.data;
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
                extras_ids: [...extras].filter(el => el.firstChild.firstChild.checked == true ).map(el => el.firstChild.firstChild.value),
            }
        },
        clearSelection() {
            let extras = document.getElementById("extras").children;

            document.getElementById("model").value = "unselected";
            document.getElementById("engine").value = "unselected";
            document.getElementById("transmission").value = "unselected";
            document.getElementById("version").value = "unselected";
            document.getElementById("color").value = "unselected";
            [...extras].forEach(el => el.firstChild.firstChild.checked = false);
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
                <option selected value="unselected">Color Test</option>

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
            if (current.model_id == "unselected") {
                this.data.temp = this.data.cars;
            } else {
                this.data.temp = this.data.cars.filter(car => car.model_id == current.model_id);
            }
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

var configurationTable = Vue.component('configuration-table', {
    data: function () {
        let priceList = [{
            modelPrice: "0",
            colorPrice: "0",
            enginePrice: "0",
            versionPrice: "0",
            transmissionPrice: "0",
            extrasPrice: "0",
            totalPrice: "0",
        }];
        return {
            priceList
        };
    },
    methods: {
        printSelectedPriceList() {
            let filteredModel = temp.model.filter(car => car.id == current.model_id);
            let filteredColors = temp.color.filter(color => color.id == current.color_id);
            let filteredEngines = temp.engine.filter(engine => engine.id == current.engine_id);
            let filteredVersion = temp.version.filter(version => version.id == current.version_id);
            let filteredTransmission = temp.transmission.filter(transmission => transmission.id == current.transmission_id);
            let filteredExtras = temp.extras.filter(extra => current.extras_ids.includes('' + extra.id)).map(str => parseFloat(str.price));

            this.priceList[0].modelPrice = filteredModel.length == 0 ? 0 : filteredModel[0].price_model;
            this.priceList[0].colorPrice = filteredColors.length == 0 ? 0 : filteredColors[0].price;
            this.priceList[0].enginePrice = filteredEngines.length == 0 ? 0 : filteredEngines[0].price;
            this.priceList[0].versionPrice = filteredVersion.length == 0 ? 0 : filteredVersion[0].price;
            this.priceList[0].transmissionPrice = filteredTransmission.length == 0 ? 0 : filteredTransmission[0].price;
            this.priceList[0].extrasPrice = filteredExtras.length == 0 ? 0 : filteredExtras.reduce((x, y) => x + y);

            this.priceList[0].totalPrice = parseFloat(this.priceList[0].modelPrice)
                + parseFloat(this.priceList[0].colorPrice)
                + parseFloat(this.priceList[0].enginePrice)
                + parseFloat(this.priceList[0].versionPrice)
                + parseFloat(this.priceList[0].transmissionPrice)
                + parseFloat(this.priceList[0].extrasPrice);

        }
    },
    template: `
    <div class="main">
        <h1>Car components price table</h1>
        <div v-for="comp in priceList">
           <table>
            <thead>
                <tr>
                    <td>Base model price:</td>
                    <td>Color price:</td>
                    <td>Engine price:</td>
                    <td>Version price:</td>
                    <td>Transmission price:</td>
                    <td>Extras price:</td>
                    <td>Total:</td>
                </tr>
            </thead>
            </tbody>
                <tr>
                    <td>{{comp.modelPrice}}</td>
                    <td>{{comp.colorPrice}}</td>
                    <td>{{comp.enginePrice}}</td>
                    <td>{{comp.versionPrice}}</td>
                    <td>{{comp.transmissionPrice}}</td>
                    <td>{{comp.extrasPrice}}</td>
                    <td>{{comp.totalPrice}}</td>
                </tr>
            </tbody>
           </table>
        </div>

    </div>
    `
});

var soldView = Vue.component('sold-view', {
    data: function () {
        let data = [];
        // axios.get('https://api_do_sprzedanych_aut')
        axios.get('/dane/sold.json', {
            method: 'HEAD',
            mode: 'no-cors',
        })
            .then(result => {
                this.data = result;
            })
        return {
            data
        }
    },
    methods: {
        printChart() {
            let preparedData = {
                labels: [],
                datasets: [{
                    label: 'Cars popularity',
                    data: [],
                    backgroundColor: [
                    ],
                    borderColor: [
                    ],
                }]

            }
            for (let car in this.data.data) {
                preparedData.labels.push(this.data.data[car].model_sold);
                preparedData.datasets[0].data.push(this.data.data[car].number_sold);
                preparedData.datasets[0].backgroundColor.push(randomizeColor());
                preparedData.datasets[0].borderColor.push(randomizeColor());
            }
            let ctx = document.getElementById('customChart').getContext('2d');
            let customChart = new Chart(ctx, {
                type: 'pie',
                data: preparedData
            });

        }
    },
    template: `
    <div class="main">
        <h3>Popularity of sold cars:</h3>
        <canvas id="customChart"></canvas>
    </div>
    `
});

var combustionView = Vue.component('combustion-view', {
    data: function () {
        let data = [];
        // axios.get('https://api_do_sprzedanych_aut')
        axios.get('/dane/combustion.json', {
            method: 'HEAD',
            mode: 'no-cors',
        })
            .then(result => {
                this.data = result;
            })
        return {
            data
        }
    },
    methods: {
        printChart() {
            let preparedData = {
                labels: [],
                datasets: [{
                    label: 'Combustion of cars',
                    data: [],
                    backgroundColor: [
                    ],
                    borderColor: [
                    ],
                }],
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        title: {
                            display: true,
                            text: 'Average combustion chart'
                        }
                    }
                },

            }
            for (let i in this.data.data) {
                preparedData.labels.push(this.data.data[i].model);
                preparedData.datasets[0].data.push(this.data.data[i].combustion);
                preparedData.datasets[0].backgroundColor.push(randomizeColor());
                preparedData.datasets[0].borderColor.push(randomizeColor());
            }
            let ctx = document.getElementById('combustionChart').getContext('2d');
            let customChart = new Chart(ctx, {
                type: 'bar',
                data: preparedData
            });

        }
    },
    template: `
    <div class="main">
        <h3>Combustion of cars:</h3>
        <canvas id="combustionChart"></canvas>
    </div>
    `
});

var vm;

window.onload = function () {
    vm = new Vue({
        el: '#app',
        components: {
            "car-view": carView,
            "car-select": carSelect,
            "configuration-table": configurationTable,
            "sold-view": soldView,
            "combustion-view": combustionView,
        },
    });

    document.getElementById("searchButton").onclick = function () {
        vm.$refs.selectForm.storeSelection();
        vm.$refs.viewDiv.printSelection();
        vm.$refs.confTable.printSelectedPriceList();
        vm.$refs.soldChart.printChart();
        vm.$refs.combustionView.printChart();
    };

    document.getElementById("clearButton").onclick = function () {
        vm.$refs.selectForm.clearSelection();
        vm.$refs.selectForm.storeSelection();
        vm.$refs.viewDiv.printSelection();
        vm.$refs.confTable.printSelectedPriceList();
    };
}

function randomizeColor() {
    return 'rgba('
        + getRandomIntInclusive(0, 255) + ' ,'
        + getRandomIntInclusive(0, 255) + ' ,'
        + getRandomIntInclusive(0, 255) + ' ,'
        + '1)';
}
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}