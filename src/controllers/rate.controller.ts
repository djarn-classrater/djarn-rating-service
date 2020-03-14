import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {Rate} from '../models';
import {RateRepository} from '../repositories';

export class RateController {
  constructor(
    @repository(RateRepository)
    public rateRepository : RateRepository,
  ) {}

  @post('/rates', {
    responses: {
      '200': {
        description: 'Rate model instance',
        content: {'application/json': {schema: getModelSchemaRef(Rate)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Rate, {
            title: 'NewRate',
            exclude: ['id'],
          }),
        },
      },
    })
    rate: Omit<Rate, 'id'>,
  ): Promise<Rate> {
    return this.rateRepository.create(rate);
  }

  @get('/rates/count', {
    responses: {
      '200': {
        description: 'Rate model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Rate)) where?: Where<Rate>,
  ): Promise<Count> {
    return this.rateRepository.count(where);
  }

  @get('/rates', {
    responses: {
      '200': {
        description: 'Array of Rate model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Rate, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Rate)) filter?: Filter<Rate>,
  ): Promise<Rate[]> {
    return this.rateRepository.find(filter);
  }

  @patch('/rates', {
    responses: {
      '200': {
        description: 'Rate PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Rate, {partial: true}),
        },
      },
    })
    rate: Rate,
    @param.query.object('where', getWhereSchemaFor(Rate)) where?: Where<Rate>,
  ): Promise<Count> {
    return this.rateRepository.updateAll(rate, where);
  }

  @get('/rates/{id}', {
    responses: {
      '200': {
        description: 'Rate model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Rate, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.query.object('filter', getFilterSchemaFor(Rate)) filter?: Filter<Rate>
  ): Promise<Rate> {
    return this.rateRepository.findById(id, filter);
  }

  @patch('/rates/{id}', {
    responses: {
      '204': {
        description: 'Rate PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Rate, {partial: true}),
        },
      },
    })
    rate: Rate,
  ): Promise<void> {
    await this.rateRepository.updateById(id, rate);
  }

  @put('/rates/{id}', {
    responses: {
      '204': {
        description: 'Rate PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() rate: Rate,
  ): Promise<void> {
    await this.rateRepository.replaceById(id, rate);
  }

  @del('/rates/{id}', {
    responses: {
      '204': {
        description: 'Rate DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.rateRepository.deleteById(id);
  }
}
