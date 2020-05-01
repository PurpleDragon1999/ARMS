//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../index');
let should = chai.should();


chai.use(chaiHttp);


describe('/ignition route', () => {
    it('it should hit the ignition route', (done) => {
      chai.request(app)
          .get('/ignition')
          .end((err, res) => {
                res.should.have.status(200);
            done();
          });
    });
});