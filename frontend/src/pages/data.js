import React, { Component } from 'react';
import Header from "../elements/header";
import Sidebar from "../elements/sidebar";
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import Select from 'react-select';
import { Button } from 'reactstrap';
import '../App.css';
import { Chart } from "react-google-charts";
import ToggleButton from 'react-toggle-button';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';

const areaString = `50Hertz CA
Amprion CA
APG CA
AST BZ
AST CA
Austria
Belgium
Bosnia Herzegovina
Bulgaria
CEPS BZ
CEPS CA
CGES BZ
CGES CA
CREOS CA
Croatia
Cyprus
Cyprus TSO BZ
Cyprus TSO CA
Czech Republic
DE-AT-LU
Denmark
DK1  BZ
DK2 BZ
EirGrid CA
Elering BZ
Elering CA
ELES BZ
ELES CA
Elia BZ
Elia CA
EMS BZ
EMS CA
Energinet CA
ESO BZ
ESO CA
Estonia
Fingrid BZ
Fingrid CA
Finland
Former Yugoslav Republic of Macedonia
France
Germany
Greece
HOPS BZ
HOPS CA
Hungary
IPTO BZ
IPTO CA
Ireland
IT-Centre-North BZ
IT-Centre-South BZ
IT-North BZ
IT-Sardinia BZ
IT-Sicily BZ
IT-South BZ
Italy
Italy CA
Latvia
Litgrid BZ
Litgrid CA
Lithuania
Luxembourg
MAVIR BZ
MAVIR CA
MEPSO BZ
MEPSO CA
Montenegro
National Grid BZ
National Grid CA
Netherlands
NO1 BZ
NO2 BZ
NO3 BZ
NO4 BZ
NO5 BZ
Norway
NOS BiH BZ
NOS BiH CA
Poland
Portugal
PSE SA BZ
PSE SA CA
REE BZ
REE CA
REN BZ
REN CA
Romania
RTE BZ
RTE CA
SE1 BZ
SE2 BZ
SE3 BZ
SE4 BZ
SEPS BZ
SEPS CA
Serbia
Slovakia
Slovenia
Spain
Statnett CA
SvK CA
Sweden
swissgrid BZ
swissgrid CA
Switzerland
TenneT GER CA
TenneT NL BZ
TenneT NL CA
Transelectrica BZ
Transelectrica CA
TransnetBW CA
Ukraine
Ukraine BEI CA
Ukraine BZN
Ukraine IPS CA
`;

const t = areaString.split('\n');

var areaOption=[];
for (const x in t){
    areaOption.push( {value:t[x] , label:t[x]} );
}

const productionTypes = `AC Link
Biomass
DC Link
Fossil Brown coal/Lignite
Fossil Coal-derived gas
Fossil Gas
Fossil Hard coal
Fossil Oil
Fossil Oil shale
Fossil Peat
Geothermal
Hydro Pumped Storage
Hydro Run-of-river and poundage
Hydro Water Reservoir
Marine
Nuclear
Other
Other renewable
Solar
Substation
Transformer
Waste
Wind Offshore
Wind Onshore`;

const t2 = productionTypes.split('\n');
var productionOption=[];
for (const x in t2){
    productionOption.push( {value:t2[x] , label:t2[x]} );
}

const datasetOptions = [
    { value: 'ActualTotalLoad', label: 'Actual Total Load' },
    { value: 'AggregatedGenerationPerType', label: 'Aggregated Generation' },
    { value: 'DayAheadTotalLoadForecast', label: 'Day Ahead Total Load' },
    { value: 'ActualvsForecast', label: 'Actual vs Forecast' },
  ];

const typeOption = [
    { value: 'Date', label: 'Day' },
    { value: 'Month', label: 'Month' },
    { value: 'Year', label: 'Year' }
  ];

const yearOption = [
    { value: '2014', label: '2014' },
    { value: '2015', label: '2015' },
    { value: '2016', label: '2016' },
    { value: '2017', label: '2017' },
    { value: '2018', label: '2018' },
    { value: '2019', label: '2019' },
    { value: '2020', label: '2020' }
];

var monthOption = [
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: '4' },
    { value: '5', label: '5' },
    { value: '6', label: '6' },
    { value: '7', label: '7' },
    { value: '8', label: '8' },
    { value: '9', label: '9' },
    { value: '10', label: '10' },
    { value: '11', label: '11' },
    { value: '12', label: '12' }
]
var dayOption=[];
for (var i=1;i<32;i++){
    dayOption.push( {value:i.toString() , label:i.toString()} );
}

const frequencyOption = [
    { value: 'PT15M', label: 'PT15M' },
    { value: 'PT30M', label: 'PT30M' },
    { value: 'PT60M', label: 'PT60M' }
];





export default class Index extends Component {
    state = {
        dataset: null,
        type: null,
        measurements: [],
        titles : [],
        year: null,
        month: null,
        day: null,
        toDashboard: false,
        isLoading: false,
        frequency: null,
        area : null,
        prod : null,
        noData : false,
        data : false,
        tableColumns : [],
        displayChart : false,
        displayToggle : false,
        noQuota : false
    };
    
    createURL = ()=> {
        const m = this.state.month ? '-'+this.state.month : '';
        const d = this.state.day ? '-'+this.state.day : '';
        const p = this.state.prod ? this.state.prod+'/' :'';
        const url = 'http://localhost:8765/energy/api/'+this.state.dataset+'/'+this.state.area+'/'+p+this.state.frequency+'/'+this.state.type.toLowerCase()+'/'+this.state.year+m+d;
        return encodeURI(url);
    }

    handleDatasetChange = selectedOption => {
        this.setState({ dataset:selectedOption['value'] });
    };

    handleTypeChange = selectedOption => {
        this.setState({ type:selectedOption['value'] });
        if(selectedOption['value'] === 'Year')
            this.setState({ day:null,month:null });
        else if (selectedOption['value'] === 'Month')
            this.setState({ day:null });
    };

    handleYearChange = selectedOption => {
        this.setState({ year:selectedOption['value'] });
    };

    handleMonthChange = selectedOption => {
        this.setState({ month:selectedOption['value'] });
    };

    handleDayChange = selectedOption => {
        this.setState({ day:selectedOption['value'] });
        this.setState({})
    };

    handleFrequencyChange = selectedOption => {
        this.setState({ frequency:selectedOption['value'] });
    };

    handleAreaChange = selectedOption => {
        this.setState({ area:selectedOption['value'] });
    };

    handleProductionChange = selectedOption => {
        this.setState({ prod:selectedOption['value'] });
    };

    handleSubmit = e => {
        this.setState({ noData : false , data : false });
        axios.get(this.createURL() , { headers: { 'x-observatory-auth': this.token}})
            .then(response => {
                const measurements = response.data;
                this.setState({measurements : measurements , data : true});
                this.setState({ tableColumns : Object.keys(measurements['0']) });
                this.setState({displayToggle : true});
            })
            .catch(error => {
                try{
                    if(error.response.status === 403) this.setState({ noData : true });
                    if(error.response.status === 402) this.setState({ noQuota : true })
                }
                catch(err){
                    console.log(err);
                    console.log(error);
                }
            });
    };

    constructor(props) {
        super(props);
        this.token = sessionStorage.getItem('token');
    }

    printTable = ()=>{
        var rows = this.state.measurements;
        let columns = []
        Object.keys(this.state.measurements['0']).forEach(x=>{
            columns.push({ dataField:x , text:x });
            return;
        });
        const pagination = paginationFactory({
            sizePerPage: 5,
            sizePerPageList:[
                {text: '5', value: 5},
                {text: '10', value: 10}
            ],
            withFirstAndLast:false,
            alwaysShowAllBtns:false
        });

        let res = <BootstrapTable keyField='id' data={rows} columns={columns} pagination={ pagination } />;
        return res;
    }

    printChart = ()=> {
        let xOffset = 2;
        let yOffset = 1;
        let xTitle = '';
        let zTitle='';

        if(this.state.dataset==='AggregatedGenerationPerType')
            xOffset++;
        else if(this.state.dataset==='ActualvsForecast'){
            xOffset=3;
            zTitle = 'Forecast';
        }
        if (this.state.type === 'Date'){
            if(this.state.dataset !== 'ActualvsForecast'){
                xOffset++;
                yOffset++;
            }
            xTitle='Hour';
        }
        if(xTitle!=='Hour')
            xTitle = Object.keys(this.state.measurements['0'])[Object.keys(this.state.measurements['0']).length-xOffset];
        let yTitle = Object.keys(this.state.measurements['0'])[Object.keys(this.state.measurements['0']).length-yOffset];
        let c = [];
        c.push(xTitle);
        c.push(yTitle);
        if(zTitle!=='') c.push(zTitle);
        let result=[c];

        for(var x in this.state.measurements){
            let c = [];
            let dateTimeKey = Object.keys(this.state.measurements[x])[Object.keys(this.state.measurements[x]).length-xOffset] ;
            let dateTime = this.state.measurements[x][dateTimeKey];
            if(this.state.day !== null) dateTime = new Date(dateTime).getHours();
            c.push(dateTime);
            let valueKey = Object.keys(this.state.measurements[x])[Object.keys(this.state.measurements[x]).length-yOffset] ;
            let value = this.state.measurements[x][valueKey];
            c.push(value);
            if(this.state.dataset === 'ActualvsForecast'){
                let valueKey = Object.keys(this.state.measurements[x])[Object.keys(this.state.measurements[x]).length-yOffset-1] ;
                let value = this.state.measurements[x][valueKey];
                c.push(value);
            }
            result.push( c );          
        }
        console.log(result);
        let r = <Chart
        width={'1000'}
        height={'500px'}
        chartType="Bar"
        loader={<div>Loading Chart</div>}
        data={result}
        options={{
            // Material design options
            chart: {
            title: yTitle,
            subtitle: '',
            },
        }}
        // For tests
        rootProps={{ 'data-testid': '2' }}
        />
        return r;
    }

    render() {

        if (this.state.toDashboard === true) {
            return <Redirect to='/' />
        }


        const datasetSelect= <Select
        onChange={this.handleDatasetChange}
        options={datasetOptions}
        />;
        const typeSelect = <Select
        onChange={this.handleTypeChange}
        options={typeOption}
        />;
        const yearSelect = <Select
        onChange={this.handleYearChange}
        options={yearOption}
        />;
        const monthSelect = <Select
        onChange={this.handleMonthChange}
        options={monthOption}
        />;
        const daySelect = <Select
        onChange={this.handleDayChange}
        options={dayOption}
        />;
        const frequencySelect = <Select
        onChange={this.handleFrequencyChange}
        options={frequencyOption}
        />;
        const areaSelect = <Select
        onChange={this.handleAreaChange}
        options={areaOption}
        />;
        const productionTypeSelect = <Select
        onChange={this.handleProductionChange}
        options={productionOption}
        />;
        
        return (
            <div>
                <Header/>
                <div id="wrapper">
                    <Sidebar/>
                    <div id="content-wrapper">
                        <div className="container-fluid">
                        {datasetSelect}
                        {this.state.dataset !==null ? areaSelect : null}
                        {this.state.dataset !==null && this.state.dataset === 'AggregatedGenerationPerType' ? productionTypeSelect : null}
                        {this.state.dataset !== null ? frequencySelect : null }
                        {this.state.dataset !== null ? typeSelect : null}
                        {this.state.type !== null ? yearSelect : null }
                        {this.state.type !==null && (this.state.type === 'Date' || this.state.type === 'Month' )? monthSelect : null}
                        {this.state.type !==null && this.state.type === 'Date' ? daySelect : null}
                        <br/>
                        <Button variant="dark" onClick={this.handleSubmit}>Search</Button>
                        {this.state.displayToggle ? (
                            <ToggleButton
                            value={ this.state.displayChart || false }
                            onToggle={(value) => {
                                this.setState({ displayChart: !value })
                        }}/>
                        ) : null}
                        <br/>
                        {this.state.noData ? (<h1>No Data</h1>) : null}
                        {this.state.noQuota ? (<h1>No Quota</h1>) : null}
                        <div class='wrapperClasses'>
                            {this.state.data && !this.state.displayChart ? (this.printTable()):null}
                        </div>
                        {this.state.data && this.state.displayChart ? this.printChart() : null}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
