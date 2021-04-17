// TODO

Vue.component('car-view', {
    data: function () {
        let data = [];
        // axios.get('https://my.api.mockaroo.com/car_selector_2_image.json?key=e574cd50&fbclid=IwAR31ESIbtVWAeWq_4ptz5VXh4BosKVyj9wFqObqgdMszzPfx_1VX4jYYGoY')
        axios.get('https://my.api.mockaroo.com/car_selector_3.json?key=e574cd50&fbclid=IwAR1G9HnBHD3sgcm5Sz1lWbjCiTj2k4dcXIG2rlUtgiI2gLzmcBhvJJJ9g1I')
            .then(result => {
                this.data = [
                    result.data.model,
                    result.data.color,
                    result.data.engine,
                    result.data.extras,
                    result.data.version,
                    result.data.transmission,
                    result.data.image
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
            <select class="form-control" id="model">
                <option selected value="unselected">Model</option>
                <option v-for="model in this.data[0]" v-bind:value="model.id""> {{model.name}}</option>
        </select><br>

        <select class=" form-control" id="engine">
                <option selected value="unselected">Engine</option>
                <option v-for="engine in this.data[2]" v-bind:value="engine.id""> {{engine.name}}</option>
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
    <div class="main">
        <h1>Car Selector</h1>


        <img src="https://www.bmwgroup-classic.com/content/dam/grpw/websites/bmwgroup-classic_com/classic-heart/blog/classic-heart_pop-up-layer/2018/buchi/BMW_Classic_Japan_Still01_2224x1482px.jpg.grp-transform/xxlarge/BMW_Classic_Japan_Still01_2224x1482px.jpg"
            alt="BMW">
        <br>
        Basic price: <br>
        Additional costs: sum()

        <br><br><br><br><br>

        <!-- TO DELETE - TEST ONLY -->
        <canvas id="myChart" width="30" height="10" chart-labels="chart.labels">
        </canvas>

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