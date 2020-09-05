const program = require('commander');
const func = require('./logic.js');


program
	.version('1.0.0')
	.description('TL DB management system\nType command to get more info');


program
	.command('ActualTotalLoad')
	.option('-a, --area [value]')
	.option('-t, --timeres [value]')
	.option('-d, --date [value]')
	.option('-f, --format [value]')
	.action((args) => {
		try {
			func.getActualTotalLoad(args.area, args.timeres, args.date, args.format);
		}
		catch(err){
			console.log(err);
		}

	});

program
	.command('AggregatedGenerationPerType')
	.option('-a, --area [value]')
	.option('-t, --timeres [value]')
	.option('-p, --productiontype [value]', 'AllTypes')
	.option('-d, --date [value]')
	.option('-f, --format [value')
	.action((args) => {
		try{
			func.getAggregatedGenerationPerType(args.area, args.timeres, args.productiontype, args.date, args.format);	
		}
		catch(err){
			console.log(err);
		}
	});


program
	.command('DayAheadTotalLoadForecast')
	.option('-a, --area [value]')
	.option('-t, --timeres [value]')
	.option('-d, --date [value]')
	.option('-f, --format [value')
	.action((args) => {
		try{
			func.getDayAheadTotalLoadForecast(args.area, args.timeres, args.date, args.format);
		}
		catch(err){
			console.log(err);
		}
	});

program
	.command('ActualVsForecast')
	.option('-a, --area [value]')
	.option('-t, --timeres [value]')
	.option('-d, --date [value]')
	.option('-f, --format [value')
	.action((args) => {
		try{
			func.getActualVsForecast(args.area, args.timeres, args.date, args.format);
		}
		catch(err){
			console.log(err);
		}
	});


program
	.command('Admin')
	.option('-n, --newuser [value]')
	.option('-m, --moduser [value]')
	.option('-u, --userstatus [value]')
	.option('-p, --passw [value]')
	.option('-e, --email [value]')
	.option('-q, --quota [value]')
	.option('-d, --newdata [value]')
	.option('-s, --source [value]')
	.action((args) => {
		if(args.passw===true) 
			return;
		if (typeof args.newuser !== 'undefined')
			func.newUser(args.newuser, args.email, args.passw, args.quota);
		else if (typeof args.moduser !== 'undefined')
			func.updateUser(args.moduser, args.email, args.passw, args.quota);
		else if (typeof args.userstatus !== 'undefined')
			func.userStatus(args.userstatus);
		else if (typeof args.newdata !== 'undefined') 
			func.importCsv(args.source, args.newdata);
		else
		{
			console.log('Admin --newuser [name] --passw [pass] --email [mail] --quota [quota]');
			console.log('Admin --moduser [name] --passw [pass] --email [mail] --quota [quota]');
			console.log('Admin --userstatus [name]');
			console.log('Admin --newdata [table] --source [filepath]');
		}
	});

program
	.command('HealthCheck')
	.action(() => {
		func.healthCheck();
	});

program
	.command('Reset')
	.action(() => {
		func.reset();
	});

program
	.command('Login')
	.option('-u, --username [value]')
	.option('-p, --password [value]')
	.action((args) => {
		if( !args.username || !args.password )
			return;
		func.login(args.username,args.password);
	});

program
	.command('Logout')
	.action(() => {
		func.logout();
	});

program
	.command('test')
	.action((args) => {
		func.login('kimo','1234');
		var res;
		setTimeout(()=>{
			res = func.getActualTotalLoad('Greece', 'PT60M', '2018-1-4', 'json');
			console.log(Object.keys(res).length);
		},1000)
	});



program.parse(process.argv);