const mongoose = require('mongoose');
const Employee = require('../src/models/employee');
const app = require('../src/app');


const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = require('chai').expect;
const should = chai.should();
const request = require('supertest');

chai.use(chaiHttp);

describe('Employee', () => {
    before((done) => {
        mongoose.connect("mongodb://localhost/mean-crud", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })
            .then(() => done())
            .catch((err) => done(err));
    })
    beforeEach((done) => { // Empty DB before each test
        Employee.deleteMany({}, (err) => {
            done();
        });

        describe('POST /api/employees', () => {
            it(('Response of POST should be Status Employee created'), (done) => {
                request(app)
                    .post("/api/employees")
                    .send({
                        name: "Diego",
                        position: "The Boss",
                        salary: 1000000,
                        office: "Center"
                    })
                    .end((err, res) => {
                        res.should.have.status(200);
                        expect(res.body).to.contain.property('status');
                        expect(res.body).to.contain.property('status').eql("Employee created");
                        done();
                    })
            })
        })
    })

    describe("GET /api/employees", () => {
        it("Should get all employees", (done) => {
            request(app)
                .get("/api/employees")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                    done();
                })
        })
    })

    describe('/GET/:id employee', () => {
        it('it should GET a employee by the given id', (done) => {
            let employee = new Employee({ name: "Diego", position: "Boss", salary: 1000000, office: "Center" });
            employee.save((err, employee) => {
                chai.request(app)
                    .get('/api/employees/' + employee._id)
                    .send(employee)
                    .end((err, res) => {
                        res.should.have.status(200);
                        expect(res.body).to.be.a('object');
                        done();
                    });
            });

        });

        describe('/DELETE/:id employee', () => {
            it('should DELETE a employee given the id', (done) => {
                let employee = new Employee({ name: "Diego", position: "Boss", salary: 1000000, office: "Center" })
                employee.save((err, employee) => {
                    chai.request(app)
                        .delete('/api/employees/' + employee._id)
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.body.should.be.a('object');
                            done();
                        });
                });
            });
        })

        describe('/PUT/:id employee', () => {
            it('it should UPDATE a employee given the id', (done) => {
                let employee = new Employee({ name: "Diego", position: "Boss", salary: 1000000, office: "Center" })
                employee.save((err, employee) => {
                    chai.request(app)
                        .put('/api/employees/' + employee._id)
                        .send({ name: "Alfonso", position: "Director", salary: 1000000, office: "South" })
                        .end((err, res) => {
                            res.should.have.status(200);
                            expect(res.body).to.contain.property('status');
                            expect(res.body).to.contain.property('status').eql("Employee Updated");
                            done();
                        });
                });
            });
        });
    });
});