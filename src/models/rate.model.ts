import {Entity, model, property} from '@loopback/repository';

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
  })
  rating?: number;


  constructor(data?: Partial<Rate>) {
    super(data);
  }
}

export interface RateRelations {
  // describe navigational properties here
}

export type RateWithRelations = Rate & RateRelations;
