import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeTeam from '../database/models/SequelizeTeam';
import { team, teams } from './TeamMoks';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes dos teams', function() {
  it('Deve retornar todos os times', async function() {
    sinon.stub(SequelizeTeam, 'findAll').resolves(teams as any);

    const { status, body } = await chai.request(app).get('/teams');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(teams);
  });

  it('Deve retornar o time com id solicitado', async function() {
    sinon.stub(SequelizeTeam, 'findOne').resolves(team as any);

    const { status, body } = await chai.request(app).get('/teams/7');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(team);
  });

  it('Deve retornar um erro caso o id solicitado não existir', async function() {
    sinon.stub(SequelizeTeam, 'findOne').resolves(null);

    const { status, body } = await chai.request(app).get('/teams/99');

    expect(status).to.equal(404);
    expect(body.message).to.equal('Team 99 not found');
  });

  afterEach(sinon.restore);
});
