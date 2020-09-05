let chai = require('chai');
const chaiExec = require("chai-exec");
let should = chai.should();
let token;
let quota;

chai.use(chaiExec);


describe('HealthCheck', () => {

  describe('Login', () => {
    it('returns token', (done) => {
      let res = chaiExec('node energy_group048 Login -u admin -p 321nimda');
      done();
    });
  });


  describe('HealthCheck', () => {
      it('get status ok', (done) => {
        let res = chaiExec('node energy_group048 HealthCheck');
        eval('var test ='+res.output);
        test.status.should.contain('OK');
        done();
      });
  });
  
  describe('Quota', () => {
    it('get users quota', (done) => {
      let res = chaiExec('node energy_group048 Admin --userstatus admin');
      eval('var test ='+res.output);
      quota = test[0].quota;
      done();
    });
  });

  describe('ActualTotalLoad', () => {
    it('gets Actual Total Load greece PT60M 2018-1-4', (done) => {
      let res = chaiExec('node energy_group048 ActualTotalLoad -a Greece -t PT60M -d 2018-1-4');
      eval('var test ='+res.output);
      test.length.should.be.eq(24);
      done();
    });
  });

  describe('Check Quota', () => {
    it('check if quota got subtracted', (done) => {
      let res = chaiExec('node energy_group048 Admin --userstatus admin');
      eval('var test ='+res.output);
      test[0].quota.should.be.eq(quota-1);
      quota = test[0].quota
      done();
    });
  });

  describe('Quota', () => {
    it('get users quota', (done) => {
      let res = chaiExec('node energy_group048 Admin --userstatus admin');
      eval('var test ='+res.output);
      quota = test[0].quota;
      done();
    });
  });

  describe('DayAheadTotalLoadForecast', () => {
    it('gets Day Ahead Total Load Forecast greece PT60M 2018-1-4', (done) => {
      let res = chaiExec('node energy_group048 DayAheadTotalLoadForecast -a Greece -t PT60M -d 2018-1-4');
      eval('var test ='+res.output);
      test.length.should.be.eq(24);
      done();
    });
  });

  describe('Check Quota', () => {
    it('check if quota got subtracted', (done) => {
      let res = chaiExec('node energy_group048 Admin --userstatus admin');
      eval('var test ='+res.output);
      test[0].quota.should.be.eq(quota-1);
      quota = test[0].quota
      done();
    });
  });

  describe('Quota', () => {
    it('get users quota', (done) => {
      let res = chaiExec('node energy_group048 Admin --userstatus admin');
      eval('var test ='+res.output);
      quota = test[0].quota;
      done();
    });
  });

  describe('ActualvsForecast', () => {
    it('gets ActualvsForecast greece PT60M 2018-1-4', (done) => {
      let res = chaiExec('node energy_group048 ActualVsForecast -a Greece -t PT60M -d 2018-1-4');
      eval('var test ='+res.output);
      test.length.should.be.eq(24);
      done();
    });
  });

  describe('Check Quota', () => {
    it('check if quota got subtracted', (done) => {
      let res = chaiExec('node energy_group048 Admin --userstatus admin');
      eval('var test ='+res.output);
      test[0].quota.should.be.eq(quota-1);
      quota = test[0].quota
      done();
    });
  });

  describe('Quota', () => {
    it('get users quota', (done) => {
      let res = chaiExec('node energy_group048 Admin --userstatus admin');
      eval('var test ='+res.output);
      quota = test[0].quota;
      done();
    });
  });

  describe('AggregatedGenerationPerType', () => {
    it('gets AggregatedGenerationPerType solar greece PT60M 2018-1-4', (done) => {
      let res = chaiExec('node energy_group048 AggregatedGenerationPerType -a Greece -p Solar -t PT60M -d 2018-1-4');
      eval('var test ='+res.output);
      test.length.should.be.eq(24);
      done();
    });
  });

  describe('Check Quota', () => {
    it('check if quota got subtracted', (done) => {
      let res = chaiExec('node energy_group048 Admin --userstatus admin');
      eval('var test ='+res.output);
      test[0].quota.should.be.eq(quota-1);
      quota = test[0].quota
      done();
    });
  });

  describe('Increase Quota', () => {
    it('increase quota to 999', (done) => {
      let res = chaiExec('node energy_group048 Admin --moduser admin -p 321nimda -e a@b.c -q 999');
      eval('var test ='+res.output);
      test[0].quota.should.be.eq(999);
      done();
    });
  });

  

  


});