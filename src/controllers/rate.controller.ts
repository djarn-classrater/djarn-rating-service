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

class Rating {
  _1 = 0;
  _2 = 0;
  _3 = 0;
  _4 = 0;
  _5 = 0;
  [key: string]: number;
}

export class RateController {
  constructor(
    @repository(RateRepository)
    public rateRepository: RateRepository,
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
    @param.query.string('studentId') studentId?: string,
    @param.query.string('courseId') courseId?: string,
  ): Promise<Rate[]> {
    return this.rateRepository.find({where: {studentId, courseId}});
  }

  @get('rates/{courseId}/summary', {
    responses: {
      '200': {
        description: 'Array of course summary',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              title: 'Course Summary',
              properties: {
                mean: {type: 'number'},
                reviewer: {type: 'number'},
                rating: {
                  type: 'object',
                  title: 'Number of each rating',
                  properties: {
                    _1: {type: 'number'},
                    _2: {type: 'number'},
                    _3: {type: 'number'},
                    _4: {type: 'number'},
                    _5: {type: 'number'},
                  },
                },
              },
            },
          },
        },
      },
    },
  })
  async getSummary(@param.path.string('courseId') courseId: string) {
    const ratingTuples = await this.rateRepository.find({where: {courseId}});

    const sumRating = ratingTuples.reduce<number>((previous, current) => {
      return previous + current.rating;
    }, 0);

    const mean = sumRating / ratingTuples.length;

    const rating = ratingTuples.reduce<Rating>((previous, current) => {
      const index = `_${current.rating}`;
      previous[index] += 1;
      return previous;
    }, new Rating());

    return {
      mean,
      reviewer: ratingTuples.length,
      rating,
    };
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
    @param.query.object('filter', getFilterSchemaFor(Rate))
    filter?: Filter<Rate>,
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
