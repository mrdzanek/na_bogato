// TODO

Vue.component('car-view', {
    data: function () {
        let data = [];
        axios.get('https://my.api.mockaroo.com/car_selector_2_image.json?key=e574cd50&fbclid=IwAR31ESIbtVWAeWq_4ptz5VXh4BosKVyj9wFqObqgdMszzPfx_1VX4jYYGoY')
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
        <h4>Configure your car </h4><br>
        <select class="form-control" id="model">
            <option selected>Model</option>
        </select><br>

        <select class="form-control" id="engine">
            <option selected>Engine</option>
        </select><br>

        <select class="form-control" id="transmition">
            <option selected>Transmition</option>
        </select><br>

        <select class="form-control" id="version">
            <option selected>Version</option>
        </select><br>

        <select class="form-control" id="color">
            <option selected>Color Test</option>
            <!-- TEST ONLY -->
            <option style="background: aquamarine ; color:black">{{this.data[1][0].name}}</option>
            <option style="background: crimson ; color:black">{{this.data[1][1].name}}</option>
            <option style="background: #cc8899 ; color:black">{{this.data[1][2].name}}</option>
            <option style="background: violet ; color:black">{{this.data[1][3].name}}</option>
            <option style="background: goldenrod ; color:black">{{this.data[1][4].name}}</option>
        </select><br>

        <fieldset class="form-group" id="extras">
            <legend>Extras</legend>
            <div class="form-check">
                <label class="form-check-label">
                    <input class="form-check-input" type="checkbox" value="" checked="">
                </label>
            </div>
        </fieldset>

        <button type="button" class="btn btn-success">Search</button>
        <button type="button" class="btn btn-danger">Clear</button>

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