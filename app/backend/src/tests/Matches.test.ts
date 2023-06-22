import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeMatches from '../database/models/SequelizeMatches';
import SequelizeTeam from '../database/models/SequelizeTeam';
import { 
  matches,
  matchesFineshed,
  matchesInProgress,
  createdMatchResponse,
  createdMatch,
  createdMatchSend,
} from './MatchesMoks';
import JWT from '../utils/JWT';

chai.use(chaiHttp);

const { expect } = chai;

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY4Njc2MzgzMn0.-_zGAqz107iPqjJkC4MzIX0GZDkCa3EVUkS43-IWzr8';

describe('Testes dos Matches', function() {
  it('Deve retornar todas as matches', async function() {
    sinon.stub(SequelizeMatches, 'findAll').resolves(matches as any);

    const { status, body } = await chai.request(app).get('/matches');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(matches);
  });

  it('Deve retornar as partidas em andamento', async function() {
    sinon.stub(SequelizeMatches, 'findAll').resolves(matchesInProgress as any);

    const { status, body } = await chai.request(app).get('/matches?inProgress=true');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(matchesInProgress);
  });

  it('Deve retornar as partidas finalizadas', async function() {
    sinon.stub(SequelizeMatches, 'findAll').resolves(matchesFineshed as any);

    const { status, body } = await chai.request(app).get('/matches?inProgress=false');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(matchesFineshed);
  });

  it('Deve retornar finished quando finaliza partidas', async function() {
    sinon.stub(JWT, 'verify').resolves({ email: 'admin@admin.com', role: 'admin', iat: 1686763832 })
    sinon.stub(SequelizeMatches, 'update').resolves();

    const response = await chai.request(app).patch('/matches/1/finish').set('Authorization', token);

    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal({ message: 'Finished' });
  });

  it('Deve retornar finished quando atualiza uma partida', async function() {
    sinon.stub(JWT, 'verify').resolves({ email: 'admin@admin.com', role: 'admin', iat: 1686763832 })
    sinon.stub(SequelizeMatches, 'update').resolves();

    const response = await chai.request(app).patch('/matches/1').set('Authorization', token);

    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal({ message: 'Updated' });
  });

  it('Deve retornar um erro se tentar criar partida com times iguais', async function() {
    sinon.stub(JWT, 'verify').resolves({ email: 'admin@admin.com', role: 'admin', iat: 1686763832 })
    sinon.stub(SequelizeMatches, 'create').resolves();

    const response = await chai.request(app).post('/matches').set('Authorization', token).send(createdMatchSend);

    expect(response.status).to.equal(422);
    expect(response.body).to.deep.equal({ message: 'It is not possible to create a match with two equal teams' });
  });

  it('Deve retornar um erro se tentar criar partida com times com id inexistente', async function() {
    sinon.stub(JWT, 'verify').resolves({ email: 'admin@admin.com', role: 'admin', iat: 1686763832 })
    sinon.stub(SequelizeTeam, 'findByPk').resolves();
    sinon.stub(SequelizeMatches, 'create').resolves();

    const response = await chai.request(app).post('/matches').set('Authorization', token).send(createdMatchSend);

    expect(response.status).to.equal(404);
    expect(response.body).to.deep.equal({ message: 'There is no team with such id!' });
  });

  it('Deve retornar a partida criada com o id', async function() {
    sinon.stub(JWT, 'verify').resolves({ email: 'admin@admin.com', role: 'admin', iat: 1686763832 })
    sinon.stub(SequelizeMatches, 'create').resolves(createdMatchResponse);

    const response = await chai.request(app).post('/matches').set('Authorization', token).send(createdMatchSend);

    expect(response.status).to.equal(201);
    expect(response.body).to.deep.equal(createdMatch);
  });

  afterEach(sinon.restore);
});