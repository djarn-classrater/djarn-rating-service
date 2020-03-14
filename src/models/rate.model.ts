import {Entity, model, property} from '@loopback/repository';

type RateLength = 1 | 2 | 3 | 4 | 5;

@model()
export class Rate extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  studentId: string;

  @property({
    type: 'string',
    required: true,
  })
  courseId: string;

  @property({
    type: 'number',
    require: true,
  })
  rating: RateLength;

  constructor(data?: Partial<Rate>) {
    super(data);
  }
}

export interface RateRelations {
  // describe navigational properties here
}

export type RateWithRelations = Rate & RateRelations;
