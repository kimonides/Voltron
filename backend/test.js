let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('./server');
let should = chai.should();
let token;
let quota;


chai.use(chaiHttp);


describe('ActualTotalLoad', () => {

  describe('Login', () => {
      it('retrieve token', (done) => {
        chai.request(server)
            .post('/energy/api/Login')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({username: 'admin',password:'321nimda'})
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.have.keys('token','admin');
                  token=res.body['token'];
                  //console.log(res);
              done();
            });
      });
  });

  describe('Check Quota', () => {
    it('retrieve quota', (done) => {
      chai.request(server)
          .get('/energy/api/Admin/users/admin')
          .set('x-observatory-auth',token)
          .end((err, res) => {
                res.should.have.status(200);
                quota=res.body[0]['quota'];
            done();
          });
    });
  });


  describe('Get ActualTotalLoad Greece PT60M', () => {
    it('retrieve actual total load data', (done) => {
      chai.request(server)
          .get('/energy/api/ActualTotalLoad/Greece/PT60M/date/2018-01-04')
          .set('content-type', 'application/x-www-form-urlencoded')
          .set('x-observatory-auth',token)
          .send({username: 'admin',password:'321nimda'})
          .end((err, res) => {
                res.should.have.status(200);
                res.body.length.should.be.eql(24);
            done();
          });
    });
  });


  describe('Check Quota after getting data', () => {
    it('quota should 1 less than before', (done) => {
      chai.request(server)
          .get('/energy/api/Admin/users/admin')
          .set('x-observatory-auth',token)
          .end((err, res) => {
                res.should.have.status(200);
                res.body[0]['quota'].should.be.eql(quota-1);
                quota = res.body[0]['quota'];
            done();
          });
    });
  });

  describe('Get ActualTotalLoad Greece PT60M', () => {
    it('retrieve actual total load data', (done) => {
      chai.request(server)
          .get('/energy/api/ActualTotalLoad/Greece/PT60M/year/2018')
          .set('content-type', 'application/x-www-form-urlencoded')
          .set('x-observatory-auth',token)
          .send({username: 'admin',password:'321nimda'})
          .end((err, res) => {
                res.should.have.status(200);
                res.body.length.should.be.eql(1);
            done();
          });
    });
  });

  describe('Check Quota after getting data', () => {
    it('quota should 1 less than before', (done) => {
      chai.request(server)
          .get('/energy/api/Admin/users/admin')
          .set('x-observatory-auth',token)
          .end((err, res) => {
                res.should.have.status(200);
                res.body[0]['quota'].should.be.eql(quota-1);
                quota = res.body[0]['quota'];
            done();
          });
    });
  });

  describe('Get Forecast Load Greece PT60M', () => {
    it('retrieve forecast load data', (done) => {
      chai.request(server)
          .get('/energy/api/DayAheadTotalLoadForecast/Greece/PT60M/date/2018-01-04')
          .set('content-type', 'application/x-www-form-urlencoded')
          .set('x-observatory-auth',token)
          .send({username: 'admin',password:'321nimda'})
          .end((err, res) => {
                res.should.have.status(200);
                res.body.length.should.be.eql(24);
            done();
          });
    });
  });

  describe('Check Quota after getting data', () => {
    it('quota should 1 less than before', (done) => {
      chai.request(server)
          .get('/energy/api/Admin/users/admin')
          .set('x-observatory-auth',token)
          .end((err, res) => {
                res.should.have.status(200);
                res.body[0]['quota'].should.be.eql(quota-1);
                quota = res.body[0]['quota'];
            done();
          });
    });
  });

  describe('Get Actual vs Forecast Greece PT60M', () => {
    it('retrieve forecast load data', (done) => {
      chai.request(server)
          .get('/energy/api/ActualvsForecast/Greece/PT60M/date/2018-01-04')
          .set('content-type', 'application/x-www-form-urlencoded')
          .set('x-observatory-auth',token)
          .send({username: 'admin',password:'321nimda'})
          .end((err, res) => {
                res.should.have.status(200);
                res.body.length.should.be.eql(24);
            done();
          });
    });
  });

  describe('Check Quota after getting data', () => {
    it('quota should 1 less than before', (done) => {
      chai.request(server)
          .get('/energy/api/Admin/users/admin')
          .set('x-observatory-auth',token)
          .end((err, res) => {
                res.should.have.status(200);
                res.body[0]['quota'].should.be.eql(quota-1);
                quota = res.body[0]['quota'];
            done();
          });
    });
  });

  describe('Get Actual vs Forecast Greece PT60M', () => {
    it('retrieve forecast load data', (done) => {
      chai.request(server)
          .get('/energy/api/AggregatedGenerationPerType/Greece/Solar/PT60M/date/2018-01-04')
          .set('content-type', 'application/x-www-form-urlencoded')
          .set('x-observatory-auth',token)
          .send({username: 'admin',password:'321nimda'})
          .end((err, res) => {
                res.should.have.status(200);
                res.body.length.should.be.eql(24);
            done();
          });
    });
  });

  describe('Check Quota after getting data', () => {
    it('quota should 1 less than before', (done) => {
      chai.request(server)
          .get('/energy/api/Admin/users/admin')
          .set('x-observatory-auth',token)
          .end((err, res) => {
                res.should.have.status(200);
                res.body[0]['quota'].should.be.eql(quota-1);
                quota = res.body[0]['quota'];
            done();
          });
    });
  });

  


});